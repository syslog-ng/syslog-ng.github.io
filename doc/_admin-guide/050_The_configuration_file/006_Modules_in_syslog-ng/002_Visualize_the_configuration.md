---
title: Visualize the configuration
id: adm-mod-vis
description: >-
    Starting with syslog-ng OSE 3.25, you can visualize the configuration of
    a running syslog-ng OSE instance using the syslog-ng-ctl
    --export-config-graph command. The command walks through the effective
    configuration, and exports it as a graph into a JSON structure.
---

The resulting JSON file can be converted into [DOT file format](https://
en.wikipedia.org/wiki/DOT_(graph_description_language)) that visualization
tools (for example, Graphviz) can use. The package
includes a Python script to convert the exported JSON file into DOT
format:
`<syslog-ng-installation-directory>/contrib/scripts/config-graph-json-to-dot.py`

You can convert the DOT file into PNG or PDF format using external tools.
