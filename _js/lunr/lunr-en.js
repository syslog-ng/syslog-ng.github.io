---
layout: none
---

// VERSION COUNTER - increment on each change to verify latest code is loaded
var SEARCH_VERSION = 19;
window.logger.log('========================================');
window.logger.log('LUNR SEARCH ENGINE LOADED - VERSION: ' + SEARCH_VERSION);
window.logger.log('========================================');

/**
 * SEARCH STRATEGY FOR COMPOUND TERMS (e.g., "normalize-hostnames")
 * 
 * Priority Ranking (highest to lowest):
 * 
 * 1. Pages with FULL compound term "normalize-hostnames" (Strategy 1)
 *    - Boost: x1,000 - x100,000 depending on location
 *      * In title: x100,000 (canonical page for the option)
 *      * In excerpt start (first 100 chars): x50,000 (primary documentation)
 *      * Anywhere in body: x1,000 (mentioned)
 *    - Content verification: Must contain actual "normalize-hostnames" string
 *    - Example: "unix-stream() source options" with multiple mentions of "normalize-hostnames"
 * 
 * 2. Pages with ALL query terms together (Strategy 2)
 *    - Boost: x100
 *    - Content verification: For compound queries, must contain at least one compound term
 *    - Catches multi-word queries that aren't compound terms
 *    - Example: "log disk buffer" (not a compound term, but all words present)
 * 
 * 3. Pages with EXACT component parts (Strategy 3)
 *    - Boost: x10
 *    - Searches for "normalize" AND "hostnames" separately
 *    - Content verification:
 *      * Must contain the EXACT part (not stemmed - "normalize" not "normal")
 *      * Must NOT contain the full compound term (already handled by #1)
 *    - Example: "map-value-pairs" page with "normalize" but no "normalize-hostnames"
 * 
 * 4. Pages with wildcard variations (Strategy 4)
 *    - Boost: x5
 *    - Searches for "normalize*" "hostnames*"
 *    - Catches variations like "normalized", "normalizes", "normalization"
 *    - Only new results (not already found)
 * 
 * 5. Pages with fuzzy/typo matches (Strategy 5)
 *    - Boost: x0.01 (very low)
 *    - Searches for similar words: "normalize~1"
 *    - Catches typos and very similar words
 *    - Example: Page with "normal" when searching "normalize" (should rank VERY low)
 * 
 * Anti-Patterns Prevented:
 *    - "Resolving hostnames locally" (partial match in title) ranking above pages with full "normalize-hostnames" in body
 *    - "Enabling normal disk-based" (10 fuzzy matches) ranking above "map-value-pairs" (1 exact "normalize")
 *    - Pages without the compound term appearing in top results due to high Lunr base scores
 * 
 * Key Principles:
 *    - Full term >> Parts >> Fuzzy: Massive boost gaps ensure this hierarchy
 *    - Content verification: Don't trust Lunr alone - verify strings actually exist
 *    - Stemmer protection: Check exact strings, not just stemmed matches
 *    - Title boost mitigation: Partial matches in titles shouldn't beat full matches in body
 */

// Compound term separators (used for compound pattern detection)
var COMPOUND_SEPARATORS = '-_.';  // Hyphen, underscore, dot
var COMPOUND_SEPARATORS_ESCAPED = COMPOUND_SEPARATORS.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

// Shared pattern for detecting compound terms (words joined by COMPOUND_SEPARATORS)
var compoundPattern = new RegExp('[\\w]+([' + COMPOUND_SEPARATORS_ESCAPED + '][\\w]+)+', 'g');

