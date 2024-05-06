---
title: http
description: >-
  The http module has only one driver, which is the http() destination driver.
  The http() driver sends messages to web services using HTTP protocol.
id: dev-macos-mod-sup-http
---

### Important Information

* Error and status messages received from the HTTP server are forwarded to the internal logs of syslog-ng.
* Only HTTP connections are supported, HTTPS is not.
* This implementation does not require Java.
* Only the PUT and the POST methods are supported. For more methods, Java is required which will be covered in the Java driver post.

### Status

| Architecture | Status |
| :----------: | :----: |
|      x86     |  Works |
|      ARM     |  Works |

### Testing

To test the HTTP destination driver, we need to be able to send the data to a host that can accept the PUT/POST methods and display confirmation of the same. A dummy server python script is shown below to achieve the same. \
To test this, we will send a PUT/POST request from our syslog-ng to the dummy server we set up and look for the output of the server.&#x20;

#### Server code ( python3 )&#x20;

```python
from http.server import HTTPServer, BaseHTTPRequestHandler

class S(BaseHTTPRequestHandler):
    def _set_headers(self):
        self.send_response(200)
        self.send_header("Content-type", "text/html")
        self.end_headers()

    def do_POST(self):
        content_length = int(self.headers['Content-Length']) # <--- Gets the size of data
        post_data = self.rfile.read(content_length) # <--- Gets the data itself
        print(post_data)
        self._set_headers()

def run(server_class=HTTPServer, handler_class=S, addr="localhost", port=8000):
    server_address = (addr, port)
    httpd = server_class(server_address, handler_class)
    print(f"Starting httpd server on {addr}:{port}")
    httpd.serve_forever()

run()
```

#### Configuration file used

```python
@version: 3.31
@include "scl.conf"

options {
    stats-freq(10);
    time-reopen(10);
};

source custom
{
    example-msg-generator(
        num(20)
        freq(5)
        template("HTTP Message")
    );
};

destination d_http {
    http(
        url("http://127.0.0.1:8000/post")
        method("POST")
        user-agent("syslog-ng User Agent")
        user("user")
        password("password")
        headers("HEADER1: header1", "HEADER2: header2")
        body("${ISODATE} ${MESSAGE}")
    );
};

log {
    source(custom);
    destination(d_http);
};
```

### Proof

![http() destination driver tested on macOS (x86)](<{{dev_img_folder}}/module-support/Screenshot 2021-06-27 at 10.05.23 PM.png>)

![http() destination driver tested on macOS (ARM)](<{{dev_img_folder}}/module-support/Screenshot 2021-08-21 at 6.52.45 PM.png>)
