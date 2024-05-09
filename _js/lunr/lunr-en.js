---
layout: none
---

var idx = lunr(function () {
  this.field('title')
  this.field('excerpt')
  this.field('categories')
  this.field('tags')
  this.ref('id')

  this.pipeline.remove(lunr.trimmer)

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

// Function to set a cookie
function setCookie(name, value, days) {
  var expires = "";
  if (days) {
    var date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + (value || "") + expires + "; path=/; SameSite=Strict";
}

// Function to get a cookie value
function getCookie(name) {
  var nameEQ = name + "=";
  var ca = document.cookie.split(';');
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1, c.length);
    }
    if (c.indexOf(nameEQ) == 0) {
      return c.substring(nameEQ.length, c.length);
    }
  }
  return null;
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
    setCookie('search', searchInput.value, 365);
  }

  function onKeyUp() {
    saveInputValue();

    var resultdiv = $('#results');
    var searchInput = document.getElementById('search');
    var query = searchInput.value.toLowerCase();
    var result =
      idx.query(function (q) {
        query.split(lunr.tokenizer.separator).forEach(function (term) {
          q.term(term, { boost: 100 })
          if (query.lastIndexOf(" ") != query.length - 1) {
            q.term(term, { usePipeline: false, wildcard: lunr.Query.wildcard.TRAILING, boost: 10 })
          }
          if (term != "") {
            q.term(term, { usePipeline: false, editDistance: 1, boost: 1 })
          }
        })
      });
    resultdiv.empty();
    resultdiv.prepend('<p class="results__found">' + result.length + ' {{ site.data.ui-text[site.locale].results_found | default: "Result(s) found" }}</p>');
    for (var item in result) {
      var ref = result[item].ref;
      if (store[ref].teaser) {
        var searchitem =
          '<div class="list__item">' +
          '<article class="archive__item" itemscope itemtype="https://schema.org/CreativeWork">' +
          '<h2 class="archive__item-title" itemprop="headline">' +
          '<a href="' + removeExtension(tore[ref].url) + '" rel="permalink">' + store[ref].title + '</a>' +
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
          '<a href="' + removeExtension(store[ref].url) + '" rel="permalink">' + store[ref].title + '</a>' +
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
