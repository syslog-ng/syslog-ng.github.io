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

**Note:** The guide is tested on ARM macOS Sonoma 14.2.1, Ventura 13.4, and Intel macOS Monterey 12.6.6 machines, we do our bests to keep it update, but your actual system may require additional steps or slightly different settings.
{: .notice}

## Compiling from source

Like every project {{ site.product.short_name }} also uses different libraries and build-systems that must be installed for compiling and running properly. These dependencies can be satisfied by compiling every-each libs and tools manually, but it might be preferred to do it the easy way. Homebrew is a package manager for macOS that has great community and support. You can also use it to install the dependencies you need.

### Dependencies

1. [[Install Homebrew|dev-inst-macos#homebrew]] on your system.

   **Hint:** Don't forget to set up the homebrew environment, follow the instructions in your terminal! [[Here|homebrew-inst-detailed]] you can find an even more detailed instruction about the topic.
   {: .notice--info}

   **Note:** This will install **Command Line Tools for Xcode** as well if not already presented on the system that would also be required anyway for a seamless {{ site.product.short_name }} build.
   {: .notice}

2. Perform `brew update` if you have not done it yet.
3. The following packages should be installed for syslog-ng:
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
   * openssl
   * pcre2
   * pkg-config
4. The following package might be needed too depending on your macOS version and architecture:
   * net-snmp
5. The extra modules would require the following
   * hiredis
   * ~~libdbi~~ - See bellow!
   * libmaxminddb
   * libnet
   * libpaho-mqtt
   * librdkafka
   * mongo-c-driver
   * python3
   * rabbitmq-c
   * riemann-client
6. Extra tools you might require
   * criterion
   * ~~gcc@11~~ - See bellow!

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
    # cmake - Optional, a better replacement of autotools making system
    flex \
    glib \
    ivykis \
    json-c \
    libtool \
    net-snmp \
    openssl \
    pcre2 \
    pkg-config \
    # Optional {{ site.product.short_name }} module dependencies
    hiredis \
    # Do not use the homebrew provided one, see bellow!
    # libdbi 
    libmaxminddb \
    libnet \
    libpaho-mqtt \
    librdkafka \
    mongo-c-driver \
    python3 \
    rabbitmq-c \
    riemann-client
    # Optional development modules
    # criterion - Optional, needed for unit testing
    # gcc@11 - Optional, clang now should compile all modules nicely and it is the oficially supported compiler on macOS
```

> **Note:**
>
> * bison is required to be installed when using homebrew, because the options provided by Apple Developer Tools are incomplete. (for example: missing -W option) The reason is why bison is ?>required to be installed from homebrew is that the -W option is supported only after 2.3.
> * net-snmp might be needed as well when using homebrew, because the options provided by Apple Developer Tools are bogus a bit. The reason is why net-snmp might be required from homebrew is that the by default provided pkgconfig might give back bogus lib and include values.
> * openssl - since macOS provides LibreSSL by default, you might need to expand the search path of pkg-config to find the freshly installed openSSL, see bellow. (seems it was an issue only with 1.1.x version of openssl)
> * libdbi and libdbi-drivers are [[maintained and updated|dev-macos-mod-sup-afsql#dependencies]] in {{ site.product.short_name }} repositories, use the latest master version from there
> * actual state of supported features, and the required dependencies can also be found [[here|dev-macos-mod-sup-status]].
{: .notice}

### Preparations

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

3. Extend the search path of pkg-config to use the homebrew version of openssl, net-snmp and pkgconfig

   ```shell
   export PKG_CONFIG_PATH=${HOMEBREW_PREFIX}/opt/openssl/lib/pkgconfig:${HOMEBREW_PREFIX}/opt/net-snmp/lib/pkgconfig:${HOMEBREW_PREFIX}/lib/pkgconfig:${PKG_CONFIG_PATH}
   ```

4. Some of the modules will not, or will incorrectly provide pkg-config support (even if added to PKG\_CONFIG\_PATH, e.g. libmaxminddb), to help the automatic configurations find them you can add brew to `CFLAGS`, `CPPFLAGS`, and `LDFLAGS`

   ```shell
   export CFLAGS="-I${HOMEBREW_PREFIX}/include/ ${CFLAGS}"
   export CPPFLAGS="${CFLAGS} ${CPPFLAGS}"
   export LDFLAGS="-L${HOMEBREW_PREFIX}/lib ${LDFLAGS}"
   ```

   **Note:** It could also happen that you must provide here further library inlcude and lib paths, e.g. for openssl 1.1.x, etc.
   {: .notice}

### Getting the source

To get the latest master from {{ site.product.short_name }} git you can use

```shell
cd YOUR_PREFERRED_WORKING_DIR   # Replace `YOUR_PREFERRED_WORKING_DIR` with your actual preferred working dir 
git clone https://github.com/syslog-ng/syslog-ng . 
```

### Select the compiler

Latest version of {{ site.product.short_name }} [has dropped support of gcc](https://github.com/syslog-ng/syslog-ng/pull/4897), so now the platform default llvm/clang must be used to complie the source.\
`gcc` still might compile most of syslog-ng and its modules, but there is no guarantie and support of it anymore (HINT: you can turn off any problematic module via is feature switch)

To make sure clang is used you can use (optional):

```shell
export CC=clang
export CXX=clang++
```

### Configuration

#### Using autotool

```shell
./autogen.sh

# it is always a good idea keeping as clean the source folder as pissible, so
# use a dedicated build folder for easier cleanup
mkdir build; cd build

# you might want to use --prefix /example/installdir/ as well, see bellow
../configure --with-ivykis=system --with-systemd-journal=no --disable-java --disable-java-modules
```

**Warning:** By a good chance, you might want to install the self built instance first to a custom location to prevent overwriting a possibly already existing brew installation version. In that case pass `--prefix /full_path_of/installdir/` to the `configure` script in the above steps.
{: .notice--danger}

For a full (urrently supported) feature set you can add further configure flags (excluded the not yet supported modules on macOS), for example

```shell
../configure --enable-all-modules --with-ivykis=system --with-systemd-journal=no --disable-java --disable-java-modules --disable-smtp --disable-pacct
```

> **Note:**
>
> * for various reasons not all modules can be configured, built and used on all macOS versions and architectures
> * for using all the available modules you might have to install further dependencies
{: .notice}

For more details please see the [[actual state of supported features|dev-macos-mod-sup-status]], and the required [dependencies](#dependencies).

#### Using cmake

For the full feature set you can use

```shell
cmake --install-prefix /full_path_of/installdir -B build . -Wno-dev -DIVYKIS_SOURCE=system -DENABLE_JAVA=OFF -DENABLE_JAVA_MODULES=OFF -DENABLE_PYTHON=ON -DENABLE_PYTHON_MODULES=ON -DBUILD_TESTING=OFF -DENABLE_AFSMTP=OFF -DENABLE_PACCT=OFF -DENABLE_CPP=ON -DENABLE_GRPC=ON --fresh
```

### Compile and install

#### autotools

```shell
# add AM_DEFAULT_VERBOSITY=1 before -j4 option for detailed compilation logging
make -j4
make install

# or, in a single line
# make -j4 install
```

#### cmake

```shell
# add -v as well for detailed compilation logging
cmake --build build/. --target install -j4
```

### Testing

In order to run the tests, you have to install first the Criterion testing framework (for example: `brew install criterion`), and re-[configure](#configuration) the build with testing enabled. After that use the command below:

```shell
make check -j4
```

**Note:** For more read [[testing|dev-testing]] guide.
{: .notice}

### Run

```markdown
`/full_path_of/installdir`/syslog-ng -F
```

**Note:** For more information read the [[run first|dev-run-first]] guide and the {{ site.product.short_name }} [[documentation|adm-guide]]
{: .notice}
