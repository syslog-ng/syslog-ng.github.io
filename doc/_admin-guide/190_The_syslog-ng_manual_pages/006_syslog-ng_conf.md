---
# NOTE: In case of manpages these have multiple purpose
#           - manid -> if presented, the page treated as a manpage, also represents the section number of the command in the manpage
#           - manname -> will be rendered as the name of the command followed by manid as the section number in the manpage
#           - title -> will be rendered as description / manual name. (the .TH macro’s 4th argument (the “manual name”).
#           - description -> will be rendered as a top NAME section in the manpage
#
title: The syslog-ng.conf manual page
id: adm-man-syslogng-conf
manid: 5
manname: syslog-ng.conf
description: >-
    syslog-ng.conf - {{ site.product.short_name }} configuration file
---

## SYNOPSIS

**syslog-ng.conf**

## DESCRIPTION

This manual page is only an abstract.

The {{ site.product.short_name }} application is a flexible and highly scalable system
logging application. Typically, {{ site.product.short_name }} is used to manage log
messages and implement centralized logging, where the aim is to collect
the log messages of several devices on a single, central log server. The
different devices - called {{ site.product.short_name }} clients - all run {{ site.product.short_name }},
and collect the log messages from the various applications, files, and
other sources. The clients send all important log messages to the remote
{{ site.product.short_name }} PE server, where the server sorts and stores them.

## BASIC CONCEPTS OF {{ site.product.short_name }}

The {{ site.product.short_name }} application reads incoming messages and forwards them
to the selected destinations. The {{ site.product.short_name }} application can receive
messages from files, remote hosts, and other sources.

Log messages enter {{ site.product.short_name }} in one of the defined sources, and are
sent to one or more destinations.

Sources and destinations are independent objects, log paths define what
{{ site.product.short_name }} does with a message, connecting the sources to the
destinations. A log path consists of one or more sources and one or more
destinations: messages arriving from a source are sent to every
destination listed in the log path. A log path defined in {{ site.product.short_name }}
is called a log statement.

Optionally, log paths can include filters. Filters are rules that select
only certain messages, for example, selecting only messages sent by a
specific application. If a log path includes filters, {{ site.product.short_name }}
sends only the messages satisfying the filter rules to the destinations
set in the log path.

Other optional elements that can appear in log statements are parsers
and rewriting rules. Parsers segment messages into different fields to
help processing the messages, while rewrite rules modify the messages by
adding, replacing, or removing parts of the messages.

## CONFIGURING {{ site.product.short_name }}

The main body of the configuration file consists of object
definitions: sources, destinations, logpaths define which log
message are received and where they are sent. All identifiers,
option names and attributes, and any other strings used in the
{{ site.product.short_name }} configuration file are case sensitive. Object definitions
(also called statements) have the following syntax:

```config
type-of-the-object identifier-of-the-object {<parameters>};
```

- Type of the object: One of source, destination, log, filter, parser, rewrite rule, or template.

- Identifier of the object: A unique name identifying the object. When using a reserved word as an identifier, enclose the identifier in quotation marks `""`. All identifiers, attributes, and any other strings used in the {{ site.product.short_name }} configuration file are case sensitive.

  **TIP:** Use identifiers that refer to the type of the object they
  identify. For example, prefix source objects with `s_`,
  destinations with `d_`, and so on
  {: .notice--info}

  **NOTE:** Repeating a definition of an object (that is, defining the same
  object with the same id more than once) is not allowed, unless
  you use the `@define allow-config-dups 1` definition in the
  configuration file
  {: .notice--info}

- Parameters: The parameters of the object, enclosed in braces `{parameters}`

- Semicolon: Object definitions end with a semicolon `;`

For example, the following line defines a source and calls it s_internal.

```config
source s_internal { internal(); };
```

The object can be later referenced in other statements using its ID,
for example, the previous source is used as a parameter of the
following log statement:

```config
log { source(s_internal); destination(d_file); };
```

