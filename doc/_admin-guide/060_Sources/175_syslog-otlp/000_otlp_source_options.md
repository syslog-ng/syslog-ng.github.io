---
title: syslog-ng-otlp() source options
id: adm-src-otlp-opt
---

The following options are available for the `syslog-ng-otlp()` source.

## auth()

The `auth()` option can be used to set the authentication of the driver. The default state of this option is `insecure`, as it is not defined.

The following sub-options are available for `auth()`.

### adc()

This option is an authentication method that is only available for destinations. For more information, see Application Default Credentials.

### alts()

This option is an accessible authentication available for Google infrastructures. Service accounts can be listed with the nested `target-service-account()` option, to match these against the server.

#### Example: configure an syslog-ng-otlp() source using auth(alts())

```config
source {
    syslog-ng-otlp(
      port(4317)
      auth(alts())
    );
  };

```

### insecure()

This option can be used to disable authentication: `auth(insecure())`.

### tls()

The `tls()` option accepts the following nested sub-options.
* ca-file()
* key-file()
* cert-file()
* peer-verify()
  * required-trusted
  * required-untrusted
  * optional-trusted
  * optional-untrusted

#### Example: configure an syslog-ng-otlp() source using auth(tls())

```config
destination {
    syslog-ng-otlp(
      url("your-otel-server:12346")
      auth(
        tls(
          ca-file("/path/to/ca.pem")
          key-file("/path/to/key.pem")
          cert-file("/path/to/cert.pem")
        )
      )
    );
  };
```

## chain-hostname()

|   Type:|       `yes`, `no`|
|Default:|              `no`|

*Description:* This option can be used to enable or disable the chained hostname format. For more information, see the chain-hostnames() global option.

{% include doc/admin-guide/options/channel-args.md %}

## concurrent-requests()

|   Type:|       integer|
|Default:|             2|

*Description:* This option configures the upper limit of in-flight gRPC requests per worker. It is advisd to set this value in the range of 10s or 100s when there are a high number of clients sending simultaneously. In an optimzed solution, the number of `workers()` and `concurrent-requests()` is greater than or equal to the number of clients. However, this can cause an increase in memory usage.

## default-facility()

|   Type:|       facility string|
|Default:|                  kern|

*Description:* This option assigns a facility value to messages received from the file source if the message does not specify one.

## default-level()

|   Type:|       string|
|Default:|       notice|

*Description:* This option defines the default level value if the `PRIORITY` entry does not exist.

## default-priority()

|   Type:|       priority string|
|Default:|                      |

*Description:* This option assigns an emergency level to messages received from the file source if the message does not specify one, for example, `default-priority(warning)`.

## dns-cache()

|   Type:|       `yes`, `no`|
|Default:|              `no`|

*Description:* This option enables or disables the DNS cache usage.

## ebpf()

Available in syslog-ng OSE 4.2 and later versions.

If this option is not used, the kernel chooses the receive socket for a specific UDP randomly based on the source IP/port of the sender. It is possible to customize this algorithm using the Extended Berkeley Packet Filter (eBPF) plugin. The `ebpf()` option changes the `SO_REUSEPORT` algorithm of the kernel, to place messages randomly into one of the UDP sockets. The decision which UDP socket buffer a datagram is placed is made for every datagram, and not once for every stream. This results in the percet load-balancing of messages across the set of UDP sockets. While this resolves the imbalance between the sockets and results in perfect load balancing, the order of messages from the same sender is lost, which is the drawback of increased throughput.

## flags()

|   Type:|       `assume-utf8`, `empty-lines`, `expect-hostname`, `kernel`, `no-hostname`, `no-multi-line`, `no-parse`, `sanitize-utf8`, `store-legacy-msghdr`, `store-raw-message`, `syslog-protocol`, `validate-utf8`|
|Default:|              empty set|

*Description:* This option specifies the log parsing option of the source. The following flags are available:
* `assume-utf8`: This flag expects UTF-8 encoded incoming messages, but does not verify the encoding. If the UTF-8 encoding of the incoming message must be validated, use the `validate-utf8` flag.
* `empty-lines`: Use the empty-lines flag to keep the empty lines of the messages. Otherwise, these lines are automatically removed.
* `expect-hostname`: When this flag is used syslog-ng OSE expects a log message that contains a hostname and parses the message accordingly. This is the default behavior for TCP sources. Note that pipe sources use the `no-hostname` flag by default.
* `guess-timezone`: This flag allows the source to attempt to guess the timezone of the message if this information is not available in the message. Works when the incoming message stream is close to real time, and the timezone information is missing from the timestamp.
* `kernel`: This flag sets the source default to the `LOG_KERN | LOG_NOTICE` priority if not specified otherwise.
* `no-header`: This flag triggers syslog-ng OSE to parse only the PRI field of incoming messages, and put the rest of the message contents into `$MSG`.
The functionality of `no-header` is similar to the `no-parse` flag, but the `no-header` flag does not skip the `PRI` field. The `no-header` flag signals syslog-ng OSE that the syslog header is not present (or does not adhere to the conventions / RFCs), so the entire message (except from the PRI field) is put into `$MSG`.
```config
    parser p_syslog {
      syslog-parser(
        flags(no-header)
      );
    };
```

