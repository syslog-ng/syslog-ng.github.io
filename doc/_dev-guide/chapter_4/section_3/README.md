---
title: Building on FreeBSD
short_title: FreeBSD
description: >-
   We hope our product can be useful for FreeBSD users as well who want to increase the security of their system through reliable logging.
id: dev-platform-build-freebsd
---

## Introduction

At present we are not supporting FreeBSD {{ site.product.short_name }} on our [[official repository|gh-syslog-ng]] on GitHub. However, you can compile {{ site.product.short_name }} yourself following this guide.

**Note:** The guide is tested on X86_64/amd64 FreeBSD 14 and 13, we do our bests to keep it update, but your actual system may require additional steps or slightly different settings.
{: .notice}

## Compiling from source

Like every project {{ site.product.short_name }} also uses different libraries and build-systems (a.k.a dependencies) that must be installed for compiling and running properly.

### Dependencies

The above mentioned dependencies can be satisfied by compiling every-each libs and tools manually, but it might be preferred to do it the easy way. We used the official FreeBSD Ports to install the dependencies.

#### Using FreeBSD Ports

1. Perform FreeBSD Ports update if you have not done it yet.
1. The following packages should be installed for {{ site.product.short_name }}ng
   * autoconf
   * autoconf-archive
   * automake
   * bison
   * cmake
   * flex
   * gperf
   * glib
   * gmake
   * gperf
   * ivykis - See [below](#packages-note)!
   * json-c
   * libtool
   * pcre2
   * pkgconf
1. The extra modules would require the following
   * gradle
   * grpc - See [below](#packages-note)!
   * hiredis
   * libdbi
   * libdbi-drivers
   * libesmtp
   * libmaxminddb
   * libnet
   * libpaho-mqtt3
   * librdkafka
   * mongo-c-driver
   * net-snmp
   * python3
   * rabbitmq-c
   * riemann-c-client
1. Extra development tools you might require
   * criterion
   * gcc14 - See [below](#packages-note)!

{% include doc/admin-guide/notes/libdb-driver.md %}

This is how it might look like if you start from the ground:

```shell

sudo pkg update
sudo pkg upgrade

sudo pkg install \
    autoconf \
    autoconf-archive \
    automake \
    bison \
    cmake \
    flex \
    glib \
    gmake \
    gperf \
    # Optional, if you use the internal ivykis source of {{ site.product.short_name }} for building
    ivykis \
    json-c \
    libtool \
    pcre2 \
    pkgconf \
    # Optional {{ site.product.short_name }} module dependencies
    gradle \
    grpc \
    hiredis \
    libdbi \
    libesmtp \
    libmaxminddb \
    libnet \
    libpaho-mqtt3 \
    librdkafka \
    mongo-c-driver \
    net-snmp \
    python3 \
    rabbitmq-c \
    riemann-c-client \
    # Optional, needed for unit testing
    criterion \
    # Optional, clang now should compile all modules nicely and it is the officially supported compiler on FreeBSD
    gcc14
```

<div id="packages-note"></div>
> **Note:**
>
> * gcc - see at [compiler selection](#select-the-compiler)
> * grpc - 
> * actual state of supported features, and the required dependencies can also be found [[here|dev-macos-mod-sup-status]].
{: .notice}

### Preparations

In general there is no need to setup a custom environment on FreeBSD, but just for sure you can add the following modifications to force the building process to use the FreeBSD Ports installed packages.

```shell
export BSDPORTS_PREFIX=/usr/local

export BSDPORTS_REPOSITORY=${BSDPORTS_PREFIX}
export MANPATH=${BSDPORTS_PREFIX}/share/man:$MANPATH
export INFOPATH=${BSDPORTS_PREFIX}/share/info:$INFOPATH
```

```shell
export PATH=${BSDPORTS_PREFIX}/bin:${BSDPORTS_PREFIX}/sbin:${PATH}
```

```shell
PKGCONF_PATH=$(pkgconf --variable pc_path pkgconf)
export PKG_CONFIG_PATH=${PKGCONF_PATH}:$PKG_CONFIG_PATH
```

```shell
export CFLAGS="-I${BSDPORTS_PREFIX}/include/ ${CFLAGS}"
export CXXFLAGS="${CFLAGS} ${CXXFLAGS}"
export LDFLAGS="-L${BSDPORTS_PREFIX}/lib ${LDFLAGS}"
```

**Note:** Providing further library paths might be necessary.
{: .notice}

### Getting the source

To get the latest master from {{ site.product.short_name }} git you can use

```shell
cd YOUR_PREFERRED_WORKING_DIR   # Replace `YOUR_PREFERRED_WORKING_DIR` with your actual preferred working dir 
git clone https://github.com/syslog-ng/syslog-ng . 
```

### Select the compiler

Latest version of {{ site.product.short_name }} [has dropped support of gcc](https://github.com/syslog-ng/syslog-ng/pull/4897), so now the platform default llvm/clang must be used to complie the source.\
`gcc` still might compile {{ site.product.short_name }} and most of its modules, but there is no guarantee and support of it anymore.

**Hint:** You can always turn off any problematic module via its feature switch.
{: .notice--info}

To make sure clang is used you can use (optional):

```shell
export CC=clang
export CXX=clang++
```

For gcc (optional):

```shell
export CC=gcc     # More precisly, the full path of ypur installed gcc compiler
export CXX=g++    # More precisly, the full path of ypur installed g++ compiler
```

### Configuration

> **Note:**
>
> * for various reasons not all modules can always be configured, built and used on all FreeBSD versions and architectures
> * for using all the available modules you might have to install further dependencies as mentioned above
> * for more details, please see the [[actual state of supported features|dev-macos-mod-sup-status]], and the required [dependencies](#dependencies).
{: .notice}

#### Using autotool

```shell
# You should use `gmake` instead of `make` on FreeBSD to configure and build syslog-ng with autotools.
export MAKE=gmake

./autogen.sh

# It is always a good idea to keep the source folder as clean as possible, so
# use a dedicated build folder for easier cleanup
mkdir build; cd build

# Finally, you can start the configuration with enabling or disabling the various modules e.g. like this
# NOTE: you might want to use the --prefix /full_path_of_your/installdir/ parameters as well, see below Warning!
../configure --enable-extra-warnings --with-ivykis=system --with-systemd-journal=no --disable-java --disable-java-modules
```

**Warning:** You may want to install the self-built instance to a custom location first to avoid overwriting an existing installed version. In that case, pass the `--prefix /full_path_of_your/installdir/` parameter to the `configue` command, as shown in the steps above.
{: .notice--danger}

If you have all the above mentioned dependencies installed, for the full feature set you can simply use for example (excluded the not yet supported modules on FreeBSD)

```shell
../configure --enable-extra-warnings --with-ivykis=system --with-systemd-journal=no --enable-all-modules
```

At the end of the configure step you should see the module list will be used during the compilation and installation steps, it should look like this

```shell
syslog-ng Open Source Edition 4.8.0.244.gf5c1142 configured
 Edition settings:
  Release type                : stable
  Pretty version              : 4
  Combined vers.              : 4 (4.8.0.244.gf5c1142)
  Package name                : syslog-ng
 Compiler options:
  compiler                    : clang - FreeBSD clang version 18.1.5 (https://github.com/llvm/llvm-project.git llvmorg-18.1.5-0-g617a15a9eac9) - /usr/bin/clang
  compiler options            : -fno-omit-frame-pointer -O2 -g -pthread -I/usr/local/include/   -I/usr/local/include -pthread -I/usr/local/include/glib-2.0 -I/usr/local/lib/glib-2.0/include -DGLIB_VERSION_MIN_REQUIRED=GLIB_VERSION_2_68 -I$(top_srcdir)/lib/eventlog/src -I$(top_builddir)/lib/eventlog/src -I/usr/local/include  -DHAVE_SOCKADDR_SA_LEN -I/usr/local/include -D_DEFAULT_SOURCE -I/usr/local/include/dbi -I/usr/local/include/dbi/dbi -I/usr/local/include -I/usr/local/include -I/usr/local/include/json-c  -D_GNU_SOURCE -D_DEFAULT_SOURCE -D_LARGEFILE_SOURCE -D_FILE_OFFSET_BITS=64
  ObjC compiler               : clang - FreeBSD clang version 18.1.5 (https://github.com/llvm/llvm-project.git llvmorg-18.1.5-0-g617a15a9eac9) - /usr/bin/clang
  C++ enabled                 : yes
  C++ compiler                : clang++ - FreeBSD clang version 18.1.5 (https://github.com/llvm/llvm-project.git llvmorg-18.1.5-0-g617a15a9eac9) - /usr/bin/clang++
  C++ compiler options        : -fno-omit-frame-pointer -O2 -g -I/usr/local/include/
  linker flags                : -L/usr/local/lib
  prefix                      : /full_path_of_your/installdir
  linking mode                : dynamic
  embedded crypto             : no
  __thread keyword            : yes
 Test dependencies:
  Criterion                   : system
  Unit tests                  : yes
 Submodules:
  ivykis                      : system
 Features:
  Forced server mode          : yes
  Debug symbols               : no
  GCC profiling               : no
  Memtrace                    : no
  IPV6 support                : yes
  spoof-source support        : yes
  tcp-wrapper support         : yes
  Linux capability support    : no
  Env wrapper support         : no
  systemd support             : no (unit dir: none)
  systemd-journal support     : optional
  JSON support                : yes
 Build options:
  Generate manual pages       : no
  Install manual pages        : no
 Modules:
  Module search path          : ${exec_prefix}/lib/syslog-ng
  Sun STREAMS support (module): no
  Darwin OSL support (module) : no
  OpenBSD syslog (module)     : no
  SQL support (module)        : yes
  PACCT module (EXPERIMENTAL) : no
  MongoDB destination (module): yes
  JSON support (module)       : yes
  SMTP support (module)       : yes
  HTTP support (module)       : yes
  AMQP destination (module)   : yes
  STOMP destination (module)  : yes
  MQTT (module)               : yes
  GRPC (module)               : yes
  Cloud Auth (module)         : yes
  GEOIP2 support (module)     : yes
  Redis support (module)      : yes
  Kafka support (module)      : yes
  Riemann destination (module): yes, microseconds: no
  Python                      : yes (pkg-config package: auto, packages: venv)
  Python modules              : yes
  Java                        : yes
  Java modules                : yes
  afsnmp module               : yes
  eBPF module                 : no
  native bindings             : yes
  Example modules             : yes
```

The modules have the `: yes` status in the list will be compiled and installed. As you installed the required dependencies earlier there is no need to specify the modules you want to enable, the configuretion step will auto enable the modules that have all the dependencies, Of course, you can disable a given module directly if you do not need it (e.g. `--disable-kafka` will disable the kafka modules).

For trying force enable a given module you can use e.g. `--enable-kafka` that will always try to search for all the module dependencies and stop the configuration if any of it is missing.

#### Using cmake

If you have all the above mentioned dependencies installed, for the full (currently supported) feature set you can simply use

```shell
cmake --install-prefix /full_path_of_your/installdir -B build . -Wno-dev -DIVYKIS_SOURCE=system --fresh
```

At the end of the configure step you should see the module list will be used during the compilation and installation steps, it should look like this

```shell
---------------------------------------
syslog-ng Open Source Edition 4.8.0 configured
------------- Environment -------------
CMAKE_HOST_SYSTEM               FreeBSD-14.1-RELEASE
CMAKE_HOST_SYSTEM_NAME          FreeBSD
CMAKE_HOST_SYSTEM_PROCESSOR     amd64
CMAKE_HOST_SYSTEM_VERSION       14.1-RELEASE
-------------- Compilers --------------
CMAKE_C_COMPILER                clang     [FreeBSD clang version 18.1.5 (https://github.com/llvm/llvm-project.git llvmorg-18.1.5-0-g617a15a9eac9)] - /usr/bin/clang
CMAKE_CXX_COMPILER              clang++   [FreeBSD clang version 18.1.5 (https://github.com/llvm/llvm-project.git llvmorg-18.1.5-0-g617a15a9eac9)] - /usr/bin/clang++
------------- Compilation -------------
CMAKE_BUILD_TYPE                Debug
BUILD_TESTING                   On
ENABLE_EXTRA_WARNINGS           On
------------- Sub-modules -------------
IVYKIS_SOURCE                   system
--------------- Modules ---------------
ENABLE_AFAMQP                   On
ENABLE_AFSMTP                   On
ENABLE_AFSNMP                   On
ENABLE_AFUSER                   On
ENABLE_APPMODEL                 On
ENABLE_AZURE_AUTH_HEADER        On
ENABLE_CLOUD_AUTH               On
ENABLE_CLOUD_AUTH_CURL          On
ENABLE_CPP                      On
ENABLE_CURL                     On
ENABLE_EBPF                     Off
ENABLE_EXAMPLE_FILTERX_FUNC     On
ENABLE_EXAMPLE_MODULES          On
ENABLE_GEOIP2                   On
ENABLE_GETENT                   On
ENABLE_GRPC                     On
ENABLE_HOOK_COMMANDS            On
ENABLE_IPV6                     On
ENABLE_JAVA                     On
ENABLE_JAVA_MODULES             On
ENABLE_JOURNALD                 Off
ENABLE_JSON                     On
ENABLE_KAFKA                    On
ENABLE_MAP_VALUE_PAIRS          On
ENABLE_MONGODB                  On
ENABLE_MQTT                     On
ENABLE_NATIVE                   On
ENABLE_OPENBSD_SYS_DRIVER       Off
ENABLE_PACCT                    Off
ENABLE_PYTHON                   On
ENABLE_PYTHON_MODULES           On
ENABLE_REDIS                    On
ENABLE_RIEMANN                  On
ENABLE_SQL                      On
ENABLE_STARDATE                 On
ENABLE_STOMP                    On
ENABLE_SUN_STREAMS              Off
ENABLE_XML                      On
---------------------------------------
```

The modules have the `ENABLE_XXX On` status in the list will be compiled and installed. As you installed the required dependencies earlier there is no need to specify the modules you want to enable, the configuretion step will auto enable the modules that have all the dependencies, Of course, you can disable a given module directly if you do not need it (e.g. `-DENABLE_KAFKA=OFF` will disable the kafka modules).

For trying force enable a given module you can use e.g. `-DENABLE_KAFKA=OFF` that will always try to search for all the module dependencies and stop the configuration if any of it is missing.
This command will try to force enable all the supported FreeBSD modules (that can be used to validate if your dependecy list was installed correctly)

```shell
cmake --install-prefix /full_path_of_your/installdir -B build . -Wno-dev -DIVYKIS_SOURCE=system --fresh -DENABLE_GETENT=ON -DENABLE_HOOK_COMMANDS=ON -DENABLE_IPV6=ON -DENABLE_MAP_VALUE_PAIRS=ON -DENABLE_NATIVE=ON -DENABLE_STARDATE=ON -DENABLE_STOMP=ON -DENABLE_XML=ON -DENABLE_AFAMQP=ON -DENABLE_AFSMTP=ON -DENABLE_AFSNMP=ON -DENABLE_AFUSER=ON -DENABLE_APPMODEL=ON -DENABLE_AZURE_AUTH_HEADER=ON -DENABLE_CLOUD_AUTH==ON -DENABLE_CLOUD_AUTH_CURL=ON -DENABLE_CPP=ON -DENABLE_CURL=ON -DENABLE_DARWIN_OSL=ON -DENABLE_EXAMPLE_MODULES=ON -DENABLE_GEOIP2=ON -DENABLE_GRPC=ON -DENABLE_JAVA=ON -DENABLE_JAVA_MODULES=ON -DENABLE_JSON=ON -DENABLE_KAFKA=ON -DENABLE_MONGODB=ON -DENABLE_MQTT=ON -DENABLE_PYTHON=ON -DENABLE_PYTHON_MODULES=ON -DENABLE_REDIS=ON -DENABLE_RIEMANN=ON -DENABLE_SQL=ON
```

<!--- 
TODO: once the ENABLE_ALL_MODULES implemented for cmake as well add an example of the usage of it with these required module disablings
-DENABLE_ALL_MODULES=ON -DENABLE_EBPF=OFF -DENABLE_JOURNALD=OFF -DENABLE_OPENBSD_SYS_DRIVER=OFF -DENABLE_SUN_STREAMS=OFF -DENABLE_PACCT=OFF
--->

### Compile and install

```shell
# autotools

# add AM_DEFAULT_VERBOSITY=1 before -j4 option for detailed compilation logging
gmake -j4
gmake install

# or, in a single line
# gmake -j4 install
```

```shell
#cmake

# add -v as well for detailed compilation logging
cmake --build build/. --target install -j4
```

After a successful build you can check the built and the supported modules via

```shell
`/full_path_of_your/installdir`/syslog-ng -V
```

The `Available-Modules:` entry of the output of the above command will show the available modules

```shell
syslog-ng 4 (4.8.0.244.gf5c1142)
Config version: 4.2
Installer-Version: 4.8.0.244.gf5c1142
Revision:
Compile-Date: Sep 25 2024 11:20:08
Module-Directory: /full_path_of_your/installdir/lib/syslog-ng
Module-Path: /full_path_of_your/installdir/lib/syslog-ng
Include-Path: /full_path_of_your/installdir/share/syslog-ng/include
Available-Modules: afsql,riemann,afstomp,kvformat,rate-limit-filter,afsmtp,csvparser,afsnmp,disk-buffer,pseudofile,bigquery,confgen,add-contextual-data,otel,examples,json-plugin,timestamp,hook-commands,stardate,mqtt,afamqp,appmodel,secure-logging,map-value-pairs,basicfuncs,graphite,afuser,afprog,cloud_auth,sdjournal,regexp-parser,cef,kafka,afmongodb,syslogformat,tags-parser,cryptofuncs,tfgetent,correlation,redis,linux-kmsg-format,loki,geoip2-plugin,mod-java,afsocket,system-source,mod-python,azure-auth-header,http,affile,metrics-probe,xml
Enable-Debug: off
Enable-GProf: off
Enable-Memtrace: off
Enable-IPv6: on
Enable-Spoof-Source: on
Enable-TCP-Wrapper: on
Enable-Linux-Caps: off
Enable-Systemd: off
```

### Testing

In order to run the tests, you have to install first the Criterion testing framework (e.g: `sudo pkg install criterion`), and re-[configure](#configuration) the build with testing enabled (`--enable-tests` or `-DBUILD_TESTING=ON`). After that use the command below:

```shell
# autotools

make check -j4
```

```shell
# cmake

cmake --build build/. --target check -j4
```

**Note:** For more read [[testing|dev-testing]] guide.
{: .notice}

### Run

```markdown
`/full_path_of_your/installdir`/syslog-ng -F
```

**Note:** For more information read the [[run first|dev-run-first]] guide
{: .notice}
