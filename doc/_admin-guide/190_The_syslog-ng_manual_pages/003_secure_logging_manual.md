---
title: The secure-logging manual page
id: adm-man-sec-log
---

## Name

`secure-logging` --- Provides forward integrity and confidentiality for system logs.

## Synopsis

```config
$(slog --key-file <host key file> --mac-file <MAC file> $RAWMSG)
```

## Description

Secure logging is an extension of syslog-ng OSE which provides system log forward integrity and confidentiality. It is implemented in form of a module and is configured as a template in the syslog-ng OSE configuration file.

The main objective of the secure logging module is to provide tamper evident logging, for example to adequately protect log records of a system and to provide a sensor indicating breach-attempts. The secure logging module achieves this by the authentical encryption of each log record with an individual cryptographic key used only once and protecting the integrity of the whole log archive by a cryptographic authentication code. Every attempt to tamper with an individual log record or the log archive itself is immediately detected during log archive verification. Due to this, an attacker can no longer tamper with log records without being detected.

To use the log file created by the secure logging module for analysis, the log file must first be decrypted and its integrity must be verified. This is achieved with a command line utility that is part of the secure logging module and is installed as part of the syslog-ng OSE package. This utility can be integrated into the import module of existing analysis environments.

The secure logging environment uses a cryptographic key for encrypting log entries. Individual log entries are encrypted with their own keys which are immediately discarded after successful encryption to provide forward integrity. An efficient algorithm generates the key for the next log entry based the key used for encrypting the previous log entry. The resulting chain of keys preserves forward integrity, for example a potential attacker cannot deduce the previous key from the current key.

To optimize log verification and analysis, a sequence number is added to each log entry. The sequence number is also added to the encryption key creating a one-to-one correspondence of the encryption key with the log entry. In order to prevent truncation attacks or deletion of individual log entries, a message authentication code (MAC) is iteratively applied to the complete log archive and stored in a separate file. It is used upon verification to check the integrity of the whole log archive.

The follwoing is an example of three short original log messages that are sent to a destination with secure logging enabled:

```
This is a log message
And here comes another log message
This is a log message with a longer text that is processed without any problems
```

To identify the status of the secure logging environment, check the sequence counter by querying the key file with the `slogkey` utility:

```config
user@host:~> slogkey --counter /etc/syslog-ng/host.key 
counter=3
```

The numbering of log messages starts at zero, due to this, the counter is set to three after processing three messages.

The output of the secure logging template for the three example messages is shown below. The sequence number that was prepended to each message can be observed. The colon indicates the end of the sequence number and the start of the original message. As three message were processed, the sequence counter of the key is also three.

```
AAAAAAAAAAA=:k3/dYpLsgO2tUJKSauo6dycIBzW6OTC3pyA9TP+7AnqFgEojBzgC2rcK4OPfRtr8yg==
AQAAAAAAAAA=:smw0ATISVgN+BYEu5d7OLBE7aQhHpK9Ro4MndmNgSVrqhcmRCBCj6DUnD6ku0Z29CKJ0N6LAJUgByX4Ev+g=
AgAAAAAAAAA=:5UVybnKL1EAbgC4CLfd8HpgurjREf4LEN61/yWHSD2hbXjRD4QmQdtbwguT1chzdItKSQASps9QRIvR5Jd4AHzHfqxI4aRgdUBcNbAq26nwUCg5vPWygjmbtQaxZgCJYkry8slxCigmbTVs=
```
The following is the output of a successful verification run:

```
0000000000000000: This is a log message
0000000000000001: And here comes another log message
0000000000000002: This is a log message with a longer text that is processed without any problems
```
The original log messages have been successfully restored, and the sequence counters are also assigned to the clear text messages. This helps in analyzing problems within a particular log entry. As real log files will contain thousands of entries. The sequence counter helps to identify faulty entries.

Before the secure logging module can be used as part of an existing syslog-ng OSE installation, several preparatory activities are necessary.

## Key Generation

To bootstrap the system, an initial key (`k0`) must be created and installed on the log host before secure logging environment is started for the first time.

The initially created host key (`k0`) has its counter set to `0` marking it as the initial host key. This host key must be kept secret and it cannot be disclosed to third any parties. It is required to successfully decrypt and verify log archives processed by the secure logging environment. As each log entry is encrypted with its own key, a new host key will be created after successful processing of a log entry and replaces the previous key. Therefore, the initial host key needs to be stored in a safe place before starting the secure logging environment, as it is deleted from the log host after processing of the first log entry. The following steps must be done before starting the secure logging environment. Steps 1 and 2 are performed with the slogkey utility. See the slogkey.1 manual page for details on how to generate a master key and to derive a host key from it. Step 3 and 4 depend on the actual deployment in a target environment.
1. Create a master key.
2. Derive an initial host key (`k0`) from the master key (`key1`). Store the `k0` key in a safe location that is outside of the log host.
3. Deploy `k0` on the log host, where the secure logging module is to be used.

