---
# NOTE: In case of manpages these have multiple purpose
#           - manid -> if presented, the page treated as a manpage, also represents the section number of the command in the manpage
#           - manname -> will be rendered as the name of the command followed by manid as the section number in the manpage
#           - title -> will be rendered as description / manual name. (the .TH macro’s 4th argument (the “manual name”).
#           - description -> will be rendered as a top NAME section in the manpage
#
title: The loggen manual page
app: loggen
id: adm-man-loggen
manid: 1
manname: loggen
description: >-
    loggen --- Generate syslog messages at a specified rate
---

## SYNOPSIS

loggen [options]

target [port]

## DESCRIPTION

{% include doc/admin-guide/manpages-intro.md %}

The loggen application is a tool to test and stress-test your syslog
server and the connection to the server. It can send syslog messages to
the server at a specified rate using a number of connection types and
protocols, including TCP, UDP, and unix domain sockets. The messages can
be generated automatically (repeating the PADDstring over and over), or
read from a file or the standard input.

When loggen finishes sending the messages, it displays the following
statistics:

- average rate: The average rate of the sent messages in
    messages/second.

- count: The total number of messages sent.

- time: The time required to send the messages in seconds.

- average message size: The average size of the sent messages in
    bytes.

- bandwidth: The average bandwidth used for sending the messages in
    kilobytes/second.

## OPTIONS

`--active-connections <number-of-connections>`

    Number of connections loggen will use to send messages to the
    destination. This option is usable only when using TCP or TLS
    connections to the destination. Default value: 1

    The loggen utility waits until every connection is established
    before starting to send messages. See also the `--idle-connections`
    option.

`--csv` or `-C`

    Send the statistics of the sent messages to stdout as CSV. This can
    be used for plotting the message rate.

`--dgram` or `-D`

    Use datagram socket (UDP or unix-dgram) to send the messages to the
    target. Requires the \--inet option as well.

`--dont-parse` or `-d`

    Do not parse the lines read from the input files, send them as
    received.

`--help` or `-h`

    Display a brief help message.

`--idle-connection <number-of-connections>`

    Number of idle connections loggen will establish to the destination.
    Note that loggen will not send any messages on idle connections, but
    the connection is kept open using keep-alive messages. This option
    is usable only when using TCP or TLS connections to the destination.
    See also the --active-connections option. Default value: 0

`--inet` or `-i`

    Use the TCP (by default) or UDP (when used together with the
    \--dgram option) protocol to send the messages to the target.

`--interval <seconds>` or `-I <seconds>`

    The number of seconds loggen will run. Default value: 10

    NOTE: When `--interval` and `--number` are used together, loggen will
    send messages until the period set in `--interval` expires or the
    amount of messages set in `--number` is reached, whichever happens
    first.

`--ipv6` or `-6`

    Specify the destination using its IPv6 address. Note that the
    destination must have a real IPv6 address.

`--loop-reading` or `-l`

    Read the file specified in `--read-file` option in loop: loggen will
    start reading from the beginning of the file when it reaches the end
    of the file.

`--number <number-of-messages>` or `-n <number-of-messages>`

    Number of messages to generate.

    NOTE: When `--interval` and `--number` are used together, loggen will
    send messages until the period set in `--interval` expires or the
    amount of messages set in `--number` is reached, whichever happens
    first.

`--no-framing` or `-F`

    Do not use the framing of the IETF-syslog protocol style, even if
    the `--syslog-proto` option is set.

`--quiet` or `-Q`

    Display statistics only when loggen is finished. If not set, the
    statistics are displayed every second.

`--permanent` or `-T`

    Keep sending logs indefinitely, without time limit.

`--rate <message/second>` or `-r <message/second>`

    The number of messages generated per second for every active
    connection. Default value: 1000

    If you want to change the message rate while loggen is running, send
    SIGUSR1 to double the message rate, or SIGUSR2 to halve it:

    kill `-USR1 <loggen-pid>kill` `-USR2 <loggen-pid>`

`--read-file <filename>` or `-R <filename>`

    Read the messages from a file and send them to the target. See also
    the `--skip-tokens` option.

    Specify - as the input file to read messages from the standard input
    (stdio). Note that when reading messages from the standard input,
    loggen can only use a single thread. The -R -parameters must be
    placed at end of command, like: loggen 127.0.0.1 1061 `--read-file` -

`--sdata <data-to-send>` or `-p <data-to-send>`

    Send the argument of the `--sdata` option as the `SDATA` part of
    IETF-syslog (RFC-5424 formatted) messages. Use it together with the
    `--syslog-proto` option. 
    
    For example: 

    ```config
    --sdata "[test name=\"value\"]
    ```

`--size <message-size>` or `-s <message-size>`

    The size of a syslog message in bytes. Default value: 256. Minimum
    value: 127 bytes, maximum value: 8192 bytes.

`--skip-tokens <number>`

    Skip the specified number of space-separated tokens (words) at the
    beginning of every line. For example, if the messages in the file
    look like foo bar message, --skip-tokens 2 skips the foo bar part
    of the line, and sends only the message part. Works only when used
    together with the --read-file parameter. Default value: 0

`--stream` or `-S`

    Use a stream socket (TCP or unix-stream) to send the messages to the
    target.

`--syslog-proto` or `-P`

    Use the new IETF-syslog message format. By
    default, loggen uses the legacy BSD-syslog message format.
    See also the \--no-framing option.

`--unix </path/to/socket>` or `-x </path/to/socket>`

    Use a UNIX domain socket to send the messages to the target.

`--use-ssl` or `-U`

    Use an SSL-encrypted channel to send the messages to the target.
    Note that it is not possible to check the certificate of the target,
    or to perform mutual authentication.

`--version` or `-V`

    Display version number of syslog-ng.

### EXAMPLES:

The following command generates 100 messages per second for ten minutes,
and sends them to port 2010 of the localhost via TCP. Each message is
300 bytes long.

```bash
loggen --size 300 --rate 100 --interval 600 127.0.0.1 2010
```

The following command is similar to the one above, but uses the UDP
protocol.

```bash
loggen --inet --dgram --size 300 --rate 100 --interval 600 127.0.0.1 2010
```

Send a single message on TCP6 to the ::1 IPv6 address, port 1061:

```bash
loggen --ipv6 --number 1 ::1 1061
```

Send a single message on UDP6 to the ::1 IPv6 address, port 1061:

```bash
loggen --ipv6 --dgram --number 1 ::1 1061
```

Send a single message using a unix domain-socket:

```bash
loggen --unix --stream --number 1 </path/to/socket>
```

Read messages from the standard input (stdio) and send them to the
localhost:

```bash
loggen 127.0.0.1 1061 --read-file -
```

## FILES

/opt/syslog-ng/bin/loggen

{% include doc/admin-guide/manpages-footnote.md %}
