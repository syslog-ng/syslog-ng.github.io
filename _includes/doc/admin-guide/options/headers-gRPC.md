## headers()

|  Type: |      arrow list|
|Default:|           empty|

Available in syslog-ng OSE 4.8 and later versions.

*Description:* Adds custom gRPC headers to each RPC call. Currently only static header names and values are supported.

```config
headers(
    "organization" => "org-name"
    "stream-name" => "org-stream"
  )
```

> *Copyright © 2024 Axoflow*
