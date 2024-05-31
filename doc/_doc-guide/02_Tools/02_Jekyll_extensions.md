---
title: Jekyll extensions, plug-ins
id: doc-jekyll-extensions
description:  >-
    Jekyll is felxible and extendable, accepts various [[plugins|jekyll-plugins]], liquid or markdown extensions, and we are using a bit of all of them.
# Take care, using liquid examples in a liquid rendered page might require a special notation even if {% raw %} and {% endraw %} block should protect alone these blocks (https://jekyllrb.com/docs/liquid/tags/), but it does not exactly !!!
# See the _doc-guide/02_Tools/01_Self_made_tools/01_Tests/README.md page how can escape it correctly in some cases (otherwise our custom page rendering might break!!!)
# We found that using the `render_with_liquid: false` frontmatter option helps best, though it is not clearly documented, and its name suggests it will supress liquid rendering entirely, but (luckily ?) with our custom rendering (_plugins/generate_tooltips.rb) it supresses only the final liquid render pass (absence of `render_with_liquid: false` can fully eliminate our self-rendered content otherwise)
render_with_liquid: false
---

## markdown_link

This pure liquid include file can be used to generate markdown links from the links created by our generate_links plugin with various additionsl parameters.

It can declare

``` liquid
{% raw %}[ref:{{ md_link_id }}]: {{ md_link_url | relative_url }}{% endraw %}
```

or define

``` liquid
{% raw %}[{{ md_link_title }}]({{ md_link_url | relative_url }}){: {{ md_link_style }} }{% endraw %}
```

a markdown link, where the link url and title is handled automatically using the given ID.

Please note that the url and the default title text must not be provided here (though can be overriden if needed), the lookup of them will be automatic based on the given ID, the generate_links collected links in the `${PROJECT_ROOT}/_data/links` folder are also available via the `site.data.links` liquid variable, markdown_link uses this variable as well to search for the given ID and the corresponding title and url.
{: .notice}

You can use the following parameters to adjust the composition of the above `md_link_` options:

- `decl`, a boolean string `'yes'`, `'no'` or value `true`, `false` that controls if the generated link is a declaration, or definition, e.g.:

    ``` liquid
    {% raw %}{% include markdown_link id='id' decl=true %}{% endraw %}
    ```

    markdown output

    ``` markdown
    [ref:id]: url
    ```

    that you can use later like

    ``` markdown
    [custom title][ref:id]
    ```

- `id`, the link ID, e.g.:

    ``` liquid
    {% raw %}{% include markdown_link id='id' %}{% endraw %}
    ```

    markdown output

    ``` markdown
    [title](url){: class="nav-link" }
    ```

    Please note that the `class="nav-link"` style is always added to the link, except if `outOfFrame` is set to `yes`
    {: .notice}

- `title`, a custom title that can override the one that belongs to the given link ID, e.g.:

    ``` liquid
    {% raw %}{% include markdown_link id='id' title='custom title' %}{% endraw %}
    ```

    markdown output

    ``` markdown
    [custom title](url){: class="nav-link" }
    ```

- `withTooltip`, a boolean string `'yes'`, `'no'` or value `true`, `false` that controls if the genrated link should have css class style that is treated as [[autolink/tooltip]], e.g.:

    ``` liquid
    {% raw %}{% include markdown_link id='id' withTooltip=true %}{% endraw %}
    ```

    markdown output

    ``` markdown
    [title](url){: class="nav-link content-tooltip" }
    ```

    generate_tooltips will use the `content-tooltip` class to generate autolink/tooltip.

- `newPage`, a boolean string `'yes'`, `'no'` or value `true`, `false` that controls if a navigational click on the generated final HTML anchor element will open the link in a new browser tab, or window, e.g.:

    ``` liquid
    {% raw %}{% include markdown_link id='id' newPage=true %}{% endraw %}
    ```

    markdown output

    ``` markdown
    [title](url){: class="nav-link" target="_blank" }
    ```

- `outOfFrame`, a boolean string `'yes'`, `'no'` or value `true`, `false` that controls if a navigational click on the generated final HTML anchor element will open the linked content in the right frame of the page, or will trigger a full page load that replacing the current content entirely, e.g.:

    ``` liquid
    {% raw %}{% include markdown_link id='id' outOfFrame=true %}{% endraw %}
    ```

    markdown output

    ``` markdown
    [title](url){: }
    ```

    Please note the absence of the `class="nav-link"` style, that will not be added if outOfFrame is `true`
    {: .notice}

## liquify

liquify.rb is a nice liquid filter that parses liquid objects to their actual value, it is useful e.g. places wehre it is not happening automatically f.e. in [[page titles|liquify-rb]].

## generate_links

Our generate_links.rb Jekyll plugin creates the content of the `${PROJECT_ROOT}/_data/link` folder. The generated link files are created from all the H1-H6 headings, named anchors, and the page self-links of our markdown pages. The links are used for autolink/tooltip generation and page navigation ordering.

## generate_tooltips

The generate_tooltips.rb Jekyll plugin is responsible for adding autolink/tooltip items to our pages. It uses multiple [[page render hook|jekyll-render-hooks]] pases, please see the source-code why it is needed. It is far-far not optimal, makes the whole rendering process very slow now and needs enhancements badly, please feel free to contribute to make it more effective!

## \[\[title\|id\]\] markdown extension

The generate_tooltips plugin can interpret this format of markdown linking. It accepts the following formats

