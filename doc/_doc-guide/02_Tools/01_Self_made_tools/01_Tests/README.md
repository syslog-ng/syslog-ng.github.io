---
title: "This's a self made tools testing page of {{ site.title }}"
# short_title can be turned off for in-title liquid testing in the nav bar, uncomment if needed
short_title: "Self made tools testing page"
id: doc-testing-page
subtitle: >-
    Description\subtitle is now not different than the normal, documentation body markdown texts.<br>
    It can contain ', and other special characters ()[].*?+^$, etc., though some of them might require escaping, e.g. \\ or \|<br>
    Mentioning documentation sections (markdown ##, or HTML <h 1-6> headings) via the exact section title text should work normally, like
    Slack destination options, but the linking can be forced as well via our custom markdown [[[[Timezones and daylight saving]]]] format.<br>
    Linking also could work with our {% include markdown_link id='doc-own-tools' title='markdown_link liquid include' withTooltip=true %}.<br>
    One more [[destination|adm-about-glossary#bom]] id=adm-about-glossary#bom override test from subtutle.<br>
    Macros test ${HOST}. Liquid test {{ site.title }}.
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

**INFO:** \{: .notice--info\} Test \
any modifications or changes, use the **flags(no-parse)** option in the
source definition, and a template containing only the **${MESSAGE}**
macro in the destination definition.
{: .notice--info}

To parse non-syslog messages, for example, JSON, CSV, or other messages,
you can use the built-in parsers of {{ site.product.short_name }}. For details, see
[[parser: Parse and segment structured messages]].

`multi line backticked
text`

Markdown link tests

1st [a source title](url1){: }

2nd [a source title](url2)

3rd a correct reference link declaration - \[a source url_ref\]: url3 - (hopefully totally invisible)

[a source url_ref]: url3

4rd a reference link declaration with a missing space after : - \[b source url_ref\]:url4 - (hopefully totally invisible)

[b source url_ref]:url4

5th [a source title][a source url_ref] using reference link 1

6th [a source title]    [a source url_ref] using reference link 1 with more than 1 space between the \[\]\[\] parts

7th [b source title][b source url_ref] using reference link 2

8th [source title]{ url }

9th [a source]{: class="" }

10th [a source title]{: class="" }

11th an unknown notice block declaration (hopefully invisible too)
{: source }

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

## Tests of custom markdown in header [[source]] and [[with id|doc-jekyll-extensions#titleid-markdown-extension]]

Introduction to {{ site.product.short_name }} is a test for pages without description/subtitle, but text part between the title and the first heading which can have tooltips too this way.

Developer guide is a double (page title amd section heading) example with a description/subtitle.

[[Installing syslog-ng|adm-install]] is a forced, (also a doubled) page link title example with a description/subtitle.

This one is a [[Self page link|doc-testing-page]] test with ID, this one with the title only - This's a self made tools testing page of {{ site.title }}, and a last one with direkt liquid usage - This's a self made tools testing page of {{ site.title }}.

Test of forced link with anchored ID part [[Install Homebrew|dev-inst-macos#using-homebrew]].

1. Same test like above in an enumeration [[Install Homebrew|dev-inst-macos#using-homebrew]].

**Hint:** Same again in a notice block [[Install Homebrew|dev-inst-macos#using-homebrew]]. If you have {{ site.product.short_name }} [[installed via brew|dev-inst-macos#installation]], as a reference, you can check the dependencies of the brew built version using `brew deps syslog-ng`
{: .notice--info}

Embedded markdown style [link test](https://grpc.io/docs/guides/keepalive/) from a different domain

Search test for RFC-3526 and RFC-3526. (you need to turn 'search: true' on temporally in the liquid header of this test page)

The severity of the message. `time-zone()` teszt

parser: Parse and segment structured messages

`parser: Parse and segment structured messages`

discord Sending alerts and notifications to Discord

`discord Sending alerts and notifications to Discord`

Timezones and daylight saving

`Timezones and daylight saving`

Slack destination options

[[Slack destination options]]

`Slack destination options`

Slack :destination options

Slack 'destination' options

[[[[destination]]]]

[[destination]] forced

[[destination id=bom|adm-about-glossary#bom]] different title, id=bom

[[destination|adm-about-glossary#bom]] id=bom

[[\[\[destination&#124;bom_id\]\]|adm-about-glossary#bom]] exact example different title, id=bom

[[destination|]] - \[\[destination\|\]\]

[[destination||]] - \[\[destination\|\|\]\]

[destination|] - \[destination\|\]

destination| - destination\|

[destination] - \[destination\]

`Options of the mqtt() destination`

[Parse bar]

Alma [[parser]] korte

This is a direct, html link <a href="/admin-guide/200_About/002_Glossary#destination" class="nav-link content-tooltip">destination</a> test

[[another destination|adm-about-glossary#destination]] test

{% include markdown_link id='adm-about-glossary#destination' title='markdown_link test destination apostroph' withTooltip='yes' %}

{% include markdown_link id="adm-about-glossary#destination" title="markdown_link test destination quote" withTooltip="true" %}

{% include markdown_link id="adm-about-glossary#destination" title="markdown_link test withTooltip=\"yes\"" withTooltip="yes" %}

{% include markdown_link id="adm-about-glossary#destination" title="markdown_link test withTooltip=yes" withTooltip=yes %}

{% include markdown_link id="adm-about-glossary#destination" title="markdown_link test withTooltip=\"true\"" withTooltip="true" %}

{% include markdown_link id="adm-about-glossary#destination" title="markdown_link test withTooltip=true" withTooltip=true %}

option

Options is an excluded word.

[[Option]] is excluded

[[option|adm-about-glossary#bom]] is excluded, but overidden

For more information, see
[[Options of the kafka() destination's C implementation]] or
Options of the kafka() destination's C implementation.

For details, see [[The syslog-ng.conf manual page]].

## See also direct

The syslog-ng.conf manual page

[[The {{ site.product.short_name }} manual page|adm-man-syslogng]]

Here comes a liquid {% raw %}\{&#37; include doc/admin-guide/manpages-footnote.md &#37;\}{% endraw %}
and a {% raw %}\{\{ site.product.name \}\}{% endraw %} variable raw inclusion test

One more without any escaping using the `render_with_liquid: false` frontmatter option {% raw %}{% include doc/admin-guide/manpages-footnote.md %}{% endraw %}
and a {% raw %}{{ site.product.name }}{% endraw %} variable raw inclusion test

**WARNING:** \
Take care, this might require a special notation even if \{&#37; raw &#37;\} and \{&#37; endraw &#37;\} block should protect alone these blocks, but it does not exactly !!! \
See the source-code of this page how to escape it correctly (otherwise the page custom rendering might break!!!) \
We found that using the `render_with_liquid: false` frontmatter option helps best, though it is not clearly documented, and its name suggests it will supress liquid rendering entirely, but (luckily ?) with our custom rendering it supresses only the final liquid render pass (that can fully eliminate our self-rendered content otherwise)
{: .notice--warning}

{% include doc/admin-guide/manpages-footnote.md %}

Further liquid site variable tests. \
When encoding is set in a source (using the encoding() option) and the
message is longer (in bytes) than log-msg-size() in UTF-8
representation, {{ site.product.short_name }} splits the message at an undefined
location (because the conversion between different encodings is not
trivial).

The following is a simple configuration file for {{ site.product.name }}  that collects incoming log messages and stores them
in a text file. {{ site.product.name }}.

Aliast testing e.g ${LEVEL} or ${PRIORITY} should work like ${SDATA}

Alias testing e.g ${LEVEL} or ${PRIORITY} should work like ${SDATA}

Fully Qualified Domain Name

fully qualified domain name

Fully qualified domain Name

fully Qualified domain Name

Fully qualified domain name

FQDN

F.Q.D.N.