## Configuration

Secure logging can be configured by adding corresponding statements to the `syslog-ng.conf` file.

Secure logging is implemented as a template and is configured accordingly. Apart from the actual template configuration, no other setting is required to activate secure logging. 

Secure logging is activated by adding the following statement in the configuration file:

```config
template("$(slog --key-file  <host key file> --mac-file <MAC file> $RAWMSG)\n");
```

The purpose of the elements within the statement:
* `slog`

    The name of the secure logging template function. This name can be also be found by calling syslog-ng with the `--module-registry` arguments and checking the `template-func` property of the secure logging module in the corresponding output.

* `--key-file` or `-k`

    The host key file. `<host key file>` is the full path of the file storing the host key on the log host. If this arguments is not supplied or does not point to a valid key file, syslog-ng does not start and a displays an error message.

* `--mac-file` or `-m`

    The MAC file. `<MAC file>` is the full path of the MAC file on the log host. The file is automatically created upon the initial start. If the path is not correct, syslog-ng does not start and a displays a corresponding error message.

* `$RAWMSG`

    `$RAWMSG` provides access to the original log message received at the source. This macro is only available if the store-raw-message flag was set for the source. Otherwise, an empty string is passed to the secure logging template. If access to the original message is not available, for example, if the source does not support the `store-raw-message` flag, then the `$MSG` macro can also be used. In this case, however, the integrity guarantee provided by secure logging is limited to the content that this macro provides and does not protect the complete original message.

* `\n`

    `\n` is a line separator and its use is important, as the secure logging template expects log entries to be separated. When detecting a line separator, the log entry is regarded as complete and is encrypted with the current host key. Therefore, only a single line separator is allowed.

The secure logging template can be combined with any source or destination with the following limitations:

* Sources must be line-oriented. Secure logging uses a line separator in order to distinguish between individual log entries. Sources which provide data in a different format, for example, in the form of raw data obtained directly from a database system, cannot currently be used with the secure logging template, as the separation of log entries is not clearly defined for this type of data.
* Only sources for which the store-raw-message flag is implemented and set do benefit from the integrity guarantee provided by the secure logging template. Secure logging aims at protecting the integrity of complete log messages including all associated meta-data, such as timestamps and host names. syslog-ng parses the log message into its internal format and provide easy access to parts of a message through macros. While this is convenient when rewriting log messages, it is not helpful for secure logging. syslog-ng provides the store-raw-message flag which provides access to a copy of the original log message after parsing. This is the log message processed and protected by the secure logging template. If the source does not support the `store-raw-message flag`, then the `$MSG` macro can also be used. However, in this case the integrity guarantee provided by secure logging is limited to the content that this macro provides.
* Log rotation of any kind cannot be used with destinations using secure logging, because log rotate overwrites or deletes previous log files. This compromises the cryptographic chain of trust of the log entries preve recovery. To efficiently handle log files, the secure logging environment features iterative verification. Using iterative verification, a log file can be verified in steps. For this to work, the log file must first be downloaded from the log host, together with the corresponding host key and MAC file to a verification host. After downloading, the log file can be safely deleted from the log host. Verification is then performed on the verification host using the iterative mode of the slogverify utility.

### Example: secure logging template on a file destination

```config
#############################################
# Minimal syslog-ng.conf file with secure logging enabled. Encrypted log
# entries are logged to a single file called /var/log/messages.slog
#

@version: 4.4
@include "scl.conf"

source s_local {
    system();
    internal();
};

source s_network {
    network(
        transport("udp")
        port(514)
        flags(store-raw-message)
    );
};

# Secure logging template definition
template secure_logging { 
    template("$(slog --key-file /etc/syslog-ng/host.key --mac-file /etc/syslog-ng/mac.dat $RAWMSG)\n");
};

# This configures a secure logging destination
destination d_local {
    file("/var/log/messages.slog" template(secure_logging));
};

log {
    source(s_local);

    # This source has the raw message flag set
    source(s_network);

    # This statement activates secure logging for this destination
    destination(d_local);
};
```

## Log verification

