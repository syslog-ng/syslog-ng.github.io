## response-action()

|  Type:|      list|
  |Default:|   N/A (see below)|

*Description:* Specifies what syslog-ng OSE does with the log message,
based on the response code received from the HTTP server. If the server
returns a status code beginning with 2 (for example, 200), syslog-ng OSE
assumes the message was successfully sent. Otherwise, the action listed
in the following table is applied. For status codes not listed in the
following table, if the status code begins with 2 (for example, 299),
syslog-ng OSE assumes the message was successfully sent. For other
status codes, syslog-ng OSE disconnects. The following actions are
possible:

- disconnect: Keep trying to resend the message indefinitely.

- drop: Drop the message without trying to resend it.

- retry: Retry sending the message for a maximum of retries() times (3
    by default).

- success: Assume the message was successfully sent.

| code | explanation                       | action     |
|------|-----------------------------------|------------|
|  100 | "Continue"                        | disconnect |
|  101 | "Switching Protocols"             | disconnect |
|  102 | "Processing"                      | retry      |
|  103 | "Early Hints"                     | retry      |
|  200 | "OK"                              | success    |
|  201 | "Created"                         | success    |
|  202 | "Accepted"                        | success    |
|  203 | "Non-Authoritative Information"   | success    |
|  204 | "No Content"                      | success    |
|  205 | "Reset Content"                   | success    |
|  206 | "Partial Content"                 | success    |
|  300 | "Multiple Choices"                | disconnect |
|  301 | "Moved Permanently"               | disconnect |
|  302 | "Found"                           | disconnect |
|  303 | "See Other"                       | disconnect |
|  304 | "Not Modified"                    | retry      |
|  307 | "Temporary Redirect"              | disconnect |
|  308 | "Permanent Redirect"              | disconnect |
|  400 | "Bad Request"                     | disconnect |
|  401 | "Unauthorized"                    | disconnect |
|  402 | "Payment Required"                | disconnect |
|  403 | "Forbidden"                       | disconnect |
|  404 | "Not Found"                       | disconnect |
|  405 | "Method Not Allowed"              | disconnect |
|  406 | "Not Acceptable"                  | disconnect |
|  407 | "Proxy Authentication Required"   | disconnect |
|  408 | "Request Timeout"                 | disconnect |
|  409 | "Conflict"                        | disconnect |
|  410 | "Gone"                            | drop       |
|  411 | "Length Required"                 | disconnect |
|  412 | "Precondition Failed"             | disconnect |
|  413 | "Payload Too Large"               | disconnect |
|  414 | "URI Too Long"                    | disconnect |
|  415 | "Unsupported Media Type"          | disconnect |
|  416 | "Range Not Satisfiable"           | drop       |
|  417 | "Expectation Failed"              | disconnect |
|  418 | "I'm a teapot"                    | disconnect |
|  421 | "Misdirected Request"             | disconnect |
|  422 | "Unprocessable Entity"            | drop       |
|  423 | "Locked"                          | disconnect |
|  424 | "Failed Dependency"               | drop       |
|  425 | "Too Early"                       | drop       |
|  426 | "Upgrade Required"                | disconnect |
|  428 | "Precondition Required"           | retry      |
|  429 | "Too Many Requests"               | disconnect |
|  431 | "Request Header Fields Too Large" | disconnect |
|  451 | "Unavailable For Legal Reasons"   | drop       |
|  500 | "Internal Server Error"           | disconnect |
|  501 | "Not Implemented"                 | disconnect |
|  502 | "Bad Gateway"                     | disconnect |
|  503 | "Service Unavailable"             | disconnect |
|  504 | "Gateway Timeout"                 | retry      |
|  505 | "HTTP Version Not Supported"      | disconnect |
|  506 | "Variant Also Negotiates"         | disconnect |
|  507 | "Insufficient Storage"            | disconnect |
|  508 | "Loop Detected"                   | drop       |
|  510 | "Not Extended"                    | disconnect |
|  511 | "Network Authentication Required" | disconnect |

To customize the action to take for a particular response code, use the
following format: response-action(\<response-code\> =\> \<action\>. To
customize multiple response code-action pairs, separate them with a
comma, for example:

```config
http(
    url("http://localhost:8080")
    response-action(418 => drop, 404 => retry)
);
```
