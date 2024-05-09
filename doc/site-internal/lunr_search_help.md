---
title: Documentation Search Help
permalink: /lunr_search_help
id: site-lunr-search-help
search: false
---

We are using [[Lunr|lunr-site]] for searching, this is a slightly modified snippet of the original [[Lunr searching page|lunr-search-help]].<br/>
Please visit the original Lunar site for more information.

## Searching

The simplest way to start is to pass the text on which you want to search into the search field:

``` javascript
foo
```

The above will return details of all documents that match the term “foo”. Although it looks like a string, the search method parses the string into a search query. This supports special syntax for defining more complex queries.

Searches for multiple terms are also supported. If a document matches at least one of the search terms, it will show in the results. The search terms are combined with OR.

``` javascript
foo bar
```

The above example will match documents that contain either “foo” or “bar”. Documents that contain both will score more highly and will be returned first.

## Scoring

The score (also known as relevance) of a document is calculated by the BM25 algorithm, along with other factors such as boosts. You don’t need to worry too much about the details of how BM25 works; to summarize, the more a search term occurs in a single document, the more that term will increase that document’s score, but the more a search term occurs in the overall collection of documents, the less that term will increase a document’s score.

For example, let’s say you’re indexing a collection of documents about JavaScript testing libraries. The terms “JavaScript”, “library”, and “test” may occur very frequently throughout the entire collection, so finding a document that mentions one of these terms isn’t very significant. However, if you’re searching for “integration test”, only three documents in the collection have the term “integration” in them, and one of them mentions “integration” many times, that will bring the score for that one document higher up.

## Wildcards

Lunr supports wildcards when performing searches. A wildcard is represented as an asterisk (*) and can appear anywhere in a search term. For example, the following will match all documents with words beginning with “foo”:

``` javascript
foo*
```

This will match all documents that end with ‘oo’:

``` javascript
*oo
```

Leading wildcards, as in the above example, should be used sparingly. They can have a negative impact on the performance of a search, especially in large indexes.

Finally, a wildcard can be in the middle of a term. The following will match any documents that contain a term that begins with “f” and ends in “o”:

``` javascript
f*o
```

It is also worth noting that, when a search term contains a wildcard, no stemming is performed on the search term.

## Term Presence

By default, Lunr combines multiple terms together in a search with a logical OR. That is, a search for “foo bar” will match documents that contain “foo” or contain “bar” or contain both. This behaviour is controllable at the term level, i.e. the presence of each term in matching documents can be specified. By default each term is optional in a matching document, though a document must have at least one matching term. It is possible to specify that a term must be present in matching documents, or that it must be absent in matching documents.

To indicate that a term must be present in matching documents the term should be prefixed with a plus (+) and to indicate that a term must be absent the term should be prefixed with a minus (-). Without either prefix the term’s presence in matching documents is optional.

The below example searches for documents that must contain “foo”, might contain “bar” and must not contain “baz”:

``` javascript
+foo bar -baz
```

To simulate a logical AND search of “foo AND bar” mark both terms as required:

``` javascript
+foo +bar
```

## Fields

By default, Lunr will search all fields in a document for the query term, and it is possible to restrict a term to a specific field. The following example searches for the term “foo” in the field title:

``` javascript
title:foo
```

The search term is prefixed with the name of the field, followed by a colon (:). The field must be one of the fields defined when building the index. Unrecognised fields will lead to an error.

Field-based searches can be combined with all other term modifiers and wildcards, as well as other terms. For example, to search for words beginning with “foo” in the title or with “bar” in any field the following query can be used:

``` javascript
title:foo* bar
```

## Boosts

In multi-term searches, a single term may be important than others. For these cases Lunr supports term level boosts. Any document that matches a boosted term will get a higher relevance score, and appear higher up in the results. A boost is applied by appending a caret (^) and then a positive integer to a term.

``` javascript
foo^10 bar
```

The above example weights the term “foo” 10 times higher than the term “bar”. The boost value can be any positive integer, and different terms can have different boosts:

``` javascript
foo^10 bar^5 baz
```

## Fuzzy Matches

Lunr supports fuzzy matching search terms in documents, which can be helpful if the spelling of a term is unclear, or to increase the number of search results that are returned. The amount of fuzziness to allow when searching can also be controlled. Fuzziness is applied by appending a tilde (~) and then a positive integer to a term. The following search matches all documents that have a word within 1 edit distance of “foo”:

``` javascript
foo~1
```

An edit distance of 1 allows words to match if either adding, removing, changing or transposing a character in the word would lead to a match. For example “boo” requires a single edit (replacing “f” with “b”) and would match, but “boot” would not as it also requires an additional “t” at the end.
