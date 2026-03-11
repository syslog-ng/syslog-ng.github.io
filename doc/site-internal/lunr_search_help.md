---
title: Documentation Search Help
permalink: /lunr_search_help
id: site-lunr-search-help
search: false
---

We are using [[Lunr|lunr-site]] for searching with custom enhancements for syslog-ng documentation.

## Search Options

### Exact matches only
When **checked**, the search returns only pages containing your **exact search terms** (including compound terms like "normalize-hostnames"). This disables automatic:
- Fuzzy/typo matching (Strategy 5)
- Wildcard variations (Strategy 4)  
- Stemmed partial matches (Strategy 3)

Only Strategies 1 and 2 remain active (exact compound term and all terms together).

**Use this when**: You know the exact term and want precise results without variations.

**Default state**: Unchecked

### Fuzzy matching
When **checked** (default), the search automatically includes pages with **similar terms** and **typo tolerance** (Strategy 5). For example, searching "normalize" will also find "normalization", "normalized", etc.

**Note**: This checkbox is automatically disabled (and fuzzy matching is turned off) when "Exact matches only" is checked.

**Default state**: Checked

## How Search Works

The search uses a 5-strategy ranking system optimized for compound terms (e.g., "normalize-hostnames"):

1. **Full compound term matches** (1,000× - 100,000× boost)
   - In title: highest priority
   - In excerpt: high priority
   - In body: medium-high priority

2. **All terms together** (100× boost)
   - Pages containing all your search words

3. **Exact component parts** (10× boost) - *disabled when exact-only*
   - Individual parts of compound terms (e.g., "normalize" AND "hostnames")
   - Requires exact match, not stemmed

4. **Wildcard variations** (5× boost) - *disabled when exact-only*
   - Catches word variations (e.g., "normalized", "normalizing")

5. **Fuzzy/typo matches** (0.01× boost) - *disabled when exact-only or fuzzy unchecked*
   - Tolerates typos and very similar words

## Practical Examples

**Searching for "normalize-hostnames":**

| Checkbox State | What You Get |
|----------------|--------------|
| **Default** (Exact: ☐, Fuzzy: ☑) | All 5 strategies active: exact "normalize-hostnames", its parts, wildcard variations (e.g., "normalized"), and typo tolerance |
| **Exact only** (Exact: ☑, Fuzzy: ☐ disabled) | Strategies 1-2 only: exact "normalize-hostnames" and pages with all terms together. No variations, no typos |
| **Fuzzy off** (Exact: ☐, Fuzzy: ☐) | Strategies 1-4: exact term, its parts, wildcard variations, but NO typo tolerance |

**Searching for "file system":**

| Checkbox State | What You Get |
|----------------|--------------|
| **Default** | Finds "file system" (exact phrase), pages with both words, variations like "filesystem", "filing", etc. |
| **Exact only** | Only exact phrase "file system" (both words present) |

**Tip**: Use "Exact matches only" when searching for specific configuration option names or commands where you want NO variations.

## Advanced Lunr Search Syntax

**Understanding Automatic vs. Manual Search Features:**

The **checkboxes control automatic search behavior** (which strategies are applied to your search terms). The **manual Lunr syntax below** gives you additional control over individual search terms, regardless of checkbox settings.

**Important**: Manual syntax features (wildcards `*`, term presence `+/-`, field searches `title:`, boosts `^`, fuzzy `~`) work alongside the checkbox-controlled strategies. However:
- When **"Exact matches only"** is checked, only Strategies 1-2 are active, so manual wildcards and fuzzy operators may not expand results as much as expected
- The checkboxes provide automatic behavior; manual syntax provides term-level control

### Basic Searching

The simplest way to search is to enter your query text:

``` javascript
foo
```

The above will return details of all documents that match the term “foo”. Although it looks like a string, the search method parses the string into a search query. This supports special syntax for defining more complex queries.

Searches for multiple terms are also supported. If a document matches at least one of the search terms, it will show in the results. The search terms are combined with OR.

``` javascript
foo bar
```

The above example will match documents that contain either “foo” or “bar”. Documents that contain both will score more highly and will be returned first.

### Wildcards (Manual)

**Note**: This describes **manual wildcard syntax** you can type. Additionally, when "Exact matches only" is unchecked, the search automatically applies wildcards to find word variations (Strategy 4) — you don't need to type `*` for this automatic behavior.

Lunr supports manual wildcards in your search terms. A wildcard is represented as an asterisk (*) and can appear anywhere in a search term. For example:

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

### Term Presence

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

### Fields

By default, Lunr will search all fields in a document for the query term, and it is possible to restrict a term to a specific field. The following example searches for the term “foo” in the field title:

``` javascript
title:foo
```

The search term is prefixed with the name of the field, followed by a colon (:). The field must be one of the fields defined when building the index. Unrecognised fields will lead to an error.

Field-based searches can be combined with all other term modifiers and wildcards, as well as other terms. For example, to search for words beginning with “foo” in the title or with “bar” in any field the following query can be used:

``` javascript
title:foo* bar
```

### Boosts

In multi-term searches, a single term may be more important than others. For these cases Lunr supports term level boosts. Any document that matches a boosted term will get a higher relevance score, and appear higher up in the results. A boost is applied by appending a caret (^) and then a positive integer to a term.

``` javascript
foo^10 bar
```

The above example weights the term “foo” 10 times higher than the term “bar”. The boost value can be any positive integer, and different terms can have different boosts:

``` javascript
foo^10 bar^5 baz
```

### Fuzzy Matches (Manual)

**Note**: This describes **manual fuzzy syntax** you can type (`~` operator). Additionally, the **"Fuzzy matching" checkbox** controls automatic fuzzy matching (Strategy 5) for ALL your search terms. The manual syntax below lets you apply fuzzy matching to specific terms with custom edit distances.

Lunr supports manual fuzzy matching by appending a tilde (~) and a positive integer to a term. The following search matches all documents that have a word within 1 edit distance of "foo":

``` javascript
foo~1
```

An edit distance of 1 allows words to match if either adding, removing, changing or transposing a character in the word would lead to a match. For example “boo” requires a single edit (replacing “f” with “b”) and would match, but “boot” would not as it also requires an additional “t” at the end.

## Scoring

The search scoring combines two systems:

1. **Custom boost multipliers** from the [5-strategy system](#how-search-works) described above (1,000×, 100×, 10×, 5×, 0.01×)
2. **BM25 base scoring** from Lunr (the underlying algorithm)

The **custom boosts** determine which type of match is most valuable (exact compound term vs fuzzy match), while **BM25** scores how well individual terms match within each document.

### How BM25 Works

In simple terms: the more a search term occurs in a single document, the more that term will increase that document's score. However, the more a search term occurs across all documents, the less that term will increase any document's score.

**Example**: When searching for "normalize-hostnames" in syslog-ng documentation:
- Common terms like "syslog" or "configuration" appear in many documents, so they contribute less to the score
- Specific terms like "normalize" or "hostnames" appear in fewer documents, so they contribute more to the score
- A page mentioning "normalize-hostnames" multiple times will score higher than one mentioning it once

---

**Additional Resources**: For more advanced Lunr search syntax and capabilities, see the [[original Lunr documentation|lunr-search-help]].