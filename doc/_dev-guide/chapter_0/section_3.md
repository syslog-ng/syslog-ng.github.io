---
title: macOS
id: dev-inst-macos
description:  >-
   The {{ site.product.short_name }} application has been resurrected on macOS by our developer team.
   We hope our product can be useful for Mac users who want to increase the
   security of their system through reliable logging.
---

At present we are not supporting macOS {{ site.product.short_name }} on our [[official repository|gh-syslog-ng]] on GitHub. However, you can install pre-built {{ site.product.short_name }} binaries from various sources or can compile yourself following [[this guide|dev-platform-build-macos#compiling-from-source]].

If you want to install {{ site.product.short_name }} on macOS you can use multiple packaga managers like Homebrew or MacPorts

### Using Homebrew

First, check [[this|dev-platform-build-macos#dependencies]] if you have not got Homebrew installed and pre-configured yet.

Homebrew has now different home directories on ARM and X86 systems, also the location could depend on your macOS version. We will reference to its home directory as `${HOMEBREW_PREFIX}` in this document, as if you follow the installation instructions above it will be set already correctly independenty of your system.

**Hint**: you can use `export HOMEBREW_PREFIX=$(brew --prefix)` in your scripts or shell environments to get and reference the actual location of your homewbrew installation
{: .notice--info}

#### Checking dependencies

The {{ site.product.short_name }} package on macOS in homebrew is organized into a formula called `syslog-ng`.

For checking [[dependencies|dev-platform-build-macos#dependencies]] of it you can use

```shell
brew deps syslog-ng
```

This will list all the required dependencies are needed to run {{ site.product.short_name }}, and homebrew would install automatically as needed.

#### Installation

Using homebrew it is simple, use

```shell
brew install syslog-ng
```

This command line refers to the latest distribution of {{ site.product.short_name }} versions at the time of writing, and usually updated quickly by the homwbrew crew after a new release.

#### Starting syslog-ng

You can start `syslog-ng` many ways in foreground, e.g. in a terminal window

```shell
${HOMEBREW_PREFIX}/sbin/syslog-ng -F
```

this will start it as a foreground process in the terminal and write only minimal information to the console during its run.

To see more details you can specify some debug flags, like

```shell
${HOMEBREW_PREFIX}/sbin/syslog-ng -Fdevt
```

this will give you detailed information of what {{ site.product.short_name }} does.

### Using MacPorts

First, check [[this|dev-platform-build-macos#dependencies]] if you have not got MacPorts installed and pre-configured yet.

The installation location of MacPorts will be referenced as `${MACPORTS_PREFIX}` in this document. If you follow the installation instructions above, it will already be set correctly, regardless of your system.
**Hint**: you can use `export MACPORTS_PREFIX=/opt/local` in your scripts or shell environments to get and reference the actual location of your MacPorts installation
{: .notice--info}

#### Checking dependencies in MacPorts

For checking [[dependencies|dev-platform-build-macos#dependencies]] of it you can use

```shell
port deps syslog-ng-devel
```

**Note**: there is a `syslog-ng` package as well in MacPorts, the one with `-devel` suffix is usually a more fresh version.
{: .notice--info}

This will list all the required dependencies are needed to run {{ site.product.short_name }}, and MacPorts would install automatically as needed.

#### Installation via MacPorts

Using MacPorts it is simple, use

```shell
port install syslog-ng-devel
```

This command line refers to the latest distribution of {{ site.product.short_name }} versions at the time of writing, and usually updated quickly by the homwbrew crew after a new release.

#### Starting syslog-ng which installed from MacPorts

You can start `syslog-ng` many ways in foreground, e.g. in a terminal window

```shell
${MACPORTS_PREFIX}/sbin/syslog-ng -F
```

this will start it as a foreground process in the terminal and write only minimal information to the console during its run.

To see more details you can specify some debug flags, like

```shell
${MACPORTS_PREFIX}/sbin/syslog-ng -Fdevt
```

this will give you detailed information of what {{ site.product.short_name }} does.

### Running {{ site.product.short_name }} as daemon

> **Note:**
>
> Below examples use `YOUR_INSTALLATION_ROOT` which is depending on the package manager you used to install {{ site.product.short_name }}.
{: .notice}

You can start it manually as a backround daemon

```shell
YOUR_INSTALLATION_ROOT/sbin/syslog-ng
```

however this is not a persistent state, after a system restart {{ site.product.short_name }} will not start automatically by default.

To run it as a daemon that will automatically start at system startup and is kept alive you can use `launchd`

You can find several pages about `launchd` and how to add System or User Launch Daemons, Agents to macOS like [[this|freepascal-launchd]], the official [[Apple Developer page|apple-launchd]], or simply `man launchd`, `man launchctl`, and `man launchd.plist`

#### Basic example of how to run it as a System Daemon

1. Create the following .plist file

   ```config
   <?xml version="1.0" encoding="UTF-8"?>
   <!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
   <plist version="1.0">
   <dict>
       <key>Label</key>
       <string>com.syslog-ng.daemon</string>
       
       <key>RunAtLoad</key>
       <true/>
       <key>KeepAlive</key>
       <true/>
       
       <key>ProgramArguments</key>
       <array>
          <string>YOUR_INSTALLATION_ROOT/sbin/syslog-ng</string>
          <string>-F</string>
       </array>

       <key>StandardOutPath</key>
       <string>YOUR_INSTALLATION_ROOT/var/log/syslog-ng-daemon.stdout.log</string>
       <key>StandardErrorPath</key>
       <string>YOUR_INSTALLATION_ROOT/var/log/syslog-ng-daemon.stderr.log</string>
   </dict>
   </plist>
   ```

2. name it e.g. `com.syslog-ng.daemon.plist`, and move it to `/Library/LaunchDaemons`
3. Set proper rights on the plist file

   ```shell
   sudo chown root:wheel /Library/LaunchDaemons/com.syslog-ng.daemon.plist
   sudo chmod 600 /Library/LaunchDaemons/com.syslog-ng.daemon.plist
   ```

That's all, macOS Launchd will take care of the rest, will start and keepalive the daemon after the next system restart

To start the new daemon immediately without machine restart you can use

```shell
sudo launchctl load -w /Library/LaunchDaemons/com.syslog-ng.daemon.plist
```

To stop it you can use

```shell
sudo launchctl unload -w /Library/LaunchDaemons/com.syslog-ng.daemon.plist
```