The parameters and options within a statement are similar to
function calls of the C programming language: the name of the option
followed by a list of its parameters enclosed within brackets and
terminated with a semicolon.

```config
option(parameter1, parameter2); option2(parameter1, parameter2);
```

For example, the file() driver in the following source statement has
three options: the filename `/var/log/apache/access.log`,
follow-freq(), and flags(). The follow-freq() option also has a
parameter, while the flags() option has two parameters.

```config
source s_tail { file("/var/log/apache/access.log"
follow-freq(1) flags(no-parse, validate-utf8)); };
```

Objects may have required and optional parameters. Required
parameters are positional, meaning that they must be specified in a
defined order. Optional parameters can be specified in any order
using the **option(value)** format. If a parameter (optional or
required) is not specified, its default value is used. The
parameters and their default values are listed in the reference
section of the particular object.

Using required and optional parameters.

The unix-stream() source driver has a single required argument: the
name of the socket to listen on. Optional parameters follow the
socket name in any order, so the following source definitions have
the same effect:

```config
source s_demo_stream1 {
    unix-stream("<path-to-socket>" 
    max-connections(10) group(log)); 
};

source s_demo_stream2 {
    unix-stream("<path-to-socket>" 
    group(log) max-connections(10)); 
};
```

Some options are global options, or can be set globally, for
example, whether {{ site.product.short_name }} should use DNS resolution to resolve
IP addresses.

```config
options { use-dns(no); };
```

Objects can be used before definition.

Objects can be defined inline as well. This is useful if you use the
object only once (for example, a filter).

To add comments to the configuration file, start a line with \# and
write your comments. These lines are ignored by {{ site.product.short_name }}.

```config
# Comment: This is a stream source

source s_demo_stream {
unix-stream("<path-to-socket>" max-connections(10) group(log)); };
```

The syntax of log statements is as follows:

```config
log {
    source(s1); source(s2); ...
    optional_element(filter1|parser1|rewrite1);
    optional_element(filter2|parser2|rewrite2);
    ...
    destination(d1); destination(d2); ...
    flags(flag1[, flag2...]);
};
```

The following log statement sends all messages arriving to the localhost
to a remote server.

```config
source s_localhost { network(ip(127.0.0.1) port(1999)); };
destination d_tcp { network("10.1.2.3" port(1999) localport(999)); };
log { source(s_localhost); destination(d_tcp); };
```

The {{ site.product.short_name }} application has a number of global options governing
DNS usage, the timestamp format used, and other general points. Each
option may have parameters, similarly to driver specifications. To set
global options add an option statement to the {{ site.product.short_name }}
configuration file using the following syntax:

```config
options { option1(params); option2(params); ... };
```

For example, to disable domain name resolving, add the following line to the
{{ site.product.short_name }} configuration file:

```config
options { use-dns(no); };
```

The sources, destinations, and filters available in {{ site.product.short_name }} are
listed below.  

## TABLE 1: SOURCE DRIVERS AVAILABLE IN {{ site.product.short_name }}

