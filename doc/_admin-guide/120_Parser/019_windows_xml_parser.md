---
title: Windows XML Event Log (EVTX) parser
parser: XML Event Log
id: adm-parser-evtx
description: >-
    The `windows-eventlog-xml-parser()` can parse messages in the Windows XML Event Log (EVTX) format. 
---

Available in syslog-ng 4.5 and later versions.

### Example: Windows XML Event Log parser configuration

```config
parser p_win {
    windows-eventlog-xml-parser(prefix(".winlog."));
};
```
The `windows-eventlog-xml-parser()` parser has the same parameters as the the XML parser.

Take care to include the parsers in a log statement to use them:

```config
log {
    source(s_local);
    parser(windows-eventlog-xml-parser(prefix(".winlog.")));
    destination(d_local);
};
```
