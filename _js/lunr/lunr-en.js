---
layout: none
---

// VERSION COUNTER - increment on each change to verify latest code is loaded
var SEARCH_VERSION = 42;
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

/**
 * Generate a contextual snippet showing where search terms appear in the text
 * @param {string} text - The full text to extract snippet from
 * @param {string} query - The original search query
 * @param {Array<string>} compoundTerms - Array of compound terms extracted from query
 * @param {number} maxWords - Maximum words to show in snippet (default: 60)
 * @param {string} title - The page title (used to show context when term only in title)
 * @param {boolean} fuzzyEnabled - If true, enable fuzzy highlighting
 * @returns {string} HTML snippet with highlighted search terms
 */
function generateContextualSnippet(text, query, compoundTerms, maxWords, title, fuzzyEnabled) {
  maxWords = maxWords || 60;
  
  if (!text) {
    return '';
  }
  
  var textLower = text.toLowerCase();
  var titleLower = (title || '').toLowerCase();
  var words = text.split(/\s+/);
  
  window.logger.log('[Snippet] ========== NEW SNIPPET ==========');
  window.logger.log('[Snippet] Text preview: "' + text.substring(0, 100) + '..."');
  window.logger.log('[Snippet] Title: "' + title + '"');
  window.logger.log('[Snippet] Query: "' + query + '"');
  window.logger.log('[Snippet] Compound terms: [' + compoundTerms.join(', ') + ']');
  
  // If text is short enough, just highlight and return it
  if (words.length <= maxWords) {
    return highlightTerms(text, query, compoundTerms, fuzzyEnabled);
  }
  
  // Find the best match position (prioritize compound terms over individual parts)
  var matchPos = -1;
  var matchTerm = '';
  var matchInTitle = false;
  
  // PRIORITY 1: Try compound terms first in excerpt (HIGHEST PRIORITY)
  for (var i = 0; i < compoundTerms.length; i++) {
    var pos = textLower.indexOf(compoundTerms[i]);
    if (pos !== -1) {
      matchPos = pos;
      matchTerm = compoundTerms[i];
      window.logger.log('[Snippet] Found FULL compound term "' + compoundTerms[i] + '" at position ' + pos);
      break;
    }
  }
  
  // PRIORITY 2: If compound term (or its parts) is in title but not excerpt, note it
  if (matchPos === -1 && compoundTerms.length > 0) {
    window.logger.log('[Snippet] === PRIORITY 2: Checking title ===');
    window.logger.log('[Snippet] Title lower: "' + titleLower + '"');
    
    // First check for full compound term in title
    for (var i = 0; i < compoundTerms.length; i++) {
      window.logger.log('[Snippet] Checking if title contains full compound: "' + compoundTerms[i] + '"');
      if (titleLower.indexOf(compoundTerms[i]) !== -1) {
        matchInTitle = true;
        matchTerm = compoundTerms[i];
        window.logger.log('[Snippet] ✓ FULL compound term "' + compoundTerms[i] + '" found in TITLE only');
        break;
      } else {
        window.logger.log('[Snippet] ✗ Full compound "' + compoundTerms[i] + '" NOT in title');
      }
    }
    
    // If full term not in title, check if any PART is in title
    if (!matchInTitle) {
      window.logger.log('[Snippet] Checking for compound PARTS in title...');
      var partsSplitRegex = new RegExp('[' + COMPOUND_SEPARATORS_ESCAPED + ']+');
      for (var i = 0; i < compoundTerms.length; i++) {
        var parts = compoundTerms[i].split(partsSplitRegex);
        window.logger.log('[Snippet] Parts of "' + compoundTerms[i] + '": [' + parts.join(', ') + ']');
        for (var j = 0; j < parts.length; j++) {
          var part = parts[j];
          if (part.length > 2) {
            window.logger.log('[Snippet] Checking if title contains part: "' + part + '"');
            if (titleLower.indexOf(part) !== -1) {
              matchInTitle = true;
              matchTerm = part;
              window.logger.log('[Snippet] ✓ Part "' + part + '" of compound term found in TITLE only');
              break;
            } else {
              window.logger.log('[Snippet] ✗ Part "' + part + '" NOT in title');
            }
          }
        }
        if (matchInTitle) break;
      }
    }
  }
  
  // PRIORITY 3: If no compound term in excerpt, try individual query terms AND parts of compound terms
  if (matchPos === -1 && !matchInTitle) {
    var termsToTry = [];
    
    // Add whole query terms
    var queryTerms = query.toLowerCase().split(/\s+/);
    queryTerms.forEach(function(term) {
      if (term.trim().length > 0) {
        termsToTry.push(term.trim());
      }
    });
    
    // Add parts of compound terms (important for finding partial matches!)
    if (compoundTerms.length > 0) {
      var partsSplitRegex = new RegExp('[' + COMPOUND_SEPARATORS_ESCAPED + ']+');
      compoundTerms.forEach(function(compoundTerm) {
        var parts = compoundTerm.split(partsSplitRegex);
        parts.forEach(function(part) {
          if (part.length > 2 && termsToTry.indexOf(part) === -1) {
            termsToTry.push(part);
          }
        });
      });
    }
    
    window.logger.log('[Snippet] PRIORITY 3: Trying terms: [' + termsToTry.join(', ') + ']');
    
    for (var i = 0; i < termsToTry.length; i++) {
      var term = termsToTry[i];
      var pos = textLower.indexOf(term);
      if (pos !== -1) {
        matchPos = pos;
        matchTerm = term;
        window.logger.log('[Snippet] Found term "' + term + '" at position ' + pos);
        break;
      }
    }
  }
  
  // PRIORITY 4: If compound term (or part) ONLY in title, look for other parts or related terms in excerpt
  if (matchPos === -1 && matchInTitle) {
    var partsSplitRegex = new RegExp('[' + COMPOUND_SEPARATORS_ESCAPED + ']+');
    
    // First, collect all parts from all compound terms
    var allParts = [];
    compoundTerms.forEach(function(compoundTerm) {
      var parts = compoundTerm.split(partsSplitRegex);
      parts.forEach(function(part) {
        if (part.length > 2 && allParts.indexOf(part) === -1) {
          allParts.push(part);
        }
      });
    });
    
    // Try to find any part in the excerpt
    for (var j = 0; j < allParts.length; j++) {
      var part = allParts[j];
      var pos = textLower.indexOf(part);
      if (pos !== -1) {
        matchPos = pos;
        matchTerm = part;
        window.logger.log('[Snippet] Title-only match - found related term "' + part + '" at position ' + pos + ' in excerpt');
        break;
      }
    }
  }
  
  // PRIORITY 5: Try stemmed/partial matches with word boundaries
  if (matchPos === -1 && !matchInTitle) {
    var termsToTry = [];
    
    // Add query terms
    var queryTerms = query.toLowerCase().split(/\s+/);
    queryTerms.forEach(function(term) {
      if (term.trim().length > 2) {
        termsToTry.push(term.trim());
      }
    });
    
    // Add compound parts if not already tried
    if (compoundTerms.length > 0) {
      var partsSplitRegex = new RegExp('[' + COMPOUND_SEPARATORS_ESCAPED + ']+');
      compoundTerms.forEach(function(compoundTerm) {
        var parts = compoundTerm.split(partsSplitRegex);
        parts.forEach(function(part) {
          if (part.length > 2 && termsToTry.indexOf(part) === -1) {
            termsToTry.push(part);
          }
        });
      });
    }
    
    window.logger.log('[Snippet] PRIORITY 5: Trying word boundary matches for: [' + termsToTry.join(', ') + ']');
    
    for (var i = 0; i < termsToTry.length; i++) {
      var term = termsToTry[i];
      var wordRegex = new RegExp('\\b' + term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i');
      var match = text.match(wordRegex);
      if (match) {
        matchPos = match.index;
        matchTerm = term;
        window.logger.log('[Snippet] Found word boundary match for "' + term + '" at position ' + matchPos);
        break;
      }
    }
  }
  
  // PRIORITY 6: If searching compound term, try finding ANY part of it
  if (matchPos === -1 && compoundTerms.length > 0) {
    var partsSplitRegex = new RegExp('[' + COMPOUND_SEPARATORS_ESCAPED + ']+');
    for (var i = 0; i < compoundTerms.length; i++) {
      var parts = compoundTerms[i].split(partsSplitRegex);
      for (var j = 0; j < parts.length; j++) {
        var part = parts[j];
        if (part.length > 2) {
          var pos = textLower.indexOf(part);
          if (pos !== -1) {
            matchPos = pos;
            matchTerm = part;
            window.logger.log('[Snippet] Found compound part "' + part + '" at position ' + pos);
            break;
          }
        }
      }
      if (matchPos !== -1) break;
    }
  }
  
  // LAST RESORT: If match was only in title, show beginning of excerpt with note
  if (matchPos === -1 && matchInTitle) {
    window.logger.log('[Snippet] Term only in title, showing excerpt start');
    var snippet = words.slice(0, maxWords).join(' ');
    return '(Term appears in title) ' + highlightTerms(snippet, query, compoundTerms, fuzzyEnabled) + '...';
  }
  
  // FINAL FALLBACK: Try to find stemmed/fuzzy variations and highlight those
  if (matchPos === -1) {
    window.logger.log('[Snippet] No exact match - searching for stemmed/fuzzy variations');
    
    // Try to find words that START with our search terms (stemming)
    var allSearchTerms = [];
    if (compoundTerms.length > 0) {
      var partsSplitRegex = new RegExp('[' + COMPOUND_SEPARATORS_ESCAPED + ']+');
      compoundTerms.forEach(function(compoundTerm) {
        var parts = compoundTerm.split(partsSplitRegex);
        parts.forEach(function(part) {
          if (part.length > 2) {
            allSearchTerms.push(part);
          }
        });
      });
    }
    query.split(/\s+/).forEach(function(term) {
      term = term.toLowerCase().trim();
      if (term.length > 2 && allSearchTerms.indexOf(term) === -1) {
        allSearchTerms.push(term);
      }
    });
    
    // Look for words in text that start with these terms (e.g., "hostname" when searching "hostnames")
    var fuzzyMatches = [];
    allSearchTerms.forEach(function(searchTerm) {
      // Use first 4 chars to catch stemmed variations
      if (searchTerm.length >= 4) {
        var prefix = searchTerm.substring(0, 4);  // Use first 4 chars to catch stemmed variants
        var prefixRegex = new RegExp('\\b(' + prefix.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '\\w*)', 'gi');
        var match;
        while ((match = prefixRegex.exec(text)) !== null) {
          var foundWord = match[1].toLowerCase();
          // Only add if it's different from search term (it's a variation)
          if (foundWord !== searchTerm && fuzzyMatches.indexOf(foundWord) === -1) {
            fuzzyMatches.push(foundWord);
            window.logger.log('[Snippet] Found fuzzy variation: "' + foundWord + '" (from "' + searchTerm + '")');
          }
        }
      }
    });
    
    // If we found fuzzy variations, show first one
    if (fuzzyMatches.length > 0) {
      var firstMatch = fuzzyMatches[0];
      var pos = textLower.indexOf(firstMatch);
      if (pos !== -1) {
        matchPos = pos;
        matchTerm = firstMatch;
        window.logger.log('[Snippet] Using fuzzy match "' + firstMatch + '" at position ' + pos);
        // Continue to normal snippet extraction below
      }
    }
    
    // Still no match? Show beginning with note
    if (matchPos === -1) {
      window.logger.log('[Snippet] No variations found - showing first ' + maxWords + ' words');
      var snippet = words.slice(0, maxWords).join(' ');
      return '<em>(Matched through related terms)</em> ' + snippet + '...';
    }
  }
  
  // Find which word index the match is in  
  // Build accurate char-to-word mapping by tracking actual positions in original text
  var wordMatches = [];
  var wordRegex = /\S+/g;
  var wordMatch;
  while (wordMatch = wordRegex.exec(text)) {
    wordMatches.push({
      word: wordMatch[0],
      start: wordMatch.index,
      end: wordMatch.index + wordMatch[0].length
    });
  }
  
  // Find which word contains or is closest to our match position
  var matchWordIndex = 0;
  var closestDistance = Infinity;
  
  for (var i = 0; i < wordMatches.length; i++) {
    var wordStart = wordMatches[i].start;
    var wordEnd = wordMatches[i].end;
    
    // Check if match position is within this word
    if (wordStart <= matchPos && matchPos < wordEnd) {
      matchWordIndex = i;
      window.logger.log('[Snippet] Match position ' + matchPos + ' is INSIDE word ' + i + ' ("' + wordMatches[i].word + '")');
      break;
    }
    
    // Check if match position is very close to this word (within 50 chars)
    var distanceToStart = Math.abs(wordStart - matchPos);
    var distanceToEnd = Math.abs(wordEnd - matchPos);
    var minDistance = Math.min(distanceToStart, distanceToEnd);
    
    if (minDistance < closestDistance && minDistance < 50) {
      closestDistance = minDistance;
      matchWordIndex = i;
    }
  }
  
  window.logger.log('[Snippet] Match at char ' + matchPos + ' maps to word index ' + matchWordIndex + 
                    ' ("' + (wordMatches[matchWordIndex] ? wordMatches[matchWordIndex].word : 'N/A') + '")');
  
  // Extract words around the match (try to center it)
  var wordsBeforeMatch = Math.floor(maxWords * 0.35); // 35% before
  var wordsAfterMatch = maxWords - wordsBeforeMatch; // 65% after
  
  var startIndex = Math.max(0, matchWordIndex - wordsBeforeMatch);
  var endIndex = Math.min(wordMatches.length, matchWordIndex + wordsAfterMatch);
  
  // Adjust if we couldn't get enough words before
  if (startIndex === 0) {
    endIndex = Math.min(wordMatches.length, maxWords);
  }
  
  // Extract the actual text from original using word positions
  var snippetStartChar = wordMatches[startIndex].start;
  var snippetEndChar = wordMatches[Math.min(endIndex - 1, wordMatches.length - 1)].end;
  var snippet = text.substring(snippetStartChar, snippetEndChar);
  
  window.logger.log('[Snippet] Extracting chars ' + snippetStartChar + '-' + snippetEndChar + 
                    ' (word indices ' + startIndex + '-' + endIndex + ')');
  
  // Add ellipsis
  var prefix = startIndex > 0 ? '...' : '';
  var suffix = endIndex < wordMatches.length ? '...' : '';
  
  // Highlight all matching terms
  snippet = highlightTerms(snippet, query, compoundTerms, fuzzyEnabled);
  
  return prefix + snippet + suffix;
}

/**
 * Highlight search terms in text (wrap in <mark> tags)
 * @param {string} text - Text to highlight terms in
 * @param {string} query - Original search query
 * @param {Array<string>} compoundTerms - Array of compound terms
 * @param {boolean} fuzzyEnabled - If true, enable fuzzy highlighting
 * @returns {string} Text with highlighted terms
 */
function highlightTerms(text, query, compoundTerms, fuzzyEnabled) {
  window.logger.log('[Highlight] Input text snippet: "' + text.substring(0, 100) + '..."');
  window.logger.log('[Highlight] Query: "' + query + '"');
  window.logger.log('[Highlight] Compound terms: [' + compoundTerms.join(', ') + ']');
  
  var result = text;
  var termsToHighlight = [];
  var textLower = text.toLowerCase();
  
  // Add compound terms (prioritize these - highlight first)
  var hasCompoundInText = false;
  compoundTerms.forEach(function(term) {
    if (term.length > 0) {
      termsToHighlight.push(term);
      // Check if this compound term actually exists in the text
      if (textLower.indexOf(term) !== -1) {
        hasCompoundInText = true;
        window.logger.log('[Highlight] ✓ Found compound term "' + term + '" in text');
      } else {
        window.logger.log('[Highlight] ✗ Compound term "' + term + '" NOT in text');
      }
    }
  });
  
  // SMART CONDITIONAL HIGHLIGHTING:
  // If the text contains the full compound term → ONLY highlight that (prevents "chain-hostnames" issue)
  // If the text does NOT contain the full compound term → highlight parts (shows why it matched)
  if (compoundTerms.length > 0) {
    if (hasCompoundInText) {
      window.logger.log('[Highlight] ✓ Full compound term in text - ONLY highlighting exact compound term');
      // Don't add parts - the full term is enough
    } else {
      window.logger.log('[Highlight] ✗ Full compound term NOT in text - highlighting individual parts');
      // Add the parts so user can see what matched
      var partsSplitRegex = new RegExp('[' + COMPOUND_SEPARATORS_ESCAPED + ']+');
      compoundTerms.forEach(function(compoundTerm) {
        var parts = compoundTerm.split(partsSplitRegex);
        parts.forEach(function(part) {
          if (part.length > 2 && termsToHighlight.indexOf(part) === -1) {
            termsToHighlight.push(part);
            window.logger.log('[Highlight] Added part: "' + part + '"');
          }
        });
      });
    }
  } else {
    // No compound terms - add individual query terms normally
    window.logger.log('[Highlight] No compound terms - highlighting individual query terms');
    query.split(/\s+/).forEach(function(term) {
      term = term.toLowerCase().trim();
      if (term.length > 0 && termsToHighlight.indexOf(term) === -1) {
        termsToHighlight.push(term);
        window.logger.log('[Highlight] Added query term: "' + term + '"');
      }
    });
  }
  
  window.logger.log('[Highlight] Terms to highlight: [' + termsToHighlight.join(', ') + ']');
  
  // Sort by length descending (highlight longer terms first to avoid partial matches)
  termsToHighlight.sort(function(a, b) { return b.length - a.length; });
  
  // Highlight each term (case-insensitive)
  termsToHighlight.forEach(function(term) {
    window.logger.log('[Highlight] Processing term: "' + term + '"');
    
    // Escape special regex characters
    var escapedTerm = term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    
    // Check if term contains compound separators (hyphen, underscore, dot)
    var hasCompoundSep = /[-_.]/.test(term);
    
    if (hasCompoundSep) {
      window.logger.log('[Highlight] Term has compound separator, matching directly');
      // For compound terms, match directly (hyphens aren't word boundaries)
      var regex = new RegExp('(' + escapedTerm + ')', 'gi');
      var matchCount = 0;
      result = result.replace(regex, function(match, p1, offset, string) {
        // Don't highlight if inside existing <mark> tags
        var before = string.substring(0, offset);
        var afterLastClose = before.lastIndexOf('</mark>');
        var afterLastOpen = before.lastIndexOf('<mark>');
        if (afterLastOpen > afterLastClose) {
          window.logger.log('[Highlight] Skipping nested match at offset ' + offset);
          return match; // Inside a <mark> tag, don't re-highlight
        }
        matchCount++;
        return '<mark>' + p1 + '</mark>';
      });
      window.logger.log('[Highlight] Highlighted ' + matchCount + ' occurrence(s) of "' + term + '"');
      
      // Also look for fuzzy variations (stemmed/wildcard matches) to highlight
      if (fuzzyEnabled && term.length >= 4) {
        window.logger.log('[Highlight] Also looking for fuzzy variations of "' + term + '"');
        var prefix = term.substring(0, 4);  // Use first 4 chars to catch stemmed variants
        var fuzzyRegex = new RegExp('\\b(' + prefix.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '\\w*)', 'gi');
        var fuzzyCount = 0;
        result = result.replace(fuzzyRegex, function(match, p1, offset, string) {
          var before = string.substring(0, offset);
          var afterLastClose = before.lastIndexOf('</mark>');
          var afterLastOpen = before.lastIndexOf('<mark>');
          if (afterLastOpen > afterLastClose) {
            return match;
          }
          fuzzyCount++;
          return '<mark>' + p1 + '</mark>';
        });
        window.logger.log('[Highlight] Highlighted ' + fuzzyCount + ' fuzzy variation(s) starting with "' + prefix + '"');
      }
    } else {
      window.logger.log('[Highlight] Simple term, trying word boundary match');
      
      // SPECIAL CASE: If this is a part of a compound term we searched for,
      // make sure we don't highlight it when it's part of a DIFFERENT compound term
      // E.g., don't highlight "hostnames" in "chain-hostnames" when searching "normalize-hostnames"
      var isPartOfSearchedCompound = false;
      for (var ci = 0; ci < compoundTerms.length; ci++) {
        var partsSplitRegex = new RegExp('[' + COMPOUND_SEPARATORS_ESCAPED + ']+');
        var parts = compoundTerms[ci].split(partsSplitRegex);
        if (parts.indexOf(term) !== -1) {
          isPartOfSearchedCompound = true;
          window.logger.log('[Highlight] "' + term + '" is a part of searched compound "' + compoundTerms[ci] + '"');
          break;
        }
      }
      
      if (isPartOfSearchedCompound) {
        // Use negative lookbehind/lookahead to avoid highlighting when part of another compound
        // Match only if NOT preceded or followed by a compound separator
        var regex = new RegExp('(?<![' + COMPOUND_SEPARATORS_ESCAPED + '\\w])\\b(' + escapedTerm + ')\\b(?![' + COMPOUND_SEPARATORS_ESCAPED + '\\w])', 'gi');
        var matchCount = 0;
        try {
          result = result.replace(regex, function(match, p1, offset, string) {
            var before = string.substring(0, offset);
            var afterLastClose = before.lastIndexOf('</mark>');
            var afterLastOpen = before.lastIndexOf('<mark>');
            if (afterLastOpen > afterLastClose) {
              return match;
            }
            matchCount++;
            return '<mark>' + p1 + '</mark>';
          });
          window.logger.log('[Highlight] Highlighted ' + matchCount + ' standalone occurrence(s) of "' + term + '"');
          
          // Also look for fuzzy variations (stemmed/wildcard matches) to highlight
          if (fuzzyEnabled && term.length >= 4) {
            window.logger.log('[Highlight] Also looking for fuzzy variations of "' + term + '"');
            var prefix = term.substring(0, 4);  // Use first 4 chars to catch stemmed variants
            var fuzzyRegex = new RegExp('\\b(' + prefix.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '\\w*)', 'gi');
            var fuzzyCount = 0;
            result = result.replace(fuzzyRegex, function(match, p1, offset, string) {
              var before = string.substring(0, offset);
              var afterLastClose = before.lastIndexOf('</mark>');
              var afterLastOpen = before.lastIndexOf('<mark>');
              if (afterLastOpen > afterLastClose) {
                return match;
              }
              fuzzyCount++;
              return '<mark>' + p1 + '</mark>';
            });
            window.logger.log('[Highlight] Highlighted ' + fuzzyCount + ' fuzzy variation(s) starting with "' + prefix + '"');
          }
        } catch (e) {
          // Negative lookbehind not supported in older browsers - fall back to simpler approach
          window.logger.log('[Highlight] Lookbehind not supported, trying manual check');
          regex = new RegExp('\\b(' + escapedTerm + ')\\b', 'gi');
          result = result.replace(regex, function(match, p1, offset, string) {
            var before = string.substring(0, offset);
            var after = string.substring(offset + match.length);
            
            // Check if preceded or followed by compound separator
            var beforeChar = before.length > 0 ? before.charAt(before.length - 1) : '';
            var afterChar = after.length > 0 ? after.charAt(0) : '';
            var compoundSepRegex = new RegExp('[' + COMPOUND_SEPARATORS_ESCAPED + ']');
            
            if (compoundSepRegex.test(beforeChar) || compoundSepRegex.test(afterChar)) {
              window.logger.log('[Highlight] Skipping "' + term + '" at offset ' + offset + ' (part of other compound)');
              return match; // Part of another compound term
            }
            
            // Don't highlight if inside existing <mark> tags
            var afterLastClose = before.lastIndexOf('</mark>');
            var afterLastOpen = before.lastIndexOf('<mark>');
            if (afterLastOpen > afterLastClose) {
              return match;
            }
            matchCount++;
            return '<mark>' + p1 + '</mark>';
          });
          window.logger.log('[Highlight] Highlighted ' + matchCount + ' standalone occurrence(s) of "' + term + '"');
          
          // Also look for fuzzy variations (stemmed/wildcard matches) to highlight
          if (fuzzyEnabled && term.length >= 4) {
            window.logger.log('[Highlight] Also looking for fuzzy variations of "' + term + '"');
            var prefix = term.substring(0, 4);  // Use first 4 chars to catch stemmed variants
            var fuzzyRegex = new RegExp('\\b(' + prefix.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '\\w*)', 'gi');
            var fuzzyCount = 0;
            result = result.replace(fuzzyRegex, function(match, p1, offset, string) {
              var before = string.substring(0, offset);
              var afterLastClose = before.lastIndexOf('</mark>');
              var afterLastOpen = before.lastIndexOf('<mark>');
              if (afterLastOpen > afterLastClose) {
                return match;
              }
              fuzzyCount++;
              return '<mark>' + p1 + '</mark>';
            });
            window.logger.log('[Highlight] Highlighted ' + fuzzyCount + ' fuzzy variation(s) starting with "' + prefix + '"');
          }
        }
      } else {
        // Not a part of compound term - highlight normally with word boundaries
        window.logger.log('[Highlight] Regular term, highlighting with word boundaries');
        var regex = new RegExp('\\b(' + escapedTerm + ')\\b', 'gi');
        var tempResult = result;
        var hasMatches = false;
        
        // Test if there are any matches
        tempResult.replace(regex, function(match, p1, offset, string) {
          var before = string.substring(0, offset);
          var afterLastClose = before.lastIndexOf('</mark>');
          var afterLastOpen = before.lastIndexOf('<mark>');
          if (afterLastOpen <= afterLastClose) {
            hasMatches = true;
          }
          return match;
        });
        
        if (hasMatches) {
          window.logger.log('[Highlight] Found word boundary matches for "' + term + '"');
          var matchCount = 0;
          result = result.replace(regex, function(match, p1, offset, string) {
            var before = string.substring(0, offset);
            var afterLastClose = before.lastIndexOf('</mark>');
            var afterLastOpen = before.lastIndexOf('<mark>');
            if (afterLastOpen > afterLastClose) {
              return match;
            }
            matchCount++;
            return '<mark>' + p1 + '</mark>';
          });
          window.logger.log('[Highlight] Highlighted ' + matchCount + ' occurrence(s)');
          
          // Also look for fuzzy variations (stemmed/wildcard matches) to highlight
          if (fuzzyEnabled && term.length >= 4) {
            window.logger.log('[Highlight] Also looking for fuzzy variations of "' + term + '"');
            var prefix = term.substring(0, 4);  // Use first 4 chars to catch stemmed variants
            var fuzzyRegex = new RegExp('\\b(' + prefix.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '\\w*)', 'gi');
            var fuzzyCount = 0;
            result = result.replace(fuzzyRegex, function(match, p1, offset, string) {
              var before = string.substring(0, offset);
              var afterLastClose = before.lastIndexOf('</mark>');
              var afterLastOpen = before.lastIndexOf('<mark>');
              if (afterLastOpen > afterLastClose) {
                return match;
              }
              fuzzyCount++;
              return '<mark>' + p1 + '</mark>';
            });
            window.logger.log('[Highlight] Highlighted ' + fuzzyCount + ' fuzzy variation(s) starting with "' + prefix + '"');
          }
        } else {
          window.logger.log('[Highlight] No word boundary matches, trying without boundaries');
          // Try without word boundaries
          regex = new RegExp('(' + escapedTerm + ')', 'gi');
          var matchCount = 0;
          result = result.replace(regex, function(match, p1, offset, string) {
            var before = string.substring(0, offset);
            var afterLastClose = before.lastIndexOf('</mark>');
            var afterLastOpen = before.lastIndexOf('<mark>');
            if (afterLastOpen > afterLastClose) {
              return match;
            }
            matchCount++;
            return '<mark>' + p1 + '</mark>';
          });
          window.logger.log('[Highlight] Highlighted ' + matchCount + ' occurrence(s)');
          
          // Also look for fuzzy variations (stemmed/wildcard matches) to highlight
          if (fuzzyEnabled && term.length >= 4) {
            window.logger.log('[Highlight] Also looking for fuzzy variations of "' + term + '"');
            var prefix = term.substring(0, 4);  // Use first 4 chars to catch stemmed variants
            var fuzzyRegex = new RegExp('\\b(' + prefix.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '\\w*)', 'gi');
            var fuzzyCount = 0;
            result = result.replace(fuzzyRegex, function(match, p1, offset, string) {
              var before = string.substring(0, offset);
              var afterLastClose = before.lastIndexOf('</mark>');
              var afterLastOpen = before.lastIndexOf('<mark>');
              if (afterLastOpen > afterLastClose) {
                return match;
              }
              fuzzyCount++;
              return '<mark>' + p1 + '</mark>';
            });
            window.logger.log('[Highlight] Highlighted ' + fuzzyCount + ' fuzzy variation(s) starting with "' + prefix + '"');
          }
        }
      }
    }
  });
  
  window.logger.log('[Highlight] Final result snippet: "' + result.substring(0, 150) + '..."');
  return result;
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

  // Function to save checkbox states to localStorage
  function saveCheckboxStates() {
    var exactOnlyCheckbox = document.getElementById('search-exact-only');
    var fuzzyCheckbox = document.getElementById('search-fuzzy');
    
    if (exactOnlyCheckbox) {
      localStorage.setItem('search-exact-only', exactOnlyCheckbox.checked);
    }
    if (fuzzyCheckbox) {
      localStorage.setItem('search-fuzzy', fuzzyCheckbox.checked);
    }
    window.logger.log('[Persistence] Saved checkbox states: exact-only=' + exactOnlyCheckbox.checked + ', fuzzy=' + fuzzyCheckbox.checked);
  }

  // Function to restore checkbox states from localStorage
  function restoreCheckboxStates() {
    var exactOnlyCheckbox = document.getElementById('search-exact-only');
    var fuzzyCheckbox = document.getElementById('search-fuzzy');
    
    if (exactOnlyCheckbox) {
      var exactOnlyState = localStorage.getItem('search-exact-only');
      if (exactOnlyState !== null) {
        exactOnlyCheckbox.checked = (exactOnlyState === 'true');
        window.logger.log('[Persistence] Restored exact-only state: ' + exactOnlyCheckbox.checked);
      }
    }
    
    if (fuzzyCheckbox) {
      var fuzzyState = localStorage.getItem('search-fuzzy');
      if (fuzzyState !== null) {
        fuzzyCheckbox.checked = (fuzzyState === 'true');
        window.logger.log('[Persistence] Restored fuzzy state: ' + fuzzyCheckbox.checked);
      }
    }
  }

  function onKeyUp() {
    saveInputValue();

    var resultdiv = $('#results');
    var searchInput = document.getElementById('search');
    var query = searchInput.value;
    var result = [];
    
    // Check search mode options
    var exactOnlyCheckbox = document.getElementById('search-exact-only');
    var exactOnly = exactOnlyCheckbox && exactOnlyCheckbox.checked;
    
    var fuzzyCheckbox = document.getElementById('search-fuzzy');
    // If exact-only is checked, fuzzy matching is ALWAYS disabled regardless of checkbox state
    var fuzzyEnabled = !exactOnly && (!fuzzyCheckbox || fuzzyCheckbox.checked); // Default true if not found
    
    if (exactOnly) {
      window.logger.log('========================================');
      window.logger.log('SEARCH MODE: EXACT MATCHES ONLY (no partial matches, fuzzy disabled)');
      window.logger.log('========================================');
    }
    
    if (!fuzzyEnabled && !exactOnly) {
      window.logger.log('FUZZY MATCHING: DISABLED');
    }

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
      // Skip if "exact only" mode is enabled
      if (!exactOnly) {
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
      } else {
        window.logger.log('Strategy 3 skipped (exact matches only mode)');
      }
      
      // Skip wildcard and fuzzy strategies if fuzzy matching is disabled
      if (fuzzyEnabled) {
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
      } else {
        window.logger.log('Strategies 4 & 5 skipped (fuzzy matching disabled)');
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
      
      window.logger.log('[Result ' + (parseInt(item) + 1) + '] Title: ' + store[ref].title);
      window.logger.log('----------------------------------------');
      
      // Generate contextual snippet with highlighted search terms
      var contextSnippet = generateContextualSnippet(
        store[ref].excerpt,
        query,
        compoundTerms,
        60, // max words to show
        store[ref].title, // pass title for better context
        fuzzyEnabled // pass fuzzy matching flag for highlighting
      );
      
      if (store[ref].teaser) {
        var searchitem =
          '<div class="list__item">' +
          '<article class="archive__item" itemscope itemtype="https://schema.org/CreativeWork">' +
          '<h2 class="archive__item-title" itemprop="headline">' +
          '<a href="' + removeExtension(store[ref].url) + '" onclick="searchResultLinkClickHandler(event)" rel="permalink">' + highlightTerms(store[ref].title, query, compoundTerms, fuzzyEnabled) + '</a>' +
          '</h2>' +
          '<div class="archive__item-teaser">' +
          '<img src="' + store[ref].teaser + '" alt="">' +
          '</div>' +
          '<p class="archive__item-excerpt" itemprop="description">' + contextSnippet + '</p>' +
          '</article>' +
          '</div>';
      }
      else {
        var searchitem =
          '<div class="list__item">' +
          '<article class="archive__item" itemscope itemtype="https://schema.org/CreativeWork">' +
          '<h2 class="archive__item-title" itemprop="headline">' +
          '<a href="' + removeExtension(store[ref].url) + '" onclick="searchResultLinkClickHandler(event)" rel="permalink">' + highlightTerms(store[ref].title, query, compoundTerms, fuzzyEnabled) + '</a>' +
          '</h2>' +
          '<p class="archive__item-excerpt" itemprop="description">' + contextSnippet + '</p>' +
          '</article>' +
          '</div>';
      }
      resultdiv.append(searchitem);
    }
  }
  $('input#search').on('keyup', onKeyUp);
  
  // Function to update fuzzy checkbox state based on exact-only mode
  function updateFuzzyCheckboxState() {
    var exactOnlyCheckbox = document.getElementById('search-exact-only');
    var fuzzyCheckbox = document.getElementById('search-fuzzy');
    
    if (exactOnlyCheckbox && fuzzyCheckbox) {
      var fuzzyLabel = fuzzyCheckbox.nextElementSibling; // Get the span label next to checkbox
      
      if (exactOnlyCheckbox.checked) {
        fuzzyCheckbox.disabled = true;
        fuzzyCheckbox.style.opacity = '0.5';
        fuzzyCheckbox.style.cursor = 'not-allowed';
        if (fuzzyLabel) {
          fuzzyLabel.style.opacity = '0.5';
          fuzzyLabel.style.cursor = 'not-allowed';
        }
      } else {
        fuzzyCheckbox.disabled = false;
        fuzzyCheckbox.style.opacity = '1';
        fuzzyCheckbox.style.cursor = 'pointer';
        if (fuzzyLabel) {
          fuzzyLabel.style.opacity = '1';
          fuzzyLabel.style.cursor = 'default';
        }
      }
    }
  }
  
  // Add listeners for search option checkboxes to re-trigger search
  $('#search-exact-only').on('change', function() {
    window.logger.log('[Search] Exact-only mode ' + (this.checked ? 'enabled' : 'disabled'));
    updateFuzzyCheckboxState(); // Update fuzzy checkbox state
    saveCheckboxStates(); // Save state to localStorage
    onKeyUp(); // Re-run search with new setting
  });
  
  $('#search-fuzzy').on('change', function() {
    window.logger.log('[Search] Fuzzy matching ' + (this.checked ? 'enabled' : 'disabled'));
    saveCheckboxStates(); // Save state to localStorage
    onKeyUp(); // Re-run search with new setting
  });

  // Initialize fuzzy checkbox state on page load
  restoreCheckboxStates(); // Restore saved checkbox states first
  updateFuzzyCheckboxState(); // Then update UI based on exact-only state

  restoreInputValue();
});
