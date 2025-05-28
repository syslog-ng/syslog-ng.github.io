---
title: 'freebsd-audit: Collecting messages from FreeBSD audit logs'
short_title: freebsd-audit
id: adm-src-freebsd-audit
description: >-
    Using this source, one can collect FreeBSD audit logs. For current limitations and more details, please see the FreeBSD audit source for syslog-ng blog entry.
---

## Declaration

```config
freebsd-audit(options);
```

## Example: Using the freebsd-audit() driver

This invokes the freebsd-audit() source without any additional parameters, resulting in XML-formatted output. The incoming messages are parsed using the XML parser and saved to a JSON-formatted file.

```config
source s_fbaudit_xml {
    freebsd-audit()
};

parser p_xml {
  xml(prefix("fbaudit."));
};

destination d_fbaudit_json {
  file("/var/log/fbaudit.json" template("$(format-flat-json
  --leave-initial-dot --scope rfc5424 --scope dot-nv-pairs
        --scope nv-pairs)\n\n"));
};

log {
  source(s_fbaudit_xml);
  parser(p_xml);
  destination(d_fbaudit_json);
};
```

By checking its output, you can see the name-value pairs parsed from the XML.

```shell
tail -6 /var/log/fbaudit.json

{"fbaudit.record.text":"\"successful login root\"","fbaudit.record.subject._uidit-uid":"root","fbaudit.record.subject._tiddt-uid":"57418172.16.167.1","fbaudit.record.subject._siddt-uid":"1321","fbaudit.record.subject._ruidt-uid":"root","fbaudit.record.subject._rgidt-uid":"wheel","fbaudit.record.subject._piddt-uid":"1321","fbaudit.record.subject._gidit-uid":"wheel","fbaudit.record.subject._audit-uid":"root","fbaudit.record.return._retval":"0","fbaudit.record.return._errval":"success","fbaudit.record._version":"11","fbaudit.record._timefier":"\"Fri Sep 27 12:34:25 2024\"","fbaudit.record._msecfier":"\" + 830 msec\"","fbaudit.record._modifier":"0","fbaudit.record._eventon":"\"OpenSSH login\"","TRANSPORT":"local+program","SOURCE":"s_fbaudit_xml","PRIORITY":"notice","MSGFORMAT":"raw","MESSAGE":"<record version=\"11\" event=\"OpenSSH login\" modifier=\"0\" time=\"Fri Sep 27 12:34:25 2024\" msec=\" + 830 msec\" ><subject audit-uid=\"root\" uid=\"root\" gid=\"wheel\" ruid=\"root\" rgid=\"wheel\" pid=\"1321\" sid=\"1321\" tid=\"57418172.16.167.1\" /><text>successful login root</text><return errval=\"success\" retval=\"0\" /></record>","HOST_FROM":"fb14","HOST":"fb14","FACILITY":"user","DATE":"Sep 27 15:02:37"}
```