To analyze the log file created in a secure logging environment, the log files must be decrypted and their integrity be verified. Verification requires both the initial host key (`k0`) and the corresponding MAC file and is performed with the slogverify utility. It is not normally performed on the log host where the secure logging environment is producing log data. In a typical deployment, log files would be retrieved from the log host and transferred to a central log collector where verification it performed. As verification requires the use of  `k0`, it should only be performed in a trusted environment.

### Normal mode

In normal mode, a complete log archive is verified at once. In a typical environment, this would mean retrieving a log file together with is MAC file from a log host and retrieving the corresponding initial key `k0` from a safe location and supplying them to the slogverify utility. A typical call sqeuence for normal mode is presented in the following example:

```config
slogverify --key-file host0.key --mac-file mac.dat /var/log/messages.slog /var/log/verified/messages
```

The purpose of the elements within the statement:

* `host0.key`

    The initial host key (`k0`). Supplying `k0` is enough for decrypting all log entries, as the key derivation algorithm is able to generate the necessary keys for all subsequent log entries based on `k0`.

* `mac.dat`

    The MAC file from the log host.

* `/var/log/messages.slog`

    The file containing the encrypted log entries as retrieved from a log host.

* `/var/log/verified/messages`

    The file receiving the plain text log after decryption.

Log files may become too large and not fit into the system memory. Verification is therefore performed in chunks. Each part of the log file is transferred to an internal buffer on which verification is performed. After the buffer has been processed, the next chunk is fetched. An optional buffer argument can be supplied to the slogverify utility in order to change the default buffer size of 1000 log entries to a number suitable for the system on which the verification is performed, for example:

```config
slogverify --key-file host.key --mac-file mac.dat /var/log/messages.slog /var/log/verified/messages 8000
```

For more information on verification in normal mode, [[slogverify|adm-man-slogkey]].

### Iterative mode

Verification in normal mode may not be suitable for some application scenarios. Many log hosts use log rotation in order to preserve storage space. In log rotation, a threshold for the maximum amount of storage space and the number of generations is defined for different type of log files. When either storage space is exhausted or the number of generations is reached, the oldest log file is overwritten by new incoming log data. This procedure is not possible in secure logging environment, as overwriting, i.e. deleting a log file would break the cryptographic chain that is established between the log entries. This comes as no surprise, as one of the main objectives of secure logging is to protect against deletion of log entries by a potential attacker.

To enable a procedure similar to log rotation, the secure logging environment features an iterative mode. In iterative mode, log files can be split into different files and each of these files can be verified separately. Take care when performing verification in iterative mode, as each of the different log files needs to be accompanied by a copy of the host key and the MAC files present on the system at the time of retrieval. A typical usage scenario for the iterative mode is presented in the following steplist:

1. Define a storage threshold for the secure logging file destination. In this example a 500MB threshhold is defined.
2. Let the secure logging environment produce log data that is written to the destination up until the allocated 500MB is reached.
3. Stop the secure logging environment and retrieve the log file, the host key and the MAC files from the log host.
4. Delete the log file on the log host but leave host key and MAC file untouched.
5. Restart the secure logging environment.
6. Perform verification in iterative mode with the log file, the host key and the MAC that was retrieved.

Steps 2-6 have to repeated each time the log file reaches a size of 50 MB. Assuming that the log file parts are named after the iteration, for example `log.1`, `log.2`, `log.3`, etc. and a similar convention is applied to the host keys and MAC files, a typical call sequence for the validation of a log file part in iterative mode after three iterations looks like this:

```config
slogverify --iterative --prev-key-file host.key.2 --prev-mac-file mac.dat.2 --mac-file mac.dat /var/log/messages.slog.3 /var/log/verified/messages.3
```

The purpose of the elements within the statement:

* `host.key.2`

    The host key from the previous iteration. In this example, this is the second iteration.

* `mac.dat.2`

    The MAC file from the previous iteration. In the example, verification is performed during the third iteration, so the MAC file from the second iteration is required.

* `mac.dat`

    The current MAC file from the log host.

* `/var/log/messages.slog.3`

    The file element containing the encrypted log entries as retrieved from the log host during the third iteration.

* `/var/log/verified/messages.3`

    The file receiving the plain text log after decryption during the third iteration.

In a real deployment, the above steps would typically be automated using a scripting engine. See [[slogverify|adm-man-slogver]] for details on verification in iterative mode.

## Files

`/usr/bin/slogkey`

`/usr/bin/slogencrypt`

`/usr/bin/slogverify`

`/etc/syslog-ng.conf`

## Additional Information

* The syslog-ng.conf manual page
* The slogkey manual page
* The slogencrypt manual page
* The slogverify manual page
