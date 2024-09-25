---
title: Building on macOS
short_title: macOS
description: >-
   The {{ site.product.short_name }} application has been resurrected <i class='fas fa-rocket'></i> on macOS by our developer team.<br/>
   We hope our product can be useful for Mac users who want to increase the security of their system through reliable logging.
id: dev-platform-build-macos
---

## Introduction

At present we are not supporting macOS {{ site.product.short_name }} on our [[official repository|gh-syslog-ng]] on GitHub. However, you can compile {{ site.product.short_name }} yourself following this guide.

**Note:** The guide is tested on ARM macOS Sonoma 14.6.1, Ventura 13.4, and Intel macOS Monterey 12.6.6 machines, we do our bests to keep it update, but your actual system may require additional steps or slightly different settings.
{: .notice}

## Compiling from source

Like every project {{ site.product.short_name }} also uses different libraries and build-systems (a.k.a dependencies) that must be installed for compiling and running properly.

### Dependencies

The above mentioned dependencies can be satisfied by compiling every-each libs and tools manually, but it might be preferred to do it the easy way. Homebrew and MacPorts are package managers for macOS which have great communities and support. You can also use them to install the dependencies you need.

#### Using HomeBrew

1. Install Homebrew on your system.

   **Hint:** Don't forget to set up the homebrew environment, follow the instructions in your terminal! [[Here|homebrew-inst-detailed]] you can find an even more detailed instruction about the topic.
   {: .notice--info}

   **Note:** This will install **Command Line Tools for Xcode** as well if not already presented on the system that would also be required anyway for a seamless {{ site.product.short_name }} build.
   {: .notice}

2. Perform `brew update` if you have not done it yet.
3. The following packages should be installed for {{ site.product.short_name }}
   * autoconf
   * autoconf-archive
   * automake
   * bison
   * cmake
   * flex
   * glib
   * ivykis
   * json-c
   * libtool
   * openssl3
   * pcre2
   * pkg-config
4. The following package might be needed too depending on your macOS version and architecture
   * net-snmp
