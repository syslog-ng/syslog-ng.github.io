---
title: Password-protected keys
id: adm-tls-keys
description: >-
    Starting with syslog-ng OSE version 3.14, you can use password-protected
    private keys in the network() and syslog() source and destination
    drivers.
---

## Restrictions and limitations

- ![]({{ site.baseurl}}/assets/images/caution.png) **CAUTION:**
    *Hazard of data loss!* If you use password-protected keys,
    you must provide the passphrase of the password-protected keys every
    time syslog-ng OSE is restarted (syslog-ng OSE keeps the passphrases
    over reloads). The sources and destinations that use these keys will
    not work until you provide the passwords. Other parts of the
    syslog-ng OSE configuration will be unaffected.
    {: .notice--danger}

    This means that if you use a password-protected key in a
    destination, and you use this destination in a log path that has
    multiple destinations, neither destinations will receive log
    messages until you provide the password. In this cases, always
    [[use disk-based buffering to avoid data loss]].

- The path and the filename of the private key cannot contain
    whitespaces.

- Depending on your platform, the number of passwords syslog-ng OSE
    can use at the same time might be limited (for example, on Ubuntu
    16.04 you can store 16 passwords if you are running syslog-ng OSE as
    a non-root user). If you use lots of password-protected private keys
    in your syslog-ng OSE configuration, increase this limit using the
    following command: `sudo ulimit -l unlimited`

## Providing the passwords

The syslog-ng-ctl credentials status command allows you to query the
status of the private keys that syslog-ng OSE uses in the network() and
syslog() drivers. The command returns the list of private keys used, and
their status. For example:

```bash
syslog-ng-ctl credentials status
```

>Secret store status:  
>/home/user/ssl_test/client-1/client-encrypted.key SUCCESS

If the status of a key is PENDING, you must provide the passphrase for
the key, otherwise syslog-ng OSE cannot use it. The sources and
destinations that use these keys will not work until you provide the
passwords. Other parts of the syslog-ng OSE configuration will be
unaffected. You must provide the passphrase of the password-protected
keys every time syslog-ng OSE is restarted.

The following log message also notifies you of PENDING passphrases:

>Waiting for password; keyfile='private.key'

You can add the passphrase to a password-protected private key file
using the following command. syslog-ng OSE will display a prompt for you
to enter the passphrase. We recommend that you use this method.

```bash
syslog-ng-ctl credentials add --id=<path-to-the-key>
```

Alternatively, you can include the passphrase in the \--secret
parameter:

```bash
syslog-ng-ctl credentials add --id=<path-to-the-key> --secret=<passphrase-of-the-key>
```

Or you can pipe the passphrase to the syslog-ng-ctl command, for
example:

```bash
echo "<passphrase-of-the-key>" | syslog-ng-ctl credentials add --id=<path-to-the-key>
```

For details on the syslog-ng-ctl credentials command, see
[[The syslog-ng control tool manual page]].
