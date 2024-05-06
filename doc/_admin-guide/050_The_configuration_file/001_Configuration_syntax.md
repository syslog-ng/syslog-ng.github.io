---
title: The configuration syntax in detail
id: adm-conf-syn
---

Every syslog-ng configuration file must begin with a line containing the
version information of syslog-ng. For syslog-ng version 3.38, this line
looks like:

```config
@version: 3.38
```

Versioning the configuration file was introduced in syslog-ng 3.0. If
the configuration file does not contain the version information,
syslog-ng assumes that the file is for syslog-ng version 2.x. In this
case it interprets the configuration and sends warnings about the parts
of the configuration that should be updated. Version 3.0 and later will
correctly operate with configuration files of version 2.x, but the
default values of certain parameters have changed since 3.0.

## Example: A simple configuration file

The following is a very simple configuration file for syslog-ng: it
collects the internal messages of syslog-ng and the messages from
/dev/log into the /var/log/messages_syslog-ng.log file.

```config
@version: 3.38

source s_local {
    unix-dgram("/dev/log"); internal();
};

destination d_file {
    file("/var/log/messages_syslog-ng.log");
};

log {
    source(s_local); destination(d_file);
};
```

As a syslog-ng user described on a [mailing list](https://lists.gt.net/gentoo/user/209108):

> Alan McKinnon
>
> *The syslog-ng's config file format was written by programmers for
> programmers to be understood by programmers. That may not have been
> the stated intent, but it is how things turned out. The syntax is
> exactly that of C, all the way down to braces and statement
> terminators.*

- The main body of the configuration file consists of object
    definitions: sources, destinations, logpaths define which log
    message are received and where they are sent. All identifiers,
    option names and attributes, and any other strings used in the
    syslog-ng configuration file are case sensitive. Object definitions
    (also called statements) have the following syntax:

    `type-of-the-object identifier-of-the-object {<parameters>};`

  - *Type of the object*: One of source, destination, log, filter,
        parser, rewrite rule, or template.

  - *Identifier of the object*: A unique name identifying the object. When using
  a reserved word as an identifier, enclose the dentifier in quotation marks.  
    All identifiers, attributes, and any other strings used in the
        syslog-ng configuration file are case sensitive.

    > **TIP:** Use identifiers that refer to the type of the object they
    > identify. For example, prefix source objects with **s_**,
    > destinations with **d_**, and so on.
    >  
    > **NOTE:** Repeating a definition of an object (that is, defining the
    > same object with the same id more than once) is not allowed,
    > unless you use the @define allow-config-dups 1 definition in
    > the configuration file.  
    {: .notice--info}

  - *Parameters*: The parameters of the object, enclosed in braces
        {parameters}.

  - *Semicolon*: Object definitions end with a semicolon (**;**).

    For example, the following line defines a source and calls it
    s_internal.

    ```config
    source s_internal {
        internal();
    };
    ```

    The object can be later referenced in other statements using its ID,
    for example, the previous source is used as a parameter of the
    following log statement:

    ```config
    log {
        source(s_internal); destination(d_file);
    };
    ```

- The parameters and options within a statement are similar to
    function calls of the C programming language: the name of the option
    followed by a list of its parameters enclosed within brackets and
    terminated with a semicolon.

    `option(parameter1, parameter2); option2(parameter1, parameter2);`

    For example, the file() driver in the following source statement has
    three options: the filename (/var/log/apache/access.log),
    follow-freq(), and flags(). The follow-freq() option also has a
    parameter, while the flags() option has two parameters.

    ```config
    source s_tail {
        file("/var/log/apache/access.log" follow-freq(1) flags(no-parse, validate-utf8));
    };
    ```

    Objects may have required and optional parameters. Required
    parameters are positional, meaning that they must be specified in a
    defined order. Optional parameters can be specified in any order
    using the option(value) format. If a parameter (optional or
    required) is not specified, its default value is used. The
    parameters and their default values are listed in the reference
    section of the particular object.

    Example: Using required and optional parameters

    The unix-stream() source driver has a single required argument: the
    name of the socket to listen on. Optional parameters follow the
    socket name in any order, so the following source definitions have
    the same effect:

    ```config
    source s_demo_stream1 {
        unix-stream("<path-to-socket>" max-connections(10) group(log));
    };
    source s_demo_stream2 {
        unix-stream("<path-to-socket>" group(log) max-connections(10));
    };
    ```

- Some options are global options, or can be set globally, for
    example, whether syslog-ng OSE should use DNS resolution to resolve
    IP addresses. Global options are detailed in
    [[Global options of syslog-ng OSE]].  

    ```config
    options {
        use-dns(no);
    };
    ```

- Objects can be used before definition.

- Objects can be defined inline as well. This is useful if you use the
    object only once (for example, a filter). For details, see Defining
    configuration objects inline.

- To add comments to the configuration file, start a line with **\#**
    and write your comments. These lines are ignored by syslog-ng.

    ```config
    # Comment: This is a stream source
    source s_demo_stream {
        unix-stream("<path-to-socket>" max-connections(10) group(log));
    };
    ```

> **TIP:** Before activating a new configuration, check that your
> configuration file is syntactically correct using the `syslog-ng --syntax-only` command.
>  
> To activate the configuration, reload the configuration of syslog-ng
> using the `/etc/init.d/syslog-ng reload` command.
{: .notice--info}