var idx = lunr(function () {
  this.field('title', { boost: 10 })
  this.field('excerpt', { boost: 1 })  // Default weight - Strategy 1 handles location-based boosting
  this.field('categories', { boost: 5 })
  this.field('tags', { boost: 5 })
  this.ref('id')

  this.pipeline.remove(lunr.trimmer)

  // Custom tokenizer that preserves compound terms AND their parts
  this.tokenizer = function (obj, metadata) {
    if (obj == null || obj == undefined) {
      return []
    }
    
    if (Array.isArray(obj)) {
      return obj.map(function (t) {
        return new lunr.Token(
          lunr.utils.asString(t).toLowerCase(),
          lunr.utils.clone(metadata)
        )
      })
    }
    
    var str = obj.toString().toLowerCase();
    var tokens = [];
    var len = str.length;
    var sliceStart = 0;
    var sliceEnd = 0;
    
    // First pass: extract compound terms
    var match;
    var compoundTokens = [];
    
    while (match = compoundPattern.exec(str)) {
      compoundTokens.push(new lunr.Token(match[0], {
        position: [match.index, match[0].length],
        index: tokens.length
      }));
    }
    
    // Second pass: extract all individual words (split on whitespace and separators)
    var separatorRegex = new RegExp('[\\s' + COMPOUND_SEPARATORS_ESCAPED + ']');
    for (sliceEnd = 0; sliceEnd <= len; sliceEnd++) {
      var char = str.charAt(sliceEnd);
      var sliceLength = sliceEnd - sliceStart;
      
      if (char.match(separatorRegex) || sliceEnd == len) {
        if (sliceLength > 0) {
          var tokenMetadata = lunr.utils.clone(metadata) || {};
          tokenMetadata.position = [sliceStart, sliceLength];
          tokenMetadata.index = tokens.length;
          
          tokens.push(new lunr.Token(
            str.slice(sliceStart, sliceEnd),
            tokenMetadata
          ));
        }
        sliceStart = sliceEnd + 1;
      }
    }
    
    // Combine: compound terms first (higher priority), then individual parts
    return compoundTokens.concat(tokens);
  };

  for (var item in store) {
    this.add({
      title: store[item].title,
      excerpt: store[item].excerpt,
      categories: store[item].categories,
      tags: store[item].tags,
      id: item
    })
  }
});

function removeExtension(url) {
  var lastDotIndex = url.lastIndexOf('.');
  if (lastDotIndex !== -1) {
    return url.substring(0, lastDotIndex);
  }
  return url; // If no extension found, return the original URL
}

