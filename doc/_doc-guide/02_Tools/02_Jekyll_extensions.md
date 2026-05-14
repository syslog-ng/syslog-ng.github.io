---
title: Jekyll extensions, plug-ins
id: doc-jekyll-extensions
description:  >-
    Jekyll is felxible and extendable, accepts various [[plugins|jekyll-plugins]], liquid or markdown extensions, and we are using a bit of all of them.
# Mandatory on pages with raw Liquid examples or self-rendered content. Details: doc/_doc-guide/02_Tools/02_Jekyll_extensions.md
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

the url and the default title text must not be provided here (though can be overriden if needed), the lookup of them will be automatic based on the given ID, the generate_links collected links in the `${PROJECT_ROOT}/_data/links` folder are also available via the `site.data.links` liquid variable, markdown_link uses this variable as well to search for the given ID and the corresponding title and url.
{: .notice--primary}

The examples below show the **include invocation** (top fence) and the **raw Markdown that the include expands to** (bottom fence). Jekyll then runs kramdown on that Markdown to produce the final HTML `<a>` tag, so what you see is an intermediate representation, not the final rendered output.
{: .notice--info}

You can use the following parameters to adjust the composition of the above `md_link_` options:

- `decl`, a boolean string `'yes'`, `'no'` or value `true`, `false` that controls if the generated link is a declaration, or definition, e.g.:

    ``` liquid
    {% raw %}{% include markdown_link id='id' decl=true %}{% endraw %}
    ```

    Expands to:

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

    Expands to:

    ``` markdown
    [title](url){: class="nav-link" }
    ```

    the `class="nav-link"` style is always added to the link, except if `outOfFrame` is set to `yes` (or `newPage` is set to `yes`, see below).
    {: .notice--primary}

- `title`, a custom title that can override the one that belongs to the given link ID, e.g.:

    ``` liquid
    {% raw %}{% include markdown_link id='id' title='custom title' %}{% endraw %}
    ```

    Expands to:

    ``` markdown
    [custom title](url){: class="nav-link" }
    ```

- `withTooltip`, a boolean string `'yes'`, `'no'` or value `true`, `false` that controls if the genrated link should have css class style that is treated as [[autolink/tooltip]], e.g.:

    ``` liquid
    {% raw %}{% include markdown_link id='id' withTooltip=true %}{% endraw %}
    ```

    Expands to:

    ``` markdown
    [title](url){: class="nav-link content-tooltip" }
    ```

    generate_tooltips will use the `content-tooltip` class to generate autolink/tooltip.

- `newPage`, a boolean string `'yes'`, `'no'` or value `true`, `false` that controls if a navigational click on the generated final HTML anchor element will open the link in a new browser tab, or window, e.g.:

    ``` liquid
    {% raw %}{% include markdown_link id='id' newPage=true %}{% endraw %}
    ```

    Expands to:

    ``` markdown
    [title](url){:  target="_blank" }
    ```

    Note: the current include implementation **replaces** the class IAL with `target="_blank"`, so `class="nav-link"` is dropped when `newPage=true`. The link therefore falls out of the SPA navigation flow and triggers a full page load in the new tab -- which is the desired behaviour for new-tab links.
    {: .notice--primary}

- `outOfFrame`, a boolean string `'yes'`, `'no'` or value `true`, `false` that controls if a navigational click on the generated final HTML anchor element will open the linked content in the right frame of the page, or will trigger a full page load that replacing the current content entirely, e.g.:

    ``` liquid
    {% raw %}{% include markdown_link id='id' outOfFrame=true %}{% endraw %}
    ```

    Expands to:

    ``` markdown
    [title](url){: class="" }
    ```

    The empty `class=""` IAL means the `nav-link` style is omitted, so the link triggers a full page load instead of an SPA content swap.
    {: .notice--primary}

## liquify

liquify.rb is a nice liquid filter that parses liquid objects to their actual value, it is useful e.g. places wehre it is not happening automatically f.e. in [[page titles|liquify-rb]].

## generate_links

Our generate_links.rb Jekyll plugin creates the content of the `${PROJECT_ROOT}/_data/links` folder. The generated link files are created from all the H1-H6 headings, named anchors, and the page self-links of our markdown pages. The links are used for autolink/tooltip generation and page navigation ordering.

It is gated by the `JEKYLL_BUILD_LINKS=yes` environment variable and runs on the `:site, :post_render` hook -- i.e. **after** Jekyll has rendered every page to HTML, so it can extract anchor information from the final DOM.

## generate_tooltips

The generate_tooltips.rb Jekyll plugin is responsible for adding autolink/tooltip items to our pages. It is gated by the `JEKYLL_BUILD_TOOLTIPS=yes` environment variable and registers on **two** Jekyll hooks within the same build:

- `:site, :pre_render` -- loads the link dictionary built by `generate_links` from `_data/links/`, sorts entries by title length (longest first to avoid partial-word matches), and applies aliases and exclusions
- `[:pages, :documents], :pre_render` -- iterates each page's Markdown content, splits it into safe-to-process spans (skipping fenced code blocks, existing links, headings) and injects `<a href="...">title</a>` HTML anchors directly into the Markdown source. kramdown then preserves these inline `<a>` tags as-is when converting Markdown to HTML.

It is far-far not optimal, makes the whole rendering process very slow now and needs enhancements badly, please feel free to contribute to make it more effective!

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

- in the **first Jekyll build** (`JEKYLL_BUILD_LINKS=yes`)
  - the Jekyll liquid parser creates named anchors from our `markdown_link` liquid includes
  - kramdown converts each page's Markdown into HTML
  - on `:site, :post_render`, `generate_links` parses the rendered HTML with Nokogiri and writes one link descriptor per page (id, url, title, priority) to `${PROJECT_ROOT}/_data/links/`

