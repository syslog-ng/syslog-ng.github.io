---
title: "This’s a self made tools testing page of {{ site.title }}"
# short_title can be turned off for in-title liquid testing in the nav bar, uncomment if needed
short_title: "Self made tools testing page"
id: doc-testing-page
subtitle: >-
    Description\subtitle is now not different than the normal, documentation body markdown texts.<br>
    Short title is used in the navigation bar.<br>
    It can contain ', and other special characters ()[].*?+^$, etc., though some of them might require escaping, e.g. \\ or \|<br>
    Mentioning documentation sections (markdown ##, or HTML <h 1-6> headings) via the exact section title text should work normally, like
    Slack destination options, but the linking can be forced as well via our custom markdown [[[[Timezones and daylight saving]]]] format.<br>
    Linking also could work with our {% include markdown_link id='doc-own-tools' title='markdown_link liquid include' withTooltip=true %}.<br>
    One more [[destination|adm-about-glossary#bom]] id=adm-about-glossary#bom override test from subtitle.<br>
    Macros test ${HOST}.<br>
    Liquid test `{{ site.title }}` - {{ site.title }}.<br>
    Markdown formatting should work as well, for example, **bold** and `inline code` tests.
# this can be tested as well, but do not send to the final version
search: false
# See warning bellow, or frontmatter of doc/_doc-guide/02_Tools/02_Jekyll_extensions.md 
# why this is mandatory now for pages using raw liquid examles
render_with_liquid: false
---

## H2 test row

Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

### H3 test row

Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

#### H4 test row

Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

##### H5 test row

Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

###### H6 test row

Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

## Notice blocks and inline custom markdown

Verifies that `{: .notice--info|warning|danger }` block attributes are honored, that `\{: ... \}` literally escaped attribute markers stay visible, that bold/macro/Liquid expansion still works inside notices, and that the custom `[[parser: ...]]` autolink form (title containing `:`) resolves.

**INFO:** \{: .notice--info\} Test \
any modifications or changes, use the **flags(no-parse)** option in the
source definition, and a template containing only the ${MESSAGE} macro in the destination definition.
{: .notice--info}

To parse non-syslog messages, for example, JSON, CSV, or other messages,
you can use the built-in parsers of {{ site.product.short_name }}. For details, see
[[parser: Parse and segment structured messages]].

`multi line backticked
text should be visible in a single line`

Markdown link tests:

1st [a source title](url1){: } - `[a source title](url1){: }`

2nd [a source title](url2) - `[a source title](url2)`

3rd a correct reference link declaration - `[a source url_ref]: url3` - (hopefully totally invisible)

[a source url_ref]: url3
<br>

4rd a reference link declaration with a missing space after : - `[b source url_ref]:url4` - (hopefully totally invisible)

[b source url_ref]:url4
<br>

5th [a source title][a source url_ref] using reference link 1 - `[a source title][a source url_ref]`

6th [a source title]    [a source url_ref] using reference link 1 with more than 1 space between the \[\]\[\] parts - `[a source title]    [a source url_ref]`

7th [b source title][b source url_ref] using reference link 2 - `[b source title][b source url_ref]`

8th [source title]{ b source url_ref } - non-reference `{ ... }` form after `[text]` (curly, not square brackets) - neither part is a kramdown link, both render as literal text - `[source title]{ b source url_ref }`

9th [a source]{: class="" } - kramdown IAL with empty class on a non-link `[text]`, single known token inside - `[a source]{: class="" }`

10th [a source title]{: class="" } - same IAL form with a multi-word phrase inside - `[a source title]{: class="" }`

11th an unknown notice block declaration - `{: source }` (hopefully invisible too)
{: source }
<br>

## Plain-text title matching and macros

Free-form prose that contains known link titles (`Soft macros`, `hard macros`, `SDATA`, `${HOST}`) — verifies title-text matching across line breaks, longest-title-first sort, and that backticks make `SDATA` an inline-code unit (still matched if the title is `SDATA`).

Soft macros (sometimes also called name-value pairs) are either
built-in macros automatically generated from the log message (for
example, ${HOST}), or custom user-created macros generated by using
the {{ site.product.short_name }} pattern database or a CSV-parser. The `SDATA` fields of
RFC-5424 formatted log messages become soft macros as well. In
contrast with hard macros, soft macros are writable and can be
modified within {{ site.product.short_name }}, for example, using rewrite rules.

**WARNING:** \{: .notice--warning\} Test \
for the list of hard and soft macros, see [[Hard versus soft macros]].  
{: .notice--warning}

**DANGER:** \{: .notice--danger\} Test \
at the location it reaches the log-msg-size() value, and discards the rest of the message.
{: .notice--danger}

## Fenced code blocks (must be fully inert)

Nothing inside a fenced block — option names, macros, titles, HTML comments — must be tooltipped or otherwise altered.

**Code block example:**

```config
options {
    stats(
        freq(1)
        level(1)
        lifetime(1000)
        max-dynamics(10000)
        syslog-stats(yes)
        stats()
    );
};
```

**XML block example with HTML comments:**

```xml
<patterndb version='4' pub_date='2015-04-13'>
    <ruleset name='sshd' id='12345678'>
        <pattern>sshd</pattern>
            <rules>
                <!-- The pattern database rule for the first log message -->
                <rule provider='me' id='12347598' class='system'
                    context-id="ssh-login-logout" context-timeout="86400"
                    context-scope="process">
                <!-- Note the context-id that groups together the
                relevant messages, and the context-timeout value that
                determines how long a new message can be added to the
                context  -->
                    <patterns>
                        <pattern>Accepted @ESTRING:SSH.AUTH_METHOD: @for @ESTRING:SSH_USERNAME: @from @ESTRING:SSH_CLIENT_ADDRESS: @port @ESTRING:: @@ANYSTRING:SSH_SERVICE@</pattern>
                        <!-- This is the actual pattern used to identify
                        the log message. The segments between the @
                        characters are parsers that recognize the variable
                        parts of the message - they can also be used as
                        macros.  -->
                    </patterns>
                </rule>
            </rules>
    </ruleset>
</patterndb>
```

## Tests of custom markdown in header link -> [[source]] and link -> [[with id|doc-jekyll-extensions#titleid-markdown-extension]]

Introduction to {{ site.product.short_name }} is a test for pages without description/subtitle, but text part between the title and the first heading which can have tooltips too this way.

Developer guide is a double (page title amd section heading) example with a description/subtitle.

[[Installing syslog-ng|adm-install]] is a forced, (also a doubled) page link title example with a description/subtitle.

This one is a [[Self page link|doc-testing-page]] test with ID, this one with the title only - This’s a self made tools testing page of {{ site.title }}, and a last one with direkt liquid usage - This’s a self made tools testing page of {{ site.title }}.

Test of forced link with anchored ID part [[Install Homebrew|dev-inst-macos#using-homebrew]].

1. Same test like above in an enumeration [[Install Homebrew|dev-inst-macos#using-homebrew]].

**Hint:** Same again in a notice block [[Install Homebrew|dev-inst-macos#using-homebrew]]. If you have {{ site.product.short_name }} [[installed via brew|dev-inst-macos#installation]], as a reference, you can check the dependencies of the brew built version using `brew deps syslog-ng`
{: .notice--info}

## External links, long and short matching, search and tokens at backtick boundaries

Fully-qualified URLs in `[text](https://...)` must not collide with internal title matching; longer matches must have preference over shorter tokens; the search index must accept identical tokens twice on one line; tokens like `time-zone()` switch behavior in/out of backticks.

Embedded markdown style [link test](https://grpc.io/docs/guides/keepalive/) from a different domain

Search test for RFC-3526 and RFC-3526. (you need to turn 'search: true' on temporally in the liquid header of this test page)

The severity of the message. `time-zone()` teszt

parser: Parse and segment structured messages

`parser: Parse and segment structured messages`

discord Sending alerts and notifications to Discord

`discord Sending alerts and notifications to Discord`

Timezones and daylight saving

`Timezones and daylight saving`

Slack destination options - destination is a known title, but the whole phrase as well, so the whole thing should be linked, not just the word destination

[[Slack destination options]]

`Slack destination options`

Slack :destination options

Slack 'destination' options

## Forced autolink and tooltip forms

All variants of the `[[...]]` and `[[title|id]]` custom markdown — including the literal-bracket-and-pipe escapes (`&#124;`, `\|`), nested `[[[[...]]]]` form, malformed cases (empty id `[[t|]]`, double pipe `[[t||]]`), and single-bracket non-matches.

destination - `destination` known title without autolink

[[destination]] - `[[destination]]` forced autolink form

[[[[destination]]]] - `[[[[destination]]]]` double nested form

[[destination id=bom|adm-about-glossary#bom]] - `[[destination id=bom|adm-about-glossary#bom]]` different title, id=bom

[[destination|adm-about-glossary#bom]] - `[[destination|adm-about-glossary#bom]]` id=bom

[[\[\[destination&#124;bom_id\]\]|adm-about-glossary#bom]] - `[[\[\[destination&#124;bom_id\]\]|adm-about-glossary#bom]]` exact example different title, id=bom

[[destination|]] - `[[destination|]]` malformed, empty id

[[destination||]] - `[[destination||]]` malformed, double pipe

[destination|] - `[destination|]` single `[`, empty id; `|` is not escaped therefore will be genereated as a table cell separator

destination| - `destination|` - `|` is not escaped therefore will be genereated as a table cell separator

[destination] - `[destination]`

## Tokens around backticks, pre-rendered HTML, and Liquid includes

A token immediately wrapped in backticks must stay an inline-code unit and not be re-tooltipped; a pre-rendered `<a class="...content-tooltip">` must not be re-wrapped recursively; the `markdown_link` Liquid include must work with all quoting variants of `id` / `title` / `withTooltip`.

`Options of the mqtt() destination`

[parser bar]

Alma [[parser]] korte

This is a direct, html link <a href="/admin-guide/200_About/002_Glossary#destination" class="nav-link content-tooltip">destination</a> - `<a href="/admin-guide/200_About/002_Glossary#destination" class="nav-link content-tooltip">destination</a>`

[[another destination|adm-about-glossary#destination]] - `[[another destination|adm-about-glossary#destination]]`

{% include markdown_link id='adm-about-glossary#destination' title='markdown_link test destination apostroph' withTooltip='yes' %}

{% include markdown_link id="adm-about-glossary#destination" title="markdown_link test destination quote" withTooltip="true" %}

{% include markdown_link id="adm-about-glossary#destination" title="markdown_link test withTooltip=\"yes\"" withTooltip="yes" %}

{% include markdown_link id="adm-about-glossary#destination" title="markdown_link test withTooltip=yes" withTooltip=yes %}

{% include markdown_link id="adm-about-glossary#destination" title="markdown_link test withTooltip=\"true\"" withTooltip="true" %}

{% include markdown_link id="adm-about-glossary#destination" title="markdown_link test withTooltip=true" withTooltip=true %}

## Excluded words and overrides

`option` / `Option` / `Options` are listed in `_data/excluded_titles.yml` so plain prose mentions must NOT be linked. The `[[Option|id]]` form must override the exclusion.

option

Options is an excluded word.

[[Option]] is excluded

[[option|adm-about-glossary#bom]] is excluded, but overidden

## Apostrophes adjacent to titles

Trailing `’s` or  `'s` after a title, curly Unicode apostrophe (`’`) inside a title must not break boundary detection.

`’` outside of a title
[[Options of the kafka() destination]]’s C implementation or Options of the kafka() destination’s C implementation.

`'` outside of a title
[[Options of the kafka() destination]]'s C implementation or Options of the kafka() destination's C implementation.

Title with `’`
[[This’s a self made tools testing page of syslog-ng documentation]] or This’s a self made tools testing page of syslog-ng documentation.

## See also direct

The syslog-ng.conf manual page

For details, see [[The syslog-ng.conf manual page]].

[[The {{ site.product.short_name }} manual page|adm-man-syslogng]]

## Liquid raw tag and escaping

A {% raw %}`{% raw %}`{% endraw %} block must preserve its contents through Jekyll's Liquid pass; using `&#37;` HTML entities is one workaround when the raw block alone is not enough; the `render_with_liquid: false` frontmatter switch is another. Both are exercised here.

Here comes a liquid {% raw %}\{&#37; include doc/admin-guide/manpages-footnote.md &#37;\}{% endraw %}
and a {% raw %}\{\{ site.product.name \}\}{% endraw %} variable raw inclusion test

One more without any escaping using the `render_with_liquid: false` frontmatter option {% raw %}{% include doc/admin-guide/manpages-footnote.md %}{% endraw %}
and a {% raw %}{{ site.product.name }}{% endraw %} variable raw inclusion test

**WARNING:** \
Showing literal Liquid tags on a page is tricky because **two** Liquid passes touch the source: \
1. Our `generate_tooltips.rb` plugin runs its own Liquid `parse`/`render` on the raw markdown — it does **not** honor the `render_with_liquid: false` frontmatter switch. \
2. Jekyll's final Liquid pass *is* skipped by `render_with_liquid: false`, but only that one. \
\
Practical rules: \
- In **body text**, wrap every literal {% raw %}`{% ... %}`{% endraw %} and {% raw %}`{{ ... }}`{% endraw %} in `&#123;% raw %&#125;…&#123;% endraw %&#125;`; backticks alone do **not** shield Liquid from step (1). The kramdown-level `\{` escape also does not help — Liquid sees the raw `\&#123;%` and still tries to tokenize it. \
- In **headings**, do **not** use literal `&#123;%` or `&#123;&#123;` at all — `generate_links.rb` runs `Liquid::Template.parse` on every heading's text via Nokogiri, which strips backtick `<code>` wrappers, so even backticked literals will break Build 1. Rephrase the heading instead (e.g. "Liquid raw tag" rather than {% raw %}`{% raw %}`{% endraw %}). \
- The `render_with_liquid: false` frontmatter is still useful: it suppresses the *final* Jekyll Liquid pass that would otherwise re-evaluate our plugin output, and is required on pages that show raw Liquid examples.
{: .notice--warning}

Further liquid site variable tests. \
When encoding is set in a source (using the encoding() option) and the
message is longer (in bytes) than log-msg-size() in UTF-8
representation, {{ site.product.short_name }} splits the message at an undefined
location (because the conversion between different encodings is not
trivial).

The following is a simple configuration file for {{ site.product.name }}  that collects incoming log messages and stores them
in a text file. {{ site.product.name }}.

## Title aliases and case-sensitivity

`${LEVEL}` and `${PRIORITY}` are aliases of `${PRIORITY}`/`SDATA` (see `_data/link_aliases.yml`); the `Fully Qualified Domain Name` series tests that title matching is case-sensitive at the per-letter level (only the canonical capitalization resolves).

Alias testing e.g ${LEVEL} or ${PRIORITY} should work like ${SDATA}

Fully Qualified Domain Name

fully qualified domain name

Fully qualified domain Name

fully Qualified domain Name

Fully qualified domain name

FQDN

F.Q.D.N.

## Render-pipeline edge cases

Cases that exercise the boundary between Liquid, kramdown and the custom tooltip injector. These are added on top of the cases above to cover scenarios that did not have a dedicated row before.

### HTML comment in body containing markdown-like content

The whole comment must stay inert — no inline-code, no autolink, no fence detection inside. Verifies that the comment alternation in `markdown_blocks_pattern` consumes its content as a single unit.

<!-- See `Options of the mqtt() destination`, [[destination]] and ```yaml inside a comment``` — none of these must be linked or fenced. Macro ${HOST} stays as-is. -->

### Code fence whose content contains an HTML comment

This is the patterndb-style case: an `xml` fence contains real `<!-- ... -->` markup. Macros inside the fence (`${DATE}`, `${PID}`) must NOT be linked. Verifies that the fence wins over the inner comment because it opens first in the source.

```xml
<patterndb>
  <!-- ${DATE} and ${PID} must remain plain text inside this fence -->
  <value name="MESSAGE">${HOST} ${PROGRAM}</value>
</patterndb>
```

### HTML comment containing a fence opener but no closer

The comment must consume the dangling triple-backtick fragment as inert text and must not leave an unpaired fence behind.

<!-- ```yaml unterminated fence inside a comment, no closer here -->

Text after the comment must render normally, with `time-zone()` still inline-code and ${HOST} still linked.

### Adjacent macros without separators

Chained macro tokens with no whitespace between them — both must be linked, the closing `}` of the first must be accepted as a left boundary for the next.

${HOST}${PROGRAM} ${HOST}.${PROGRAM} ${HOST},${PROGRAM}

### Title at start-of-line and at end-of-paragraph

A known title (`Soft macros`) appearing as the very first token of a line and as the last token before a blank line — boundary detection must use `^` / `\z` correctly.

Soft macros at the very start of this line.

This paragraph ends with the title Soft macros

### Title inside a list item and a table cell

List items and tables put titles in slightly unusual surroundings; both must still be linked and the table column alignment must remain intact.

- list item containing the title Soft macros mid-sentence
- another item with `time-zone()` as inline code

| Concept    | Example       |
|------------|---------------|
| Soft macro | ${HOST}       |
| Hard macro | ${MESSAGE}    |

### Four-backtick fence

The `markdown_blocks_pattern` supports up to four backticks to allow embedding a triple-backtick example inside an example. The whole outer fence must stay inert.

````markdown
```config
destination d_demo { http(url("http://x/${HOST}") batch-lines(100)); };
```
````

### Comment immediately followed by a fence on the next line

No blank line between them — the comment must close cleanly on its own `-->` and the fence must open fresh on the next line, both staying independently inert.

<!-- preceding comment with ${HOST} inside -->
```config
destination d_demo { http(url("http://x") batch-lines(100)); };
```

### Liquid comment tag block

A {% raw %}`{% comment %}`{% endraw %} block is stripped by Liquid before our plugin sees the content. Nothing inside is rendered, so even tokens that look like titles or macros must be invisible in the output.

{% comment %} Soft macros, [[destination]], ${HOST}, ```yaml``` and <!-- nested HTML comment --> must all disappear at the Liquid pass. {% endcomment %}

(End of Render-pipeline edge cases.)

---- Footer test ----

{% include doc/admin-guide/manpages-footnote.md %}
