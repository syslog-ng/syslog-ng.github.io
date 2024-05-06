---
title: macOS module support status
description: This testing effort was part of a Google Summer Of Code project, the details of which will be outlined here.
id: dev-macos-mod-sup-status
---

### Acknowledgement

The [[original testing|soc-macos-module-testing]] was made by Yash Mathne, and we would like to say a huge thank you for the great, detailed work.

### Testing Methodology

Only the building and the corresponding unit tests are guaranteed on x86 macOS. This is a documentation of the tests done on the various sub-components of syslog-ng on both the architectures.

Syslog-ng is composed of various modules, each with its own set of plugins. Plugins are primarily one of the following types:

* Source Drivers
* Destination Drivers
* Template Functions
* Rewrite Functions
* Parsers

Most of the template functions and rewrite functions are simple text manipulation functions without any external dependencies and are theoretically expected to work without a hunch. However, some of them do have external dependencies (e.g.: python template-function) and thus need to be tested.

### Testing results

Table of the testing status of the various modules.

 |                         Module                              | Plugins |    Intel    | Apple Silicon |
 | :---------------------------------------------------------: | :-----: | :---------: | :-----------: |
 |             [[affile|dev-macos-mod-sup-affile]]             |    6    |    Tested   |     Tested    |
 |          [[afmongodb|dev-macos-mod-sup-afmongodb]]          |    1    |    Tested   |     Tested    |
 |             [[afprog|dev-macos-mod-sup-afprog]]             |    2    |    Tested   |     Tested    |
 |             [[afsmtp|dev-macos-mod-sup-afsmtp]]             |    1    | Tested \[F] |  Tested \[F]  |
 |           [[afsocket|dev-macos-mod-sup-afsocket]]           |    17   |    Tested   |     Tested    |
 |              [[afsql|dev-macos-mod-sup-afsql]]              |    1    | Tested \[F] |  Tested \[F]  |
 |             [[afuser|dev-macos-mod-sup-afuser]]             |    1    |    Tested   |     Tested    |
 | [[elasticsearch-http|dev-macos-mod-sup-elasticsearch-http]] |    1    |    Tested   |     Tested    |
 |               [[http|dev-macos-mod-sup-http]]               |    1    |    Tested   |     Tested    |
 |         [[mod-python|dev-macos-mod-sup-python]]             |    7    |    Tested   |     Tested    |
 |         [[pseudofile|dev-macos-mod-sup-pseudofile]]         |    1    |    Tested   |     Tested    |
 |              [[redis|dev-macos-mod-sup-redis]]              |    1    |    Tested   |     Tested    |
 |            [[riemann|dev-macos-mod-sup-riemann]]            |    1    |    Tested   |     Tested    |
 |      [[system-source|dev-macos-mod-sup-syslog]]             |    1    | Tested \[F] |  Tested \[F]  |
