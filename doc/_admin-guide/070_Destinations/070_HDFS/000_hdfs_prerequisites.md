---
title: Prerequisites
id: adm-dest-hdfs-pre
description: >-
    To send messages from syslog-ng OSE to HDFS, complete the following steps.
---

1. If you want to use the Java-based modules of syslog-ng OSE (for
    example, the Elasticsearch, HDFS, or Kafka destinations), you must
    compile syslog-ng OSE with Java support.

    - Download and install the Java Runtime Environment (JRE), 1.7 (or
        newer). You can use OpenJDK or Oracle JDK, other implementations
        are not tested.

    - Install [gradle](https://gradle.org/install) version 2.2.1 or
        newer.

    - Set **LD_LIBRARY_PATH** to include the libjvm.so file, for
        example:LD_LIBRARY_PATH=/usr/lib/jvm/java-7-openjdk-amd64/jre/lib/amd64/server:$LD_LIBRARY_PATH

        Note that many platforms have a simplified links for Java
        libraries. Use the simplified path if available. If you use a
        startup script to start syslog-ng OSE set **LD_LIBRARY_PATH**
        in the script as well.

    - If you are behind an HTTP proxy, create a gradle.properties
        under the modules/java-modules/ directory. Set the proxy
        parameters in the file. For details, see [The Gradle User
        Guide](https://docs.gradle.org/current/userguide/build_environment.html#sec:gradle_properties_and_system_properties).

2. Download the Hadoop Distributed File System (HDFS) libraries
    (version 2.x) from <http://hadoop.apache.org/releases.html>.

3. Extract the HDFS libraries into a temporary directory, then collect
    the various .jar files into a single directory (for example,
    /opt/hadoop/lib/) where syslog-ng OSE can access them. You must
    specify this directory in the syslog-ng OSE configuration file. The
    files are located in the various lib directories under the share/
    directory of the Hadoop release package. (For example, in Hadoop
    2.7, required files are common/hadoop-common-2.7.0.jar,
    common/libs/\*.jar, hdfs/hadoop-hdfs-2.7.0.jar, hdfs/lib/\*, but
    this may change between Hadoop releases, so it is easier to copy
    every .jar file into a single directory.
