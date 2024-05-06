---
title: "What's new in the syslog-ng pattern database format V5"
id: adm-parser-db-whatsnew
---

The V5 database format has the following differences compared to the V4
format:

- The \<ruleset\> element can now store multiple reference URLs using
    the new \<rule\_urls\> element. For details, see
    [[Element: ruleset]].
- In an \<action\>, you can now initialize a new context. As a result,
    the \<message\> element is not required. For details, see
    [[Element: create-context]].
- The inherit-properties attribute is deprecated, use the
    **inherit-mode** attribute instead. For details, see
    [[Element: action]].
