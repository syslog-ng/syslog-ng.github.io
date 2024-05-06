---
title: The slogkey manual page
id: adm-man-slogkey
---

## Name

`slogkey` --- Manages the cryptographic keys for use with the syslog-ng OSE secure logging environment.

## Synopsis

```
slogkey [options] [arguments]
```

## Description

The `slogkey` utility is used to manage cryptographic keys for use with the secure logging module of syslog-ng OSE. Use this utility to create a master key, derive a host key to be used by a secure logging configuration and to display the current sequence counter of a key. The options determine the operating mode and are mutually exclusive.

## Arguments

The arguments depend on the operating mode.

* Master key generation

    Call sequence: slogkey `--master-ḱey <filename>`

    `<filename>`: The name of the file to which the master key is written.

* Host key derivation

    Call sequence: `slogkey --derive-key <master key file> <host MAC address> <host serial number> <host key file>`

  * `<master key file>`: The master key from which the host key is derived.
  * `<host MAC address>`: The MAC address of the host on which the key is used. Instead of the MAC address, any other string that uniquely identifies a host can be supplied, for example the company inventory number.
  * `<host serial number>`: The serial number of the host on which the key is used. Instead of the serial number, any other string that uniquely identifies a host can be supplied, for example, the company inventory number.
  * `<host key file>`: The name of the file to which the host key is written.

  **NOTE:** The newly created host key has its counter set to `0` indicating that it represents the initial host key  `k0)`. This host key must be kept secret and not be disclosed to third parties. It is required to successfully decrypt and verify log archives processed by the secure logging environment. As each log entry is encrypted with its own key, a new host key is created after successful processing of a log entry and replaces the previous key. Therefore, the initial host key needs to be stored in a safe place before starting the secure logging environment, as it is deleted from the log host after processing of the first log entry.
  {: .notice--info}

  * Sequence counter display


## Options

* `--master-key` or `-m`

    Generates a mew master key. `<filename>` is the name of the file storing the newly generated master key.
* `--derive-key` or `-d`

    Derive a host key using a previously generated master key.
* `--counter` or `-c`

    Display the current log sequence counter of a key.
* `--help` or `-h`

    Display a help message.

## Files

`/usr/bin/slogkey`

`/etc/syslog-ng.conf`

## Additional Information

* The syslog-ng.conf manual page
* The secure-logging manual page 