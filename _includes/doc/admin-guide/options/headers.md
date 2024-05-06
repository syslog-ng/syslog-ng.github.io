## headers()

|  Type:|      string list|
  |Default:|   |

*Description:* Custom HTTP headers to include in the request, for
example, headers(\"HEADER1: header1\", \"HEADER2: header2\"). If not
set, only the default headers are included, but no custom headers.

The following headers are included by default:

- X-Syslog-Host: \<host\>

- X-Syslog-Program: \<program\>

- X-Syslog-Facility: \<facility\>

- X-Syslog-Level: \<loglevel/priority\>