* `no-hostname`: Enable this flag if the log message does not include the hostname of the sender host. This results in syslog-ng OSE assuming that the first part of the message header is `${PROGRAM}` instead of `${HOST}`.
```config
    source s_dell {
        network(
            port(2000)
            flags(no-hostname)
        );
    };
```

* `no-multi-line`: This flag disables line-breaking in the messages and converts the entire message into a single line. Note that this happens only if the underlying transport method supports multi-line messages. Currently only the `file()` and `pipe()` drivers support multi-line messages.
* `no-parse`: By default, syslog-ng OSE parses incoming messages as syslog messages. The `no-parse` flag disables syslog message parsing and processes the complete line as the message part of a syslog message. The syslog-ng OSE application generates a new syslog header (timestamp, host, and so on) automatically and puts the entire incoming message into the `MESSAGE` part of the syslog message (available using the `${MESSAGE}` macro). This flag is useful for parsing messages that do not complying to the syslog format.
* `dont-store-legacy-msghdr`: During default operation, syslog-ng OSE stores the original incoming header of the log message. This is useful if the original format of a non-syslog-compliant message must be retained. The syslog-ng OSE application automatically corrects minor header errors, for example, it adds a whitespace before "msg" in the following message: `Jan 22 10:06:11 host program:msg`. If storage of the original header of the message is not needed, enable the `dont-store-legacy-msghdr` flag.
* `sanitize-utf8`: When this flag is used, syslog-ng OSE converts non-UTF-8 input to an escaped format, adhering to UTF-8.
Prior to version 4.6, this only worked with parsing RFC3164 messages. In syslog-ng OSE 4.6 and later versions, RFC5424 and raw messages can also be parsed using this flag.
* `store-raw-message`: This flag saves the original message as received from the client in the `${RAWMSG}` macro. This raw message can be forwarded in its original form to another syslog-ng OSE node using the `syslog-ng()` destination, or to a SIEM system, making sure that the SIEM can process it. This flag is available in syslog-ng OSE 3.16 and later versions.
* `syslog-protocol`: This flag specifies that incoming messages are expected to be formatted according to the new IETF syslog protocol standard (RFC5424), but without the frame header. Note that this flag is not needed for the syslog driver, which handles only messages that have a frame header.
* `validate-utf8`: This flag enables encoding-verification for messages.
Prior to version 4.6, this only worked with parsing RFC3164 messages. In syslog-ng OSE 4.6 and later versions, RFC5424 and raw messages can also be parsed using this flag.
In the case of RFC5424 formatted messages, if the byte order mark (BOM) character is missing, but the message is otherwise UTF-8 compliant, syslog-ng OSE automatically adds the BOM character to the message.

{% include doc/admin-guide/options/host-override.md %}

{% include doc/admin-guide/options/keep-hostname.md %}

{% include doc/admin-guide/options/keep-timestamp.md %}

{% include doc/admin-guide/options/log-fetch-limit.md %}

{% include doc/admin-guide/options/log-iw-size.md %}

{% include doc/admin-guide/options/log-prefix.md %}

## normalize-hostnames()

|   Type:|       `yes`, `no`|
|Default:|              `no`|

*Description:* If this option is set to `yes` (`normalize-hostnames(yes)`), syslog-ng OSE converts the hostnames to lowercase. This setting only applies to hostnames resolved from DNS. It has no effect if the `keep-hostname()` option is enabled, and the message contains a hostname.

{% include doc/admin-guide/options/persist-name.md %}

{% include doc/admin-guide/options/port.md %}

{% include doc/admin-guide/options/program-override.md %}

{% include doc/admin-guide/options/tags.md %}

{% include doc/admin-guide/options/time-zone.md %}

{% include doc/admin-guide/options/time-reopen.md %}

{% include doc/admin-guide/options/use-dns.md %}

{% include doc/admin-guide/options/use-fqdn.md %}

{% include doc/admin-guide/options/workers.md %}