5. The extra modules would require the following
   * gracle
   * grpc
   * hiredis
   * ~~libdbi~~ - See [below](#packages-note)!
   * ~~libesmtp~~ - See [below](#packages-note)!
   * libmaxminddb
   * libnet
   * libpaho-mqtt
   * librdkafka
   * mongo-c-driver
   * python3
   * rabbitmq-c
   * riemann-client
6. Extra development tools you might require
   * criterion
   * ~~gcc@14~~ - See [below](#packages-note)!

**Hint:** If you have [[{{ site.product.short_name }} installed via brew|dev-inst-macos#installation]], as a reference, you can check the dependencies of the brew built version using `brew deps syslog-ng`
{: .notice--info}

This is how it might look like if you start from the ground:

```shell
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install.sh)"

eval "$(brew shellenv)"

brew update

brew install \
    autoconf \
    autoconf-archive \
    automake \
    bison \
    # Optional, a better replacement of autotools making system
    cmake \
    flex \
    glib \
    # Optional, if you use the internal ivykis source of {{ site.product.short_name }} for building
    ivykis \
    json-c \
    libtool \
    net-snmp \
    openssl3 \
    pcre2 \
    pkg-config \
    # Optional {{ site.product.short_name }} module dependencies
    gradle \
    grpc \
    hiredis \
    # Do not use the homebrew provided one, see below!
    # libdbi
    # Homebrew does not have this lib yet
    # libesmtp
    libmaxminddb \
    libnet \
    libpaho-mqtt \
    librdkafka \
    mongo-c-driver \
    python3 \
    rabbitmq-c \
    riemann-client \
    # Optional, needed for unit testing
    criterion \
    # Optional, clang now should compile all modules nicely and it is the oficially supported compiler on macOS
    gcc@14
```

#### Using MacPorts

1. Unlike HomeBrew, Macports does not try to install Xcode which is a hard requirement of a successful build.\
   You can install it e.g. using `xcode-select --install`

2. Install MacPorts on your system.

   **Hint:** Don't forget to set up the MacPorts environment, [[here|macports-inst-detailed]] you can find an even more detailed instruction about the topic.
   {: .notice--info}

3. Perform `port selfupdate` if you have not done it yet.
4. The following packages should be installed for {{ site.product.short_name }}
   * autoconf
   * autoconf-archive
   * automake
   * bison
   * cmake
   * flex
   * glib2
   * ivykis
   * json-c
   * libtool
   * openssl3
   * pcre2
   * pkgconfig
5. The following package might be needed too depending on your macOS version and architecture
   * net-snmp
6. The extra modules would require the following
   * gradle
   * grpc
   * hiredis
   * ~~libdbi~~ - See [below](#packages-note)!
   * libesmtp
   * libmaxminddb
   * libnet
   * librdkafka
   * mongo-c-driver
   * paho.mqtt.c
   * python3
   * rabbitmq-c
   * ~~riemann-client~~ - See [below](#packages-note)!
7. Extra development tools you might require
   * criterion
   * ~~gcc@14~~ - See [below](#packages-note)!

**Hint:** If you have [[{{ site.product.short_name }} installed via MacPorts|dev-inst-macos#installation-via-macports]], as a reference, you can check the dependencies of the MacPorts built version using `port deps syslog-ng`
{: .notice--info}

This is how it might look like if you start from the ground:

```shell
# DO NOT FORGET! Install the MacPorts package first which has a GUI installer. https://www.macports.org/install.php
# But, you can install it from the command line as well, like

# WARNING! SET the below url and package name according to your needs and OS version !!!
export MACPORTS_PKG_NAME=MacPorts-2.10.1-Sonoma.pkg
export MACPORTS_URL=https://github.com/macports/macports-base/releases/download/v2.10.1/${MACPORTS_PKG_NAME}

wget ${MACPORTS_URL}

sudo installer -pkg "./${MACPORTS_PKG_NAME}" -target

sudo xcode-select --install

sudo port -v selfupdate

sudo port install \
    autoconf \
    autoconf-archive \
    automake \
    bison \
    # cmake - Optional, a better replacement of autotools making system
    flex \
    glib2 \
    # Optional {{ site.product.short_name }} module dependencies
    ivykis \
    json-c \
    libtool \
    openssl3 \
    pcre2 \
    pkgconfig \
    # Optional {{ site.product.short_name }} module dependencies
    gradle \
    grpc \
    hiredis \
    # Do not use the homebrew provided one, see below!
    # libdbi 
    libesmtp \
    libmaxminddb \
    libnet \
    librdkafka \
    mongo-c-driver \
    net-snmp \
    paho.mqtt.c \
    python3 \
    rabbitmq-c \
    # MacPorts does not have this lib yet
    # riemann-client
    # Optional, needed for unit testing
    criterion \
    # Optional, clang now should compile all modules nicely and it is the oficially supported compiler on macOS
    gcc@14
```

---
<div id="packages-note"></div>

> **Note:**
>
> * `bison` is required because the version provided by Apple Developer Tools is incomplete (e.g., missing the `-W` option). The reason bison needs to be installed via a package manager is that the `-W` option is supported only in versions after 2.3.
> * `net-snmp` might also be needed because the options provided by Apple Developer Tools are somewhat incorrect. The reason Net-SNMP might be required from a package manager is that the default `pkg-config` may return incorrect library and include paths.
> * `openssl` - since macOS provides LibreSSL by default, you may need to expand the search path of `pkg-config` to find the newly installed OpenSSL. (This seems to have been an issue only with OpenSSL version 1.1.x.)
> * `libdbi` and `libdbi-drivers` are [[maintained and updated|dev-macos-mod-sup-afsql#dependencies]] in {{ site.product.short_name }} repositories, use the latest master version from there
> * `libesmtp` - Homebrew does not have libesmtp package support yet, but you can build it yourself from source or use the MacPorts version
> * `riemann-client` - MacPorts does not have riemann-client package support yet, but you can build it yourself from source or use the HomeBrew version
> * `gcc` - see at [compiler selection](#select-the-compiler)
> * actual state of supported features and the required dependencies can also be found [[here|dev-macos-mod-sup-status]].
{: .notice}

### Preparations

#### Using Homebrew

1. Depending your macOS architecture and version homebrew is using different location for storing its data, so worth using generic references to it, for this, [[just follow the instructions|homebrew-inst-detailed]] during homebrew installation.

   In a nutshell, you either have to use `brew shellenv`, or set manually the env like this

   ```shell
   export HOMEBREW_PREFIX=$(brew --prefix)
   export HOMEBREW_CELLAR=${HOMEBREW_PREFIX}/Cellar
   export HOMEBREW_REPOSITORY=${HOMEBREW_PREFIX}
   export MANPATH=${HOMEBREW_PREFIX}/share/man:${MANPATH}
   export INFOPATH=${HOMEBREW_PREFIX}/share/info:${INFOPATH}
   export PATH=${HOMEBREW_PREFIX}/bin:${HOMEBREW_PREFIX}/sbin:${HOMEBREW_PREFIX}/opt/python/libexec/bin:${PATH}
   ```

2. Force the building process to use bison, net-snmp (and libnet if) installed through homebrew instead of provided by Apple Developer Tools and macOS.

   Add them to the `${PATH}`

   ```shell
   export PATH=${HOMEBREW_PREFIX}/opt/bison/bin:${HOMEBREW_PREFIX}/opt/libnet/bin:${HOMEBREW_PREFIX}/opt/net-snmp/bin:${PATH}
   ```

   Extend the search path of pkg-config to use the homebrew version of openssl, net-snmp and pkgconfig

   ```shell
   export PKG_CONFIG_PATH=${HOMEBREW_PREFIX}/opt/openssl/lib/pkgconfig:${HOMEBREW_PREFIX}/opt/net-snmp/lib/pkgconfig:${HOMEBREW_PREFIX}/lib/pkgconfig:${PKG_CONFIG_PATH}
   ```

   Some of the modules will not, or will incorrectly provide pkg-config support (even if added to `PKG\_CONFIG\_PATH`, e.g. libmaxminddb), to help the automatic configurations find them you can add brew to `CFLAGS`, `CXXFLAGS`, and `LDFLAGS`

   ```shell
   export CFLAGS="-I${HOMEBREW_PREFIX}/include/ ${CFLAGS}"
   export CXXFLAGS="${CFLAGS} ${CXXFLAGS}"
   export LDFLAGS="-L${HOMEBREW_PREFIX}/lib ${LDFLAGS}"
   ```

#### Using MacPorts

1. MacPorts is using a fixed location for storing its data, currently it is the `/opt/local` folder.

   In a nutshell, you can setup the env manually like this

   ```shell
   export MACPORTS_PREFIX=/opt/local
   export MACPORTS_REPOSITORY=${MACPORTS_PREFIX}
   export MANPATH=${MACPORTS_PREFIX}/share/man:${MANPATH}
   export INFOPATH=${MACPORTS_PREFIX}/share/info:${INFOPATH}
   export PATH=${MACPORTS_PREFIX}/bin:${MACPORTS_PREFIX}/sbin:${MACPORTS_PREFIX}/opt/python/libexec/bin:${PATH}
   ```

2. Force the building process to use bison, net-snmp (and libnet if) installed through MacPorts instead of provided by Apple Developer Tools and macOS.

   Add them to the `${PATH}`

   ```shell
   export PATH=${MACPORTS_PREFIX}/opt/bison/bin:${MACPORTS_PREFIX}/opt/libnet/bin:${MACPORTS_PREFIX}/opt/net-snmp/bin:${PATH}
   ```

   Extend the search path of pkg-config to use the MacPorts version of openssl, net-snmp and pkgconfig

   ```shell
   export PKG_CONFIG_PATH=${MACPORTS_PREFIX}/opt/openssl/lib/pkgconfig:${MACPORTS_PREFIX}/opt/net-snmp/lib/pkgconfig:${MACPORTS_PREFIX}/lib/pkgconfig:${PKG_CONFIG_PATH}
   ```

   Some of the modules will not, or will incorrectly provide pkg-config support (even if added to `PKG\_CONFIG\_PATH`, e.g. libmaxminddb), to help the automatic configurations find them you can add brew to `CFLAGS`, `CXXFLAGS`, and `LDFLAGS`

   ```shell
   export CFLAGS="-I${MACPORTS_PREFIX}/include/ ${CFLAGS}"
   export CXXFLAGS="${CFLAGS} ${CXXFLAGS}"
   export LDFLAGS="-L${MACPORTS_PREFIX}/lib ${LDFLAGS}"
   ```

**Note:** Providing further library paths might be necessary. (e.g. for openssl 1.1.x, etc.)
{: .notice}

### Getting the source

To get the latest master from {{ site.product.short_name }} git you can use

```shell
cd YOUR_PREFERRED_WORKING_DIR   # Replace `YOUR_PREFERRED_WORKING_DIR` with your actual preferred working dir 
git clone https://github.com/syslog-ng/syslog-ng . 
```

### Select the compiler

Latest version of {{ site.product.short_name }} [has dropped support of gcc](https://github.com/syslog-ng/syslog-ng/pull/4897), so now the platform default llvm/clang must be used to complie the source.\
`gcc` still might compile {{ site.product.short_name }} and most of its modules, but there is no guarantie and support of it anymore

**Hint:** You can always turn off any problematic module via its feature switch
{: .notice--info}

To make sure clang is used you can use (optional):

```shell
export CC=clang
export CXX=clang++
```

For gcc (optional):

```shell
export CC=gcc     # More precisly, the full path of your installed gcc compiler
export CXX=g++    # More precisly, the full path of your installed g++ compiler
```

### Configuration

> **Note:**
>
> * for various reasons not all modules can always be configured, built and used on all macOS versions and architectures
> * for using all the available modules you might have to install further dependencies as mentioned above
> * for more details, please see the [[actual state of supported features|dev-macos-mod-sup-status]], and the required [dependencies](#dependencies).
{: .notice}

#### Using autotool

```shell
./autogen.sh

# it is always a good idea keeping as clean the source folder as pissible, so
# use a dedicated build folder for easier cleanup
mkdir build; cd build

# Finally, you can start the configuration with enabling or disabling the various modules e.g. like this
# NOTE: you might want to use the --prefix /full_path_of_your/installdir/ parameters as well, see below Warning!
../configure --with-ivykis=system --with-systemd-journal=no --disable-java --disable-java-modules
```

**Warning:** By a good chance, you might want to install the self built instance first to a custom location to prevent overwriting a possibly already existing installed version. In that case pass `--prefix /full_path_of_your/installdir/` to the `configure` script in the above steps.
{: .notice--danger}

If you have all the above mentioned dependencies installed, for the full feature set you can simply use for example (excluded the not yet supported modules on macOS)

```shell
../configure --enable-all-modules --with-ivykis=system --with-systemd-journal=no
```

At the end of the configure step you should see the module list will be used during the compilation and installation steps, it should look like this

```shell
syslog-ng Open Source Edition 4.8.0.155.g8590bdc.dirty configured
 Edition settings:
  Release type                : stable
  Pretty version              : 4
  Combined vers.              : 4 (4.8.0.155.g8590bdc.dirty)
  Package name                : syslog-ng
 Compiler options:
  compiler                    : clang - Apple clang version 15.0.0 (clang-1500.3.9.4) - /usr/bin/clang
  compiler options            : -fno-omit-frame-pointer -O2 -g -pthread -I/opt/homebrew/opt/ruby/include -I/opt/homebrew/opt/openssl@3/include -I/opt/homebrew/include/  -I/opt/local/include -D__APPLE_USE_RFC_3542 -I/opt/homebrew/opt/ruby/include -I/opt/homebrew/opt/openssl@3/include -I/opt/homebrew/include/  -I/opt/local/include -I/opt/homebrew/opt/openssl@3/include -I/opt/homebrew/include/  -I/opt/local/include -I/opt/homebrew/opt/openssl@3/include -I/opt/homebrew/include/   -I/opt/homebrew/Cellar/glib/2.80.4/include -I/opt/homebrew/Cellar/glib/2.80.4/include/glib-2.0 -I/opt/homebrew/Cellar/glib/2.80.4/lib/glib-2.0/include -I/opt/homebrew/opt/gettext/include -I/opt/homebrew/Cellar/pcre2/10.44/include -DGLIB_VERSION_MIN_REQUIRED=GLIB_VERSION_2_68 -I$(top_srcdir)/lib/eventlog/src -I$(top_builddir)/lib/eventlog/src -I/opt/homebrew/Cellar/pcre2/10.44/include -I/opt/homebrew/Cellar/openssl@3/3.3.2/include -DHAVE_SOCKADDR_SA_LEN -DLIBNET_BSD_BYTE_SWAP -I/opt/homebrew/Cellar/libnet/1.3/include -D_DEFAULT_SOURCE -I/opt/homebrew/include -I/opt/homebrew/include/dbi -I/opt/homebrew/Cellar/ivykis/0.43.2/include -I/opt/homebrew/Cellar/json-c/0.17/include -I/opt/homebrew/Cellar/json-c/0.17/include/json-c  -D_GNU_SOURCE -D_DEFAULT_SOURCE -D_LARGEFILE_SOURCE -D_FILE_OFFSET_BITS=64
  ObjC compiler               : clang - Apple clang version 15.0.0 (clang-1500.3.9.4) - /usr/bin/clang
  C++ enabled                 : yes
  C++ compiler                : clang++ -std=gnu++11 -std=gnu++17 - Apple clang version 15.0.0 (clang-1500.3.9.4) - /usr/bin/clang++
  C++ compiler options        : -fno-omit-frame-pointer -O2 -g
  linker flags                : -L/opt/homebrew/opt/ruby/lib  -L/opt/homebrew/opt/openssl@3/lib -L/opt/homebrew/lib  -L/opt/local/lib
  prefix                      : /full_path_of_your/installdir
  linking mode                : dynamic
  classic linking mode        : no
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
  tcp-wrapper support         : no
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
  Darwin OSL support (module) : yes
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

The modules have the `:yes` status in the list will be compiled and installed. As you installed the required dependencies earlier there is no need to specify the modules you want to enable, the configuretion step will auto enable the modules that have all the dependencies, Of course, you can disable a given module directly if you do not need it (e.g. `--disable-kafka` will disable the kafka modules).

For trying force enable a given module you can use e.g. `--enable-kafka` that will always try to search for all the module dependencies and stop the configuration if any of it is missing.

#### Using cmake

If you have all the above mentioned dependencies installed, for the full (currently supported) feature set you can simply use

```shell
# NOTE: you might want to use the --install-prefix /full_path_of_your/installdir/ parameters as well, see below Warning!
cmake --install-prefix /full_path_of_your/installdir -B build . -Wno-dev -DIVYKIS_SOURCE=system --fresh
```

**Warning:** You may want to install the self-built instance to a custom location first to avoid overwriting an existing installed version. In that case, pass the `--install-prefix /full_path_of_your/installdir/` parameter to the `cmake` command, as shown in the steps above.
{: .notice--danger}

At the end of the configure step you should see the module list will be used during the compilation and installation steps, it should look similar to this

```shell
---------------------------------------
syslog-ng Open Source Edition 4.8.0.233.gf6615d0.dirty configured
------------- Environment -------------
CMAKE_HOST_SYSTEM               Darwin-23.6.0
CMAKE_HOST_SYSTEM_NAME          Darwin
CMAKE_HOST_SYSTEM_PROCESSOR     arm64
CMAKE_HOST_SYSTEM_VERSION       23.6.0
-------------- Compilers --------------
CMAKE_C_COMPILER                clang     [Apple clang version 15.0.0 (clang-1500.3.9.4)] - /Applications/Development/Xcode/15.4/Xcode.app/Contents/Developer/Toolchains/XcodeDefault.xctoolchain/usr/bin/clang
CMAKE_CXX_COMPILER              clang++   [Apple clang version 15.0.0 (clang-1500.3.9.4)] - /Applications/Development/Xcode/15.4/Xcode.app/Contents/Developer/Toolchains/XcodeDefault.xctoolchain/usr/bin/clang++
CMAKE_OBJC_COMPILER             clang     [Apple clang version 15.0.0 (clang-1500.3.9.4)] - /usr/bin/clang
------------- Compilation -------------
CMAKE_BUILD_TYPE                Debug
BUILD_TESTING                   On
ENABLE_EXTRA_WARNINGS           On
FORCE_CLASSIC_LINKING           Off
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
ENABLE_DARWIN_OSL               On
ENABLE_EBPF                     Off
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
ENABLE_OBJC                     On
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

Modules with the status `ENABLE_XXX On` in the list will be compiled and installed. Since you’ve already installed the required dependencies, there’s no need to manually specify the modules you want to enable. The configuration step will automatically enable any modules that have all their dependencies. However, you can always disable specific modules if needed (e.g., using `-DENABLE_KAFKA=OFF` to disable the Kafka module).

To attempt to force-enable a specific module, you can use a command option like `-DENABLE_KAFKA=ON`. This will search for all the module's dependencies and halt the configuration process if any are missing. This command can also be used to force-enable all supported macOS modules, which is useful for validating whether your dependency list has been installed correctly.

<!--- 
TODO: once the ENABLE_ALL_MODULES implemented for cmake as well add an example of the usage of it with these required module disablings
-DENABLE_ALL_MODULES=ON -DENABLE_EBPF=OFF -DENABLE_JOURNALD=OFF -DENABLE_OPENBSD_SYS_DRIVER=OFF -DENABLE_SUN_STREAMS=OFF -DENABLE_PACCT=OFF
--->
```shell
cmake --install-prefix /full_path_of_your/installdir -B build . -Wno-dev -DIVYKIS_SOURCE=system --fresh -DENABLE_GETENT=ON -DENABLE_HOOK_COMMANDS=ON -DENABLE_IPV6=ON -DENABLE_MAP_VALUE_PAIRS=ON -DENABLE_NATIVE=ON -DENABLE_STARDATE=ON -DENABLE_STOMP=ON -DENABLE_XML=ON -DENABLE_AFAMQP=ON -DENABLE_AFSMTP=ON -DENABLE_AFSNMP=ON -DENABLE_AFUSER=ON -DENABLE_APPMODEL=ON -DENABLE_AZURE_AUTH_HEADER=ON -DENABLE_CLOUD_AUTH==ON -DENABLE_CLOUD_AUTH_CURL=ON -DENABLE_CPP=ON -DENABLE_CURL=ON -DENABLE_DARWIN_OSL=ON -DENABLE_EXAMPLE_MODULES=ON -DENABLE_GEOIP2=ON -DENABLE_GRPC=ON -DENABLE_JAVA=ON -DENABLE_JAVA_MODULES=ON -DENABLE_JSON=ON -DENABLE_KAFKA=ON -DENABLE_MONGODB=ON -DENABLE_MQTT=ON -DENABLE_PYTHON=ON -DENABLE_PYTHON_MODULES=ON -DENABLE_REDIS=ON -DENABLE_RIEMANN=ON -DENABLE_SQL=ON
```

### Compile and install

```shell
# autotools

# add AM_DEFAULT_VERBOSITY=1 before -j4 option for detailed compilation logging
make -j4
make install

# or, in a single line
# make -j4 install
```

```shell
#cmake

# add -v as well for detailed compilation logging
cmake --build build/. --target install -j4
```

After a succesful build you can check the built and supported modules via

```shell
`/full_path_of_your/installdir`/syslog-ng -V
```

The `Available-Modules:` entry of the output of the above command will show the available modules

```shell
syslog-ng 4.8.0.240.gcf39eb3.dirty
Config version: 4.2
Installer-Version: 4.8.0.240.gcf39eb3.dirty
Revision: 4.8.0.240.gcf39eb3.dirty
Compile-Date: Sep 24 2024 17:57:15
Module-Directory: /full_path_of_your/installdir/lib/syslog-ng
Module-Path: /full_path_of_your/installdir/lib/syslog-ng
Include-Path: /full_path_of_your/installdir/share/syslog-ng/include
Available-Modules: bigquery,timestamp,darwinosl,kvformat,redis,riemann,afamqp,appmodel,afprog,loki,examples,metrics-probe,cef,map_value_pairs,otel,afsnmp,kafka,stardate,system-source,confgen,afuser,xml,disk-buffer,tfgetent,linux-kmsg-format,cloud_auth,correlation,json-plugin,pseudofile,affile,afsmtp,csvparser,basicfuncs,syslogformat,hook-commands,mqtt,afmongodb,graphite,tags-parser,geoip2-plugin,afstomp,http,secure-logging,afsql,mod-python,afsocket,add_contextual_data,mod-java,cryptofuncs,azure-auth-header,regexp-parser,rate_limit_filter
Enable-Debug: on
Enable-GProf: off
Enable-Memtrace: off
Enable-IPv6: on
Enable-Spoof-Source: on
Enable-TCP-Wrapper: off
Enable-Linux-Caps: off
Enable-Systemd: off
```

### Testing

In order to run the tests, you have to install first the Criterion testing framework (for example: `brew install criterion`), and re-[configure](#configuration) the build with testing enabled (`--enable-tests` or `-DBUILD_TESTING=ON`). After that use the command below:

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

**Note:** For more information read the [[run first|dev-run-first]] guide and the {{ site.product.short_name }} [[documentation|adm-guide]]
{: .notice}