$(document).ready(function() {

  // Function to restore input field value from cookie
  function restoreInputValue() {
    var searchInput = document.getElementById('search');
    var searchValue = getCookie('search');
    if (searchValue) {
      searchInput.value = searchValue;
      onKeyUp();
    }
  }

  // Function to save input field value to cookie
  function saveInputValue() {
    var searchInput = document.getElementById('search');
    setCookie('search', searchInput.value, 365*100);
  }

  function onKeyUp() {
    saveInputValue();

    var resultdiv = $('#results');
    var searchInput = document.getElementById('search');
    var query = searchInput.value;
    var result = [];

    if (query !== '') {
      var seenRefs = new Set();
      
      // Extract compound terms (joined by separators) and regular terms
      var compoundTerms = [];
      var allTerms = [];
      var queryLower = query.toLowerCase();
      
      // Find compound terms using
      var match;
      var pattern = new RegExp(compoundPattern.source, 'g');
      while (match = pattern.exec(queryLower)) {
        compoundTerms.push(match[0]);
      }
      
      // Get all individual terms
      allTerms = queryLower.split(/\s+/).filter(function(t) { return t.length > 0; });
      
      window.logger.log('========== SEARCH: ' + query + ' ==========');
      if (compoundTerms.length > 0) {
        window.logger.log('[Compound terms detected: ' + compoundTerms.join(', ') + ']');
      }
      
      // Strategy 1: Exact compound term match with title detection (HIGHEST PRIORITY)
      compoundTerms.forEach(function(term) {
        try {
          var compoundResults = idx.search(term);
          var strategy1Added = 0;
          
          compoundResults.forEach(function(res) {
            if (!seenRefs.has(res.ref)) {
              var titleLower = store[res.ref].title.toLowerCase();
              var excerptLower = store[res.ref].excerpt.toLowerCase();
              
              // CRITICAL: Check if the FULL compound term actually appears in the content
              // (Lunr may return pages with only individual parts like "hostnames" of "normalize-hostnames")
              var hasFullTerm = titleLower.includes(term) || excerptLower.includes(term);
              
              if (hasFullTerm) {
                var inTitle = titleLower.includes(term);
                
                // Check if term appears in first 100 characters of excerpt (primary topic)
                var excerptStart = excerptLower.substring(0, 100);
                var inExcerptStart = excerptStart.includes(term);
                
                // Boost hierarchy:
                // 1. In title = 100000 (highest - canonical page)
                // 2. In first 100 chars of excerpt = 50000 (primary documentation)
                // 3. Anywhere else in content = 1000 (just mentioned)
                var boost = inTitle ? 100000 : (inExcerptStart ? 50000 : 1000);
                
                res.score *= boost;
                result.push(res);
                seenRefs.add(res.ref);
                strategy1Added++;
              }
              // If compound term not found in content, skip this result entirely
            }
          });
          if (strategy1Added > 0) {
            window.logger.log('Strategy 1: ' + strategy1Added + ' results');
          }
        } catch(e) {
          window.logger.error('Strategy 1 error:', e);
        }
      });
      
      // Strategy 2: Full query - all terms (boost 100)
      // For compound term queries, also verify the compound term exists in content
      try {
        var fullResults = idx.search(query);
        var addedCount = 0;
        fullResults.forEach(function(res) {
          if (!seenRefs.has(res.ref)) {
            // If query contains compound terms, verify they exist in content
            var shouldAdd = true;
            if (compoundTerms.length > 0) {
              var titleLower = store[res.ref].title.toLowerCase();
              var excerptLower = store[res.ref].excerpt.toLowerCase();
              // Check if at least one compound term exists
              shouldAdd = compoundTerms.some(function(term) {
                return titleLower.includes(term) || excerptLower.includes(term);
              });
            }
            if (shouldAdd) {
              res.score *= 100;
              result.push(res);
              seenRefs.add(res.ref);
              addedCount++;
            }
          }
        });
        if (addedCount > 0) {
          window.logger.log('Strategy 2: ' + addedCount + ' results');
        }
      } catch(e) {
        window.logger.error('Strategy 2 error:', e);
      }
      
      // Strategy 3: Individual parts of compound terms (boost 10)
      // Searches for explicit "normalize" and "hostnames" from "normalize-hostnames"
      // MODERATE BOOST: Exact component parts rank below full compound term but above fuzzy matches
      // Only add if the full compound term is NOT in content (already added by Strategy 1)
      var strategy3Added = 0;
      var partsSplitRegex = new RegExp('[' + COMPOUND_SEPARATORS_ESCAPED + ']+');
      compoundTerms.forEach(function(term) {
        var parts = term.split(partsSplitRegex);
        parts.forEach(function(part) {
          if (part.length > 2) {
            try {
              var partResults = idx.search(part);
              partResults.forEach(function(res) {
                if (!seenRefs.has(res.ref)) {
                  var titleLower = store[res.ref].title.toLowerCase();
                  var excerptLower = store[res.ref].excerpt.toLowerCase();
                  
                  // CRITICAL: Don't add if full compound term exists (already handled by Strategy 1)
                  // This prevents "hostnames" in title from ranking above "normalize-hostnames" in body
                  var hasFullTerm = titleLower.includes(term) || excerptLower.includes(term);
                  
                  // ALSO CRITICAL: Verify the exact part exists (not just stemmed match)
                  // This prevents "normal" from matching "normalize" searches (stemmer issue)
                  var hasExactPart = titleLower.includes(part) || excerptLower.includes(part);
                  
                  if (!hasFullTerm && hasExactPart) {
                    res.score *= 10;
                    result.push(res);
                    seenRefs.add(res.ref);
                    strategy3Added++;
                  }
                }
              });
            } catch(e) {}
          }
        });
      });
      if (strategy3Added > 0) {
        window.logger.log('Strategy 3: ' + strategy3Added + ' results');
      }
      
      // Strategy 4: Wildcard prefix on each term (boost 5)
      // Matches variations like "normalized", "normalizes" - less specific than exact parts
      var strategy4Added = 0;
      allTerms.forEach(function(term) {
        if (term.length > 2) {
          try {
            var wildcardResults = idx.search(term + '*');
            wildcardResults.forEach(function(res) {
              if (!seenRefs.has(res.ref)) {
                res.score *= 5;
                result.push(res);
                seenRefs.add(res.ref);
                strategy4Added++;
              }
            });
          } catch(e) {}
        }
      });
      if (strategy4Added > 0) {
        window.logger.log('Strategy 4: ' + strategy4Added + ' results');
      }
      
      // Strategy 5: Fuzzy search for typos (boost 0.01) - LOWEST PRIORITY
      // Matches variations like "normal" for "normalize" - should rank below explicit matches
      // Very low boost ensures high-frequency fuzzy matches don't outrank exact component matches
      var strategy5Added = 0;
      allTerms.forEach(function(term) {
        if (term.length > 3) {
          try {
            var fuzzyResults = idx.search(term + '~1');
            fuzzyResults.forEach(function(res) {
              if (!seenRefs.has(res.ref)) {
                res.score *= 0.01;
                result.push(res);
                seenRefs.add(res.ref);
                strategy5Added++;
              }
            });
          } catch(e) {}
        }
      });
      if (strategy5Added > 0) {
        window.logger.log('Strategy 5: ' + strategy5Added + ' results');
      }
      
      // Sort by score descending
      result.sort(function(a, b) { return b.score - a.score; });
      
      window.logger.log('Total: ' + result.length + ' results');
    }

    resultdiv.empty();
    if (query !== '')
      resultdiv.prepend('<p class="results__found">' + result.length + ' {{ site.data.ui-text[site.locale].results_found | default: "Result(s) found" }}</p>');
    for (var item in result) {
      var ref = result[item].ref;
      if (store[ref].teaser) {
        var searchitem =
          '<div class="list__item">' +
          '<article class="archive__item" itemscope itemtype="https://schema.org/CreativeWork">' +
          '<h2 class="archive__item-title" itemprop="headline">' +
          '<a href="' + removeExtension(store[ref].url) + '" onclick="searchResultLinkClickHandler(event)" rel="permalink">' + store[ref].title + '</a>' +
          '</h2>' +
          '<div class="archive__item-teaser">' +
          '<img src="' + store[ref].teaser + '" alt="">' +
          '</div>' +
          '<p class="archive__item-excerpt" itemprop="description">' + store[ref].excerpt.split(" ").splice(0, 20).join(" ") + '...</p>' +
          '</article>' +
          '</div>';
      }
      else {
        var searchitem =
          '<div class="list__item">' +
          '<article class="archive__item" itemscope itemtype="https://schema.org/CreativeWork">' +
          '<h2 class="archive__item-title" itemprop="headline">' +
          '<a href="' + removeExtension(store[ref].url) + '" onclick="searchResultLinkClickHandler(event)" rel="permalink">' + store[ref].title + '</a>' +
          '</h2>' +
          '<p class="archive__item-excerpt" itemprop="description">' + store[ref].excerpt.split(" ").splice(0, 20).join(" ") + '...</p>' +
          '</article>' +
          '</div>';
      }
      resultdiv.append(searchitem);
    }
  }
  $('input#search').on('keyup', onKeyUp);

  restoreInputValue();
});