|Name                                |Description
|---|---
|arr sources                   |lidarr(), prowlarr(), radarr(), readarr(), sonarr() and whisparr() collect logs of Lidarr, Prowlarr, Radarr, Readarr, and Sonarr.
|darwin-oslog(), darwin-oslog-stream()|Collects logs on macOS with the native OSLog framework.
|default-network-drivers()     |A special source that uses multiple source drivers to receive and parse several different types of syslog messages from the network.
|file()                        |Opens the specified file and reads messages.
|wildcard-file()               |Reads messages from multiple files and directories.
|freebsd-audit()               |Collects FreeBSD audit logs.
|hypr-audit-trail(), hypr-app-audit-trail()|Can fetch events from the Hypr REST API.
|internal()                    |Messages generated internally in {{ site.product.short_name }}.
|jellyfin()                    |Reads Jellyfin logs from its log file output.
|kafka()                       |Fetches messages from the Apache Kafka message bus.
|kubernetes()                  |Collects container logs managed by the Kubelet.
|linux-audit()                 |Reads and automatically parses the Linux audit logs.
|mbox()                        |Read e-mail messages from local mbox files, and convert them to multi-line log messages.
|mqtt()                        |Fetches messages from MQTT brokers.
|network()                     |Receives messages from remote hosts using the BSD-syslog protocol over IPv4 and IPv6. Supports the TCP, UDP, and TLS network protocols.
|nodejs()                      |Receives JSON messages from nodejs applications.
|opentelemetry()               |Collects logs, metrics and traces from OpenTelemetry clients.
|osquery()                     |Run osquery queries, and convert their results into log messages.
|pacct()                       |Reads messages from the process accounting logs on Linux.
|pihole-ftl()                  |Collect logs of the Pi-hole FTL (Faster Than Light) application.
|pipe()                        |Opens the specified named pipe and reads messages.
|pacct()                       |Collects process accounting logs on Linux systems.
|program()                     |Opens the specified application and reads messages from its standard output.
|python()                      |Allows you to write your own source in Python.
|qbittorrent()                 |Collects logs of the qBittorrent application.
|snmptrap()                    |Read and parse the SNMP traps of the Net-SNMP\'s snmptrapd application.
|sun-stream(), sun-streams()   |Opens the specified STREAMS device on Solaris systems and reads incoming messages.
|stats-exporter(), stats-exporter-dont-log()|Directly serves the output of syslog-ng-ctl stats and syslog-ng-ctl query to an HTTP scraper, such as Prometheus.
|stdin()                       |Collects messages from the standard input stream.
|sun-streams()                 |Collects syslogd process messages on Solaris using its STREAMS framework and its IPC mechanism called door.
|syslog()                      |Listens for incoming messages using the new IETF-standard syslog protocol.
|syslog-ng-otlp()              |The syslog-ng-otlp() source and destination make it possible to transfer the internal representation of log messages between syslog-ng OSE instances, using the OpenTelemetry protocol.
|system()                      |Automatically detects which platform {{ site.product.short_name }} is running on, and collects the native log messages of that platform.
|systemd-journal()             |Collects messages directly from the journal of platforms that use systemd.
|systemd-syslog()              |Collects messages from the journal using a socket on platforms that use systemd.
|unix-dgram()                  |Opens the specified unix socket in SOCK_DGRAM mode and listens for incoming messages.
|unix-stream()                 |Opens the specified unix socket in SOCK_STREAM mode and listens for incoming messages.
|webhook(), webhook-json()     |Collects logs through a webhook using the webhook() and webhook-json() sources. The webhook-json() source automatically parses the payload using the json-parser().

## TABLE 2: DESTINATION DRIVERS AVAILABLE IN {{ site.product.short_name }}