- in the **second Jekyll build** (`JEKYLL_BUILD_TOOLTIPS=yes`), `generate_tooltips`
  - on `:site, :pre_render`: loads every `_data/links/*.yml` into a single dictionary, sorted by title length in reverse order, then merges aliases from `${PROJECT_ROOT}/_data/link_aliases.yml` and removes excluded entries listed in `${PROJECT_ROOT}/_data/excluded_titles.yml`
  - on `[:pages, :documents], :pre_render`: walks the Markdown source of every page/document, finds plain-text matches against the dictionary and rewrites them into inline `<a class="...">title</a>` HTML anchors that kramdown will leave intact

- at runtime
  - the bundled JS (`_js/custom/navigation.js`, packed into `assets/js/main.min.js`) selects every anchor that carries the authoring class `content-tooltip` and attaches the hover/click tooltip behaviour to it; the rendered tooltip container then receives one of the runtime state classes `text-content-tooltip` or `full-content-tooltip` depending on the previewed content size (these two are **not** authoring classes -- do not write them in Markdown)

## Notice blocks

Notice blocks are the gray/colored callout boxes used throughout the documentation. They combine three pieces of machinery:

- the **Minimal Mistakes** `.notice` / `.notice--TYPE` classes,
- the `_plugins/expand_notice_blocks.rb` plugin that expands paired markers into a wrapping `<div>`,
- the `@mixin notice-prefix` rule in `_sass/minimal-mistakes/minimal-mistakes/_notices.scss` that injects the leading icon and the bold label automatically.

### Notice types and CSS-driven icon and label auto-injection

The five typed notice variants get their leading icon and bold label injected automatically by `@mixin notice-prefix`. **Authors must never write the `![](.../icon.png) **LABEL:**` prefix in the source** — doing so would render the icon and label twice. The plain `.notice` class has no auto-prefix; any leading label there is written manually.

| Class               | Auto-injected icon                                            | Auto-injected label |
|---------------------|---------------------------------------------------------------|---------------------|
| `.notice--primary`  | ![](/assets/images/note.png)    `/assets/images/note.png`     | **NOTE:**           |
| `.notice--info`     | ![](/assets/images/info.png)    `/assets/images/info.png`     | **INFO:**           |
| `.notice--warning`  | ![](/assets/images/caution.png) `/assets/images/caution.png`  | **WARNING:**        |
| `.notice--danger`   | ![](/assets/images/warning.png) `/assets/images/warning.png`  | **DANGER:**         |
| `.notice--success`  | ![](/assets/images/success.png) `/assets/images/success.png`  | **SUCCESS:**        |
| `.notice` (plain)   | — none —                                                      | — none —            |

The auto-injected prefix flows inline with the first line of the body text. To change an icon or a label, edit `@mixin notice-prefix` invocations near the bottom of `_sass/minimal-mistakes/minimal-mistakes/_notices.scss`.

**List-first paired-marker notices.** When the first block inside a paired-marker notice is a list (`<ol>` or `<ul>`), the icon and label render on the wrapping container's own line above the list rather than inline with the first list item. This avoids collisions with the `1.` / bullet markers. To get an inline prefix instead, lead the body with a paragraph or heading before the list.

#### Opt-out — `.no-prefix` modifier

Add `.no-prefix` alongside the variant class to suppress the auto-injected icon and label for a single notice. Use this only when the body already provides its own visual cue (a custom heading, a bespoke inline icon, embedded HTML, etc.):

```markdown
Body text rendered without the icon and label prefix.
{: .notice--warning .no-prefix}
```

Rendered:

Body text rendered without the icon and label prefix.
{: .notice--warning .no-prefix}

The paired-marker form supports the same modifier — append it to the start marker:

```markdown
{: .notice--warning-start .no-prefix}

Multi-block body without the auto-injected prefix.

{: .notice--warning-end}
```

Rendered:

{: .notice--warning-start .no-prefix}

Multi-block body without the auto-injected prefix.

{: .notice--warning-end}

### Single-block form (kramdown IAL)

Attaches to the **single** preceding Markdown block. Use this for one-paragraph notices.

```markdown
Important information here.
{: .notice--info}

Critical warning here.
{: .notice--warning}
```

Rendered:

Important information here.
{: .notice--info}

Critical warning here.
{: .notice--warning}

### Multi-block form (paired markers)

Use the paired markers expanded by `_plugins/expand_notice_blocks.rb` when the notice must wrap lists, fenced code blocks, headings, or multiple paragraphs. Each marker must be on its own line:

````markdown
{: .notice--warning-start}

Leading paragraph.

1. ordered list item
2. another item

```config
fenced code is fine here
```

Closing paragraph.

{: .notice--warning-end}
````

Rendered:

{: .notice--warning-start}

Leading paragraph.

1. ordered list item
2. another item

```config
fenced code is fine here
```

Closing paragraph.

{: .notice--warning-end}

Pairing is **strict** — any of these aborts the build with a clear error that names the file and line numbers:

- every `*-start` must have a matching `*-end` of the **same** type, in source order
- nesting is forbidden (a second `*-start` while another block is still open is an error)
- a stray `*-end` without a matching `*-start` is an error

Markers inside fenced code blocks and HTML comments are left untouched, so this syntax can be documented verbatim.

For the live rendering test of all five typed variants and the plain `.notice`, see [[Notice blocks and inline custom markdown|doc-testing-page#notice-blocks-and-inline-custom-markdown]].
