---
title: Getting the list of disk-buffer files
id: adm-log-diskbuff-list
description: >-
    This section describes getting the list of disk-buffer files used in
    syslog-ng Open Source Edition(syslog-ng OSE).
---

The syslog-ng OSE application stores information (namely, the IP:PORT or
DNS:PORT of the destinations, and the name of the disk-buffer file)
about disk-buffer files in its persist file.

## Example: command for listing the disk-buffer files in use

The following command will list the disk-buffer files in use:

```bash
/opt/syslog-ng/bin/persist-tool dump /var/lib/syslog-ng/syslog-ng.persist | awk -F '["=]' '/(qfile\(|\.queue)/ { gsub(/[ \t]+/, "", $5); gsub(/^[0-9A-Fa-f]{8}/, "", $5); "echo "$5"|xxd -r -p"|& getline QUEUE; printf("%s ==> %s\n",$1,QUEUE)}'
```

The example output will look like the following:

> afsocket_dd_qfile(stream,10.21.10.20:601)  ==> /opt/syslog-ng/var/syslog-ng-00000.rqf
  
**NOTE:** If you receive the following error message instead of the example
output, install a vim-common package on your system:
{: .notice--info}

> xxd: command not found
