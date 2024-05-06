---
title: riemann
description: >-
  The riemann module has only one driver, which is the riemann() destination
  driver. The riemann() driver sends your data (for example, metrics or events)
  to a Riemann monitoring system.
id: dev-macos-mod-sup-riemann
---

## Status <a href="#status" id="status"></a>

| x86 | Works |
| :-: | :---: |
| ARM | Works |

### Testing <a href="#testing" id="testing"></a>

**Riemann Setup**

To test this driver, we need to set up Riemann first. You can use Homebrew to brew install all the necessary dependencies.

To be able to successfully test this driver, we need to install riemann and riemann-client. To install all these, we need to do the following:

`$ brew install riemann` \
`$ brew install riemann-client`

To run riemann in the foreground, use: \
\
`$ riemann`

However, you might run into the issue of not having a config file present depending on your mode of installation. We can make our own config file for the same.&#x20;

```config
; -*- mode: clojure; -*-
; vim: filetype=clojure

(logging/init {:file "riemann.log"})

; Listen on the local interface over TCP (5555), UDP (5555), and websockets
; (5556)
(let [host "127.0.0.1"]
  (tcp-server {:host host})
  (udp-server {:host host})
  (ws-server  {:host host}))

; Expire old events from the index every 5 seconds.
(periodically-expire 5)

(let [index (index)]
  ; Inbound events will be passed to these streams:
  (streams
    (default :ttl 60
      ; Index all events immediately.
      index

      ; Log expired events.
      (expired
        (fn [event] (info "expired" event))))))

; Default Config File Till Now

(streams
  (where (description "syslog-ng riemann test")
    #(info %)))
```

Where, the last added statement allows us to print incoming messages that have the matching description.&#x20;

### Configuration File Used <a href="#configuration-file-used" id="configuration-file-used"></a>

```config
@version: 3.33
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
        template("Message to Riemann")
    );
};

destination d_riemann {
  riemann(
    # Explicitly specify the localhost.
    server("127.0.0.1")
    port(5555)
    ttl("300.5")
    metric(int("$SEQNUM"))
    description("syslog-ng riemann test")
    state("ok")
    attributes(
      x-ultimate-answer("$(+ $PID 42)")
      key("MESSAGE", rekey(add-prefix("x-")))
    )
  );
};

log {
    source(custom);
    destination(d_riemann);
};
```

### Proof

![Riemann driver tested on macOS (x86)](<{{dev_img_folder}}/module-support/Screenshot 2021-07-31 at 9.45.07 PM.png>)

![Riemann driver tested on macOS (ARM)](<{{dev_img_folder}}/module-support/Screenshot 2021-07-31 at 9.53.58 PM.png>)
