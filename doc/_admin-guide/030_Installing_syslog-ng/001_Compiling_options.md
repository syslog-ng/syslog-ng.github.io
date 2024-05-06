---
title: Compiling options of syslog-ng OSE
id: adm-inst-compopt
---

When compiling syslog-ng OSE from source, you can use the following
compiling options.

- *\--enable-all-modules* This option will turn on or off all modules
    and most features when enabled, unless a feature is explicitly
    disabled, or not detected automatically. Currently, this means that
    you must explicitly enable the pacct() source, since it is not
    detected automatically (all other modules are compiled automatically
    if the required libraries are available).

    This also means that the Sun Streams source is enabled on every
    platform, not only on Solaris, causing a compile error. Use
    **\--enable-all-modules** together with **\--disable-sun-streams**.

- *\--disable-http* Disable support for the http() destination that is
    based on *libcurl*.

- *\--disable-python* Disable support for Python-based modules.

- *\--disable-json* Disable JSON support. It also disables
    json-parser, and the format-cim and format-json template functions.
    Also, it disables JSON support even if the json-c library is
    installed and detected (see *\--enable-json*).

- *\--disable-smtp* Disable SMTP support. By default, SMTP support is
    enabled if the libesmtp library is detected.

- *\--disable-snmp* Disable SNMP support. By default, SNMP support is
    enabled if the libsnmp-dev library is detected.

- *\--enable-amqp* Enable the amqp destination (enabled by default).
    The source of the RabbitMQ client is included in the source code
    package of syslog-ng OSE. To use an external client instead, use the
    **\--with-librabbitmq-client=system** compiling option. For details
    on using this destination, see [[amqp: Publishing messages using AMQP]].

- *\--enable-debug* Include debug information.

- *\--enable-dynamic-linking* Compile syslog-ng as a completely
    dynamic binary. If not specified syslog-ng uses mixed linking
    (\--enable-mixed-linking): it links dynamically to system libraries
    and statically to everything else.

- *\--enable-geoip* Enable GEOIP support, required for the geoip2
    template function and the geoip2-parser (enabled automatically if
    the libmaxminddb library is detected).

- *\--enable-ipv6* Enable IPv6 support.

- *\--enable-java* Enable support for Java-based modules. For other
    requirements, see the description of the Java-based module (for
    example,
    [[HDFS prerequisites|adm-dest-hdfs-pre]]) that you want to use.

- *\--enable-java-modules* Compile the Gradle projects of every Java
    module available in modules/java-modules.

- *\--enable-json* Enables JSON support (by default, it uses the
    json-c library included in the source code package of syslog-ng
    OSE). JSON support is required for json-parser, and the format-cim
    and format-json template functions.

- *\--enable-linux-caps* Enable support for capabilities on Linux. For details, 
    see [[The syslog-ng manual page]].
  
- *\--enable-mongodb* Enable the mongodb destination (enabled by
    default). To use mongodb(), an external MongoDB client is needed.
    For further details on using this destination, see
    [[mongodb(): Storing messages in a MongoDB database]].

- *\--enable-pacct* Enable using the pacct() driver to collect
    process-accounting logs on Linux systems.

- *\--enable-python* Enable support for Python-based modules.

- *\--enable-redis* Enable the redis destination (enabled by default).
    The source of the libhiredis client (0.11 or newer) must be
    available. To specify the location of the library, use the
    **\--with-libhiredis=\<path-to-libhiredis\>** compiling option. For
    details on using this destination, see [[redis: Storing name-value pairs in Redis]].

- *\--enable-riemann* Enable the riemann destination (enabled by
    default). The source of the libriemann client must be available. For
    details on using this destination, see
    [[riemann: Monitoring your data with Riemann]].

- *\--enable-snmp-dest* Enable SNMP support even if not detected
    (autodetected by default).

- *\--enable-spoof-source* Enable spoof\_source feature (disabled by
    default).

- *\--enable-sql* Enables the sql() destination (enabled automatically
    if the libdbi library version 0.9 or newer is installed and
    detected).

- *\--enable-ssl* Enable SSL support, required for encrypted message
    transfer, as well as template functions that calculate hashes and
    UUIDs (enabled automatically if the libopenssl library is detected).

- *\--enable-sun-door* Enable Sun door support even if not detected
    (autodetected by default).

- *\--enable-sun-streams* Enable Sun STREAMS support even if not
    detected (autodetected by default).

- *\--enable-systemd* Enable systemd support on Linux platforms
    (autodetected by default) (enabled automatically if the
    libsystemd-daemon library is detected).

- *\--enable-tcp-wrapper* Enable using */etc/hosts.deny* and
    */etc/hosts.allow* for TCP access (enabled automatically if the
    libwrap libraries are detected).

- *\--with-embedded-crypto* If this option is set, the crypto library
    is linked directly into libsyslog-ng: the sources of
    libsyslog-ng-crypto will be appended to the libsyslog-ng sources,
    and -crypto is not built.

- *\--with-ivykis* Specifies which ivykis implementation to use
    (default value: internal). The source of ivykis is included in the
    source code package of syslog-ng OSE and is used by default. To use
    an external implementation instead, use the
    **\--with-ivykis=system** compiling option.

- *\--with-libcurl* Specifies the path to the libcurl library. For
    details on using this destination, see
    [[http: Posting messages over HTTP without Java]].

- *\--with-libhiredis* Specifies the path to the libhiredis library
    (0.11 or newer). For details on using this destination, see
    [[redis: Storing name-value pairs in Redis]].

- *\--with-librabbitmq-client* Specifies which RabbitMQ client to use
    (default value: internal). The source of the rabbitmq client is
    included in the source code package of syslog-ng OSE and is used by
    default. To use an external client instead, use the
    **\--with-librabbitmq-client=system** compiling option. For details
    on using this destination, see
    [[amqp: Publishing messages using AMQP]].

- *\--with-module-dir* Specifies a single directory where the
    syslog-ng OSE Makefile will install the modules.

- *\--module-install-dir* Specifies syslog-ng OSE\'s module
    installation directory (normally \$prefix/lib/syslog-ng). All
    Java-based SCLs use this option.

- *\--with-module-path* Specifies a colon-separated (:) list of
    directories, where the syslog-ng OSE binary will search for modules.

- *\--with-net-snmp* Specifies the path to the libsnmp-dev library,
    required for the snmp() destination.

- *\--with-python* Specifies which Python version to use, for example,
    **\--with-python=2.7**

- *\--with-timezone-dir* Specifies the directory where syslog-ng looks
    for the timezone files to resolve the time-zone() and
    local-time-zone() options. If not specified, the
    /opt/syslog-ng/share/zoneinfo/ and /usr/share/zoneinfo/ directories
    are checked, respectively. Note that HP-UX uses a unique file format
    (tztab) to describe the timezone information, but that format is
    currently not supported in syslog-ng. As a workaround, copy the
    zoneinfo files from another, non-HP-UX system to the
    /opt/syslog-ng/share/zoneinfo/ directory of your HP-UX system.

- *\--without-compile-date* Removes the compilation date from the
    binary. For example, as openSUSE checks if recompilation changes the
    binary to detect if dependent packages need to be rebuilt or not,
    and including the date changes the binary every time.