|Name                   |Description
|---|---
|amqp()            |Publishes messages using the AMQP (Advanced Message Queuing Protocol).
|bigquery()        |Send data to Google Cloud BigQuery through the BigQuery Storage Write API using a gRCP based high performance implementation.
|collectd()        |Uses the unixsock plugin of the collectd application to send log messages to the collectd system statistics collection daemon.
|discord()         |Sends messages to Discord using Discord Webhook.
|elasticsearch-http|Sends messages to an Elasticsearch server.
|file()            |Writes messages to the specified file.
|google-pubsub()   |Send data to Google Cloud Pub/Sub using its HTTP REST API.
|graphite()        |Sends metrics to a Graphite server to store numeric time-series data.
|graylog2()        |Sends syslog messages to Graylog.
|hdfs()            |Sends messages into a file on a Hadoop Distributed File System (HDFS) node.
|http()            |Sends messages over the HTTP protocol. There are two different implementations of this driver: a Java-based http driver, and an http driver without Java.
|kafka()           |Publishes log messages to the Apache Kafka message bus, where subscribers can access them.
|loggly()          |Sends log messages to the Loggly Logging-as-a-Service provider.
|logmatic()        |Sends log messages to the Logmatic.io Logging-as-a-Service provider.
|loki()            |Sends log data to Grafana Loki. 
|mongodb()         |Sends messages to a MongoDB database.
|mqtt()            |Publishes messages to MQTT brokers.
|network()         |Sends messages to a remote host using the BSD-syslog protocol over IPv4 and IPv6. Supports the TCP, UDP, and TLS network protocols.
|openobserve-log() |Sends messages to OpenObserve using OpenObserve Log Ingestion - JSON API.
|opensearch()      |Posts log messages to OpenSearch using its HTTP endpoint.
|opentelemetry()   |Send logs, metrics and traces from OpenTelemetry clients using the OpenTelemetry Protocol (OTLP/gRPC).
|osquery()         |Sends log messages to osquery’s syslog table.
|pipe()            |Writes messages to the specified named pipe.
|program()         |Forks and launches the specified program, and sends messages to its standard input.
|pseudofile()      |A very simple driver, aimed at delivering messages to special files such as files in the /proc, /dev or /sys directories.
|python()          |Allows you to write your own destination in Python.
|redis()           |Sends messages as name-value pairs to a Redis key-value store.
|riemann()         |Sends metrics or events to a Riemann monitoring system.
|s3()              |Sends log messages to the Amazon Simple Storage Service (Amazon S3) object storage service.
|slack()           |Sends messages to a Slack channel using the Slack Web API.
|smtp()            |Sends e-mail messages to the specified recipients.
|snmp()            |Sends SNMP traps using the Simple Network Management Protocol version 2c or version 3.
|splunk-hec-raw(), splunk-hec-event()|Sends messages to the Splunk HTTP Event Collector(HEC).
|sql()             |Sends messages into an SQL database. In addition to the standard {{ site.product.short_name }} packages, the sql() destination requires database-specific packages to be installed.
|stdout()          |Sends messages to the standard output.
|stomp()           |Sends messages to a STOMP server.
|sumologic-http(), sumologic-syslog()|Sends log messages to Sumo Logic, a cloud-based log management and security analytics service.
|syslog()          |Sends messages to the specified remote host using the IETF-syslog protocol. The IETF standard supports message transport using the UDP, TCP, and TLS networking protocols.
|syslog-ng()       |Forwards log messages to another syslog-ng OSE node in EWMM format.
|syslog-ng-otlp()  |The syslog-ng-otlp() source and destination make it possible to transfer the internal representation of log messages between syslog-ng OSE instances, using the OpenTelemetry protocol.
|telegram()        |Sends log messages to Telegram, which is a secure, cloud-based mobile and desktop messaging app.
|unix-dgram()      |Sends messages to the specified unix socket in SOCK_DGRAM style (BSD).
|unix-stream()     |Sends messages to the specified unix socket in SOCK_STREAM style (Linux).
|usertty()         |Sends messages to the terminal of the specified user, if the user is logged in.

## TABLE 3: FILTER FUNCTIONS AVAILABLE IN {{ site.product.short_name }}

|Name                         |Description
|---------------------------- |-------------
|facility()|             | Filter messages based on the sending facility.
|filter()|               | Call another filter function.
|host()|                 | Filter messages based on the sending host.
|inlist()|               | File-based whitelisting and blacklisting.
|level() or priority()|  | Filter messages based on their priority.
|match()|                | Use a regular expression to filter messages based on a specified header or content field.
|message()|              | Use a regular expression to filter messages based on their content.
|netmask()|              | Filter messages based on the IP address of the sending host.
|program()|              | Filter messages based on the sending application.
|source()|               | Select messages of the specified {{ site.product.short_name }} source statement.
|tags()|                 | Select messages having the specified tag.

## FILES

/opt/syslog-ng/

/opt/syslog-ng/etc/syslog-ng.conf

{% include doc/admin-guide/manpages-footnote.md %}
