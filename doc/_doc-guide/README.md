---
title: Documentation Guide
description: Here you can find information about how we organize, maintain and create the documentation of syslog-ng.
id: doc-guide
# Mandatory on pages with raw Liquid examples or self-rendered content. Details: doc/_doc-guide/02_Tools/02_Jekyll_extensions.md
render_with_liquid: false
---

## How to contribute to the documentation

 1. If you do not already have a GitHub account, create one.
 2. [[Fork the repository on GitHub|gh-syslog-ng-doc]] (preferably, from the master branch)
 3. Create a branch that will store your contribution, for example, `git checkout -b my-typo-fixes`
 4. Find the part of the source that you want to modify. The easiest thing is to search for a specific text using grep, regexxer, or a similar tool.
 5. If you modify a file in the `_includes/doc/` directory, it is probably included to multiple parts of the documentation. Make sure that your changes make sense in each context.
 6. Modify the files as you need (following our markup conventions). For example, you can add new examples, correct typos, and so on.
 7. Validate the files to make sure that the `markdown` is well-formed.
 8. Commit and sign off your changes. Use a clear, descriptive commit subject (Conventional Commits style is welcome but not mandatory).
 9. Push your changes, for example, `git push origin my-typo-fixes`
 10. Submit a pull request.
 11. Sign the {{ site.product.name }} Documentation Contributor License Agreement when prompted.
 12. We will review your contribution and if accepted, integrate to the master branch of the documentation and publish it.

## Basic rules, conventions we try to follow

The full set of conventions, build details, and infrastructure notes lives in the agent instruction files of the repository, and -- in human-readable form with further examples -- in the Jekyll extensions, plug-ins, and Self made helper tools pages.\
The points below are the day-to-day essentials for human contributors.

### Page metadata (frontmatter)

Every page begins with YAML frontmatter:

```yaml
---
title: Page Title            # globally unique
short_title: Short Nav Title # optional, falls back to title
id: unique-kebab-id          # globally unique, used for cross-references
description: >-
    Brief description here.
---
```

- **Never change an existing `id`.** Cross-references across the entire site break silently.
- `title` and `id` must be globally unique.
- Use `short_title` only when the full `title` is too long for the navigation sidebar.

### File and folder layout

- The documentation is organized into three guides under `doc/`:
  - `_admin-guide/` — sysadmin-facing reference, numeric-prefixed folders (`010_…`, `070_…`).
  - `_dev-guide/` — contributor-facing, `chapter_N/` folders.
  - `_doc-guide/` — meta-documentation about the site itself.
- Folder and file prefixes (`010_`, `001_`) determine the navigation order.
- A folder's `README.md` becomes the section landing page and the nav label (via the `title` / `short_title` frontmatter fields).
- After adding, renaming, or removing folders or `README.md` files, regenerate the navigation:

  ```shell
  ./_tools/navgen ./doc ./_data/navigation.yml
  ```

- Never hand-edit `_data/navigation.yml` or any file under `_data/links/` — both are auto-generated.

### Product name and version — always use Liquid variables

```liquid
{% raw %}{{ site.product.name }}      {% endraw %} → "syslog-ng Open Source Edition"
{% raw %}{{ site.product.short_name }}{% endraw %} → "syslog-ng OSE"
{% raw %}{{ site.product.version }}   {% endraw %} → current version (for example, "{{ site.product.version }}")
```

Never hard-code product names or version numbers — the version is bumped automatically during release builds.

### Pages that show raw Liquid examples — `render_with_liquid: false` is mandatory

Pages that include `{% raw %}…{% endraw %}` blocks (i.e. documentation of Liquid itself or any literal Liquid syntax), or that rely on our custom self-rendering (description injection, `[[title|id]]` wikilink resolution, etc.), **must** set `render_with_liquid: false` in their frontmatter:

```yaml
---
title: …
id: …
render_with_liquid: false
---
```

Without this flag, Jekyll's final Liquid pass re-runs over our plugin-rendered content and:

- drops the description marker, leaving `<---description_start--->` visible verbatim in the body (instead of being wrapped into the styled `<p id="page-description">` element)
- re-expands `{% raw %}` blocks, so both the protective markers and the literal example they were protecting (for instance a literal `{{ site.product.name }}` snippet meant to be shown as source) silently disappear from the rendered page
- leaves `[[title|id]]` wikilinks unresolved -- kramdown then turns the surrounding paragraph into a single-row table because of the `|`

The build emits a `[render_with_liquid check] WARNING:` line on STDOUT for any page that matches this pattern but lacks the flag.

### Reusable content via includes

Shared option descriptions, warnings, notes, and examples live under `_includes/doc/admin-guide/` and are pulled in with Liquid:

```liquid
{% raw %}{% include doc/admin-guide/options/batch-lines.md %}
{% include doc/admin-guide/warnings/tcp-warning.md %}{% endraw %}
```

When editing an include, remember that it appears on multiple pages — make sure the wording works in every context.

### Code blocks — pick the right language tag

| Tag        | Use for                                                            |
|------------|--------------------------------------------------------------------|
| `config`   | {{ site.product.short_name }} configuration snippets (`source`, `destination`, `filter`, templates, etc.) |
| `shell`    | Shell commands (`./configure`, `systemctl`, `openssl`, `syslog-ng-ctl`, …) |
| `log`      | Sample log lines, internal output, stack traces, `syslog-ng-ctl` dumps -- anything verbatim. Renders as a soft light-gray box with a left accent bar and italic, non-monospace text. |
| `markdown` | Raw Markdown source shown for documentation purposes (e.g. in [[Jekyll extensions, plug-ins\|doc-jekyll-extensions]]). |
| `liquid`   | Raw Liquid source shown for documentation purposes (include invocations, template snippets). Combine with `{% raw %}…{% endraw %}` and `` so the page does not execute the example. |

Inside `log` fenced code blocks, do **not** backslash-escape `<`, `>`, `[`, `]` — the fence is inert, escapes render literally. Do not use the legacy `> log line` blockquote form for new log/output samples.

### Tables — strict spacing

Exactly one space after the opening pipe and one before the closing pipe. All rows in a table must have the same number of columns, and columns are kept vertically aligned for readability:

```markdown
| Type:    | string  |
| Default: | `value` |
```

### Option value formatting

- Specific keywords or literal values get backticks: `` `yes` ``, `` `no` ``, `` `gzip` ``.
- Generic type descriptions do not: `string`, `number`, `filename`.
- Mixed: `` `string` or `template` ``.

### Notice blocks

The five typed variants (`primary`, `info`, `warning`, `danger`, `success`) get their icon and bold label injected automatically by CSS. **Never** write the icon image or the `**LABEL:**` prefix manually — only the body text and the marker:

```markdown
Important information.
{: .notice--info}
```

For notices that must wrap lists, fenced code blocks, or multiple paragraphs, use the paired-marker form expanded by `_plugins/expand_notice_blocks.rb`:

```markdown
{: .notice--warning-start}
1. first item
2. second item
{: .notice--warning-end}
```

For the full reference (typed variants, the `.no-prefix` opt-out, strict pairing rules, list-first behavior), see [[Jekyll extensions, plug-ins|doc-jekyll-extensions]].

### Cross-references

Three mechanisms exist for internal links; all of them are documented in full in [[Jekyll extensions, plug-ins|doc-jekyll-extensions]] (and the surrounding tooling -- `navgen`, `linkcheck`, `pack`, `mangen`, the `serve` wrapper, and so on -- is described in [[Self-made tools|doc-own-tools]]):

- **Fully automatic** -- `_plugins/generate_tooltips.rb` scans the plain-text portions of every page and turns any phrase that matches a known page title, heading, named anchor, or alias into an auto-link with a tooltip preview. No markup is required in the source -- just write the title text naturally and it becomes a link. Use `${PROJECT_ROOT}/_data/excluded_titles.yml` to opt a phrase out, or `${PROJECT_ROOT}/_data/link_aliases.yml` to add extra trigger phrases.
- The `[[title|id]]` markdown extension (also handled by `_plugins/generate_tooltips.rb`) -- use it when you need to disambiguate, force a different target, or override the displayed text. The `[[title|-]]` form temporarily disables auto-linking for a single occurrence.
- The `markdown_link` Liquid include (`{% include markdown_link id='…' %}`, with optional `withTooltip=true`, `newPage=true`, `outOfFrame=true`) -- use it when you need to override the title or control the link's navigation behaviour.

For more background on the rendering pipeline (Liquid passes, the `JEKYLL_BUILD_LINKS` / `JEKYLL_BUILD_TOOLTIPS` two-pass build, `_data/links/`, the `expand_notice_blocks` plugin, etc.) see [[Jekyll extensions, plug-ins|doc-jekyll-extensions]]; for the build-time helpers under `_tools/` see [[Self made helper tools|doc-own-tools]].

### Linting and local validation

- Markdown is checked with `markdownlint-cli2`:

    ```shell
    npx markdownlint-cli2 "doc/**/*.md" "_includes/**/*.md"
    ```

- Local single-pass builds may show broken cross-references or tooltips — that is expected. The production site is built in two passes (`JEKYLL_BUILD_LINKS=yes` followed by `JEKYLL_BUILD_TOOLTIPS=yes`), and both passes run automatically in CI.