- `[[title]]`
    This can force autolink/tooltip generation to use the encapsulated `title` string for title matching. This can be useful when the given title is part of a longer title sentence that otherwise will be used for the autolink/tooltip composition. \
    In the following sentence

    ``` text
    The syslog-ng OSE darwin-oslog() source options explains how you can configure the new native macOS sytem log source.
    ```

    the darwin-oslog() source options normally will become an autolink/tooltip, as we have a page with this title which its own link is part of the `${PROJECT_ROOT}/_data/links` collection produced by generate_links, therefore will be transformed automatically to an autolink/tooltip by generate_tooltips.

    Using

    ``` text
    The [[syslog-ng OSE]] darwin-oslog() [[source]] options explains how you can configure the new native macOS sytem log source.
    ```

    the syslog-ng OSE and the source will become an autolink/tooltip instead.

- `[[title|id]]`
    This can force autolink/tooltip generation to use a different `title` string for a given link `id`, or a different `id` (that way the link belongs to that `id`) for a given `title` string. This can be useful when the given title is ambigous in a given context, and one would like to force the generated autolink/tooltip point to a (different) specific location. \
    In the following sentence

    ``` text
    The syslog-ng OSE darwin-oslog() [[source|adm-src-macos]] is a new native macOS sytem log source.
    ```

    the first occrence of `source` will become an autolink/tooltip to the `admin-guide/060_Sources/085_macOS/README.md` page, whilst the second one will point to the default `admin-guide/200_About/002_Glossary#source`.

- `[[title|-]]`
    This is a special case which can be useful in a given context to temporally disable the generation of an autolink/tooltip, using this form the `title` text will not be touched at all, e.g.

    ``` text
    This can lead to the [[source|-]] of a misunderstanding.
    ```

    will produce

    This can lead to the [[source|-]] of a misunderstanding.

    without any autolink/tooltip generated (as in this context pointing to the default `admin-guide/200_About/002_Glossary#source` page is meaningless, and confusing).

- Any other combination with a missing `title` or `id` leads to an error message during build time and keeps the original special markdown part in the HTML output to signal the error visually as well, e.g.

    ``` text
    This can lead to the [[source|]] markdown reflected back in the final HTML output.
    ```

    will produce

    This can lead to the [[source|]] markdown reflected back in the final HTML output.

**A small cross-reference table of the use cases**

|&nbsp;\[\[&nbsp;case&nbsp;\]\]&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;found&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;success&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;result|
|-------------------|--------------|-------------|----------------------------------------|
| \[\[title\|id\]\] | id found     | ok          | the title text transformed to autolink/tootlip, its autolink/tooltip created based by id and the url belongs to that id |
| \[\[title\|id\]\] | id not found | error msg   | the markdown is included into the HTML output |
| \[\[title\]\]     | found        | ok          | the title text transformed to autolink/tootlip, its autolink/tooltip created based by the id of the first matching title in the link collection created by generate_links, and the url belongs to the found id |
| \[\[title\]\]     | not found    | error msg   | the markdown is included into the HTML output |
| \[\[title\|-\]\]  | n/a          | ok          | the exact title text without any modification |
| \[\[title\|\]\]   | n/a          | error msg   | the markdown is included into the HTML output |
| \[\[\|id\]\]      | n/a          | error mg    | the markdown is included into the HTML output |

**Example results of above cases from top down**

existing [[id with title|doc-jekyll-extensions]] test

unknown [[id|unknown-id]] test

forced existing [[source]] test

forced none existing [[title]] test

forced original text [[source|-]] test

empty [[id|]] test

empty title [[|doc-jekyll-extensions]] test

## autolink/tooltip

This enhancement allows us to create automatic links and Wikiwand like tooltips (previews of linked articles) in the markdown documentation pages to

- other local pages, based on their title text [h1 heading]
- headings [h2-h6] of any local pages, based on the heading text
- named anchors of any local pages, based on the anchor text
- any of the above, via given text parts that enumerated in the `${PROJECT_ROOT}/_data/link_aliases.yml` file
- any of the above, via given text parts that marked using our custom markdown notation
- any of the above, via our markdown_link liquid include
- external pages, via given text parts enumerated in the `${PROJECT_ROOT}/_data/external_links.yml` file

The automatic link and tooltip generation primarily use one-to-one text matching of the given text in the above enumerated cases to the markdown content, from the longest sentence to the shortest one. You can exclude specific sentences from the process using `${PROJECT_ROOT}/_data/excluded_titles.yml`.\
These can all be overridden by using the [[\[\[title&#124;id\]\] markdown extension|doc-jekyll-extensions#titleid-markdown-extension]], which always has priority over these rules (even over the exclusions!).

The basic flow is as follows:

- in the first site generation pass
  - the Jekyll liquid parser creates named anchors from our markdown_link liquid includes
  - the generate_links tool creates the input links in the `${PROJECT_ROOT}/_data/links/` folder from all the page links, [h2-h6] headings, and named anchors of the pages

- in the second site generation pass, the generate_tooltips tool
  - builds a link dictionary from all the page links of `${PROJECT_ROOT}/_data/links/` folder sorted by title length in reverse order
  - adds aliases to the given titles in the link dictionary from the `${PROJECT_ROOT}/_data/link_aliases.yml`
  - excludes titles from the link dictionary based on the content of the `${PROJECT_ROOT}/_data/external_links.yml` file

- in the third site generation pass, the generate_tooltips tool
  - finalizes the left navigation sidebar content from `${PROJECT_ROOT}/_data/navigation.yml`
  - generates the HTML code from the link dictionary for the autolinks and tooltips

- at runtime
  - .js code parts adds the tooltip code to the named anchors with specific autolink, tooltip class(es)
