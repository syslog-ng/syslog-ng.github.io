---
layout: none
---

var store = [
  {%- for c in site.collections -%}
    {%- if forloop.last -%}
      {%- assign l = true -%}
    {%- endif -%}
    {%- assign docs = c.docs | where_exp:'doc','doc.search != false' -%}
    {%- for doc in docs -%}
      {%- if doc.header.teaser -%}
        {%- capture teaser -%}{{ doc.header.teaser }}{%- endcapture -%}
      {%- else -%}
        {%- assign teaser = site.teaser -%}
      {%- endif -%}
      {
        "title": {{ doc.title | liquify | markdownify | strip_html | strip_newlines| jsonify }},
        "excerpt":
          {%- if site.search_full_content == true -%}
            {{ doc.content | newline_to_br |
              replace:"<br />", " " |
              replace:"</p>", " " |
              replace:"</h1>", " " |
              replace:"</h2>", " " |
              replace:"</h3>", " " |
              replace:"</h4>", " " |
              replace:"</h5>", " " |
              replace:"</h6>", " "|
            strip_html | strip_newlines | jsonify }},
          {%- else -%}
            {{ doc.content | newline_to_br |
              replace:"<br />", " " |
              replace:"</p>", " " |
              replace:"</h1>", " " |
              replace:"</h2>", " " |
              replace:"</h3>", " " |
              replace:"</h4>", " " |
              replace:"</h5>", " " |
              replace:"</h6>", " "|
            strip_html | strip_newlines | truncatewords: 50 | jsonify }},
          {%- endif -%}
        "categories": {{ doc.categories | jsonify }},
        "tags": {{ doc.tags | jsonify }},
        "url": {{ doc.url | relative_url | jsonify }},
        "teaser": {{ teaser | relative_url | jsonify }}
      }
      {%- comment -%}
        Per-heading sub-entries. A query that exactly matches a section
        heading should outrank a generic body-text hit on the parent
        page, so we emit one extra store entry per heading whose title
        IS the heading text and whose URL deep-links to the anchor.
        kramdown emits stable `id` attributes for headings by default.
        Each heading entry is prefixed with `,` so the JSON array stays
        well-formed regardless of how many headings the doc has; the
        outer `unless forloop.last and l` after the loop still controls
        the trailing comma between successive docs.
      {%- endcomment -%}
      {%- assign headings = doc.content | extract_headings -%}
      {%- for h in headings -%}
      ,{
        "title": {{ h.text | jsonify }},
        "excerpt": {{ doc.title | liquify | markdownify | strip_html | strip_newlines | jsonify }},
        "categories": {{ doc.categories | jsonify }},
        "tags": {{ doc.tags | jsonify }},
        "url": {{ doc.url | append: '#' | append: h.id | relative_url | jsonify }},
        "teaser": {{ teaser | relative_url | jsonify }},
        "is_heading": true
      }
      {%- endfor -%}
      {%- unless forloop.last and l -%},{%- endunless -%}
    {%- endfor -%}
  {%- endfor -%}
  {%- if site.lunr.search_within_pages -%},
    {%- assign pages = site.pages | where_exp:'doc','doc.search != false' -%}
    {%- for doc in pages -%}
      {%- if forloop.last -%}
        {%- assign l = true -%}
      {%- endif -%}
      {
        "title": {{ doc.title | liquify | markdownify | strip_html | strip_newlines| jsonify }},
        "excerpt":
            {%- if site.search_full_content == true -%}
              {{ doc.content | newline_to_br |
                replace:"<br />", " " |
                replace:"</p>", " " |
                replace:"</h1>", " " |
                replace:"</h2>", " " |
                replace:"</h3>", " " |
                replace:"</h4>", " " |
                replace:"</h5>", " " |
                replace:"</h6>", " "|
              strip_html | strip_newlines | jsonify }},
            {%- else -%}
              {{ doc.content | newline_to_br |
                replace:"<br />", " " |
                replace:"</p>", " " |
                replace:"</h1>", " " |
                replace:"</h2>", " " |
                replace:"</h3>", " " |
                replace:"</h4>", " " |
                replace:"</h5>", " " |
                replace:"</h6>", " "|
              strip_html | strip_newlines | truncatewords: 50 | jsonify }},
            {%- endif -%}
          "url": {{ doc.url | absolute_url | jsonify }}
      }{%- unless forloop.last and l -%},{%- endunless -%}
    {%- endfor -%}
  {%- endif -%}]
