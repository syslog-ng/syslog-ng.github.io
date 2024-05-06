---
title: Storage Structure
id: doc-struct
---

## Structure of this repository

Basically we follow [[jekyll|jekyll-dir-struct]] and [[minimal-mistake|mm-dir-struct]] our documentation sites are based on.

```shell
.
├── _data
│   ├── links
│   navigation.yml
│   excluded_titles.yml
│   external_links.yml
│
├── _js
│   ├── custom
│   ├── plugins
│   ├── vendor
│   _main.js
│
├── _includes
│   ├── footer
│   ├── head
│   ...
│   └── search
│
├── _layouts
├── _sass
│   └── minimal-mistakes
├── _site
├── _tools
├── assets
│   ├── css
│   ├── images
│   └── js
├── doc
│   ├── _admin-guide
│   ├── _dev-guide
│   └── _doc-guide
│
_config.yml
Gemfile
LICENSE.midnight
LICENSE.minimal-mistakes
README.md
```

### Directories

- _data
  - links \
    <u>DO NOT USE!!!</u> \
    It lives only during jekyll serving _site data, excluded from git via `.gitignore` \
    It is built based the content of the `doc` folder

- _includes \

- _js \
  - custom \
    To stay organized, please keep our custom scripts in this folder.

- _layouts \

- _sass \

- _site \

- _tools \

- assets \
  - css
  - images
  - js \
    <u>DO NOT USE!!!</u> \
    It lives only during jekyll serving _site data, excluded from git via `.gitignore` \
    It is built from the content of the `_js` folder

- doc \

### Files

- _config.yml \
    [[Jekyll configuration|jekyll-config]] file
- Gemfile \
    Jekyll and minimal-mistake [[Ruby gem|jekyll-ruby-gems]] dependencies
- README.md \
    The project [[GitHub repository|gh-syslog-ng-doc]] landing page readme file
- LICENSE.* \
    All the licence files of the modules the project uses
