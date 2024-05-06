---
title: Global objects
id: adm-conc-glob
---

## Source driver

A communication method used to receive log messages. For example, syslog-ng can
receive messages from a remote host via TCP/IP, or read the messages of a local
application from a file.  

For details on source drivers, see [[source: Read, receive, and collect log messages]].

## Source

A named collection of configured source drivers.

## Destination driver

A communication method used to send log messages. For example, syslog-ng can
send messages to a remote host via TCP /IP, or write the messages into a file
or database.  

For details on destination drivers, see
[[destination: Forward, send, and store log messages]].

## Destination

A named collection of configured destination drivers.

## Filter

An expression to select messages. For example, a simple filter can select the
messages received from a specific host.  

For details, see [[Customize message format using macros and templates]].

## Macro

An identifier that refers to a part of the log message. For example,
the `\${HOST}` macro returns the name of the host that sent the message.
Macros are often used in templates and filenames.  

For details, see [[Customize message format using macros and templates]].

## Parser

Parsers are objects that parse the incoming messages, or parts of a message.
For example, the csv-parser() can segment messages into separate columns at a
predefined separator character (for example, a comma). Every column has a
unique name that can be used as a macro.  

For details, see [[parser: Parse and segment structured messages]]
and [[db-parser: Process message content with a pattern database (patterndb)]].

## Rewrite rule

A rule modifies a part of the message, for example, replaces a string, or sets
a field to a specified value.  

For details, see [[Modifying messages using rewrite rules]].

## Log paths

A combination of sources, destinations, and other objects like filters, parsers,
and rewrite rules. The syslog-ng application sends messages arriving from the
sources of the log paths to the defined destinations, and performs filtering,
parsing, and rewriting of the messages. Log paths are also called log statements.
Log statements can include other (embedded) log statements and junctions to
create complex log paths.  

For details,
see [[log: Filter and route log messages using log paths, flags, and filters]].

## Template

A template is a set of macros that can be used to restructure log messages or
automatically generate file names. For example, a template can add the hostname
and the date to the beginning of every log message.  

For details, see [[Customize message format using macros and templates]].

## Option

Options set global parameters of syslog-ng, like the parameters of name
resolution and timezone handling.  
For details, see [[Global options of syslog-ng OSE]].

For details on the above objects, see [[The configuration syntax in detail]].
