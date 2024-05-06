---
title: Commercial version of syslog-ng
id: adm-conc-comm
description: >-
  The syslog-ng application has a commercial version available, called
  syslog-ng Premium Edition (syslog-ng PE). The commercial version comes
  with well-tested features from its open source foundation, a number of
  extra features, enterprise-level support, as well as a ready-to-use log
  management appliance built on the strengths of syslog-ng Premium
  Edition.
---

## Exclusive features related to compliance

Collecting and analyzing log messages is required directly or indirectly
by several regulations, frameworks, and standards, including the
Sarbanes-Oxley Act (SOX), the Health Insurance and Portability Act
(HIPAA), and the Payment Card Industry Data Security Standard (PCI-DSS).
syslog-ng PE provides a set of features that help you comply with
regulations that require the central collection of log messages in a
tamperproof way:

- Logstore files enable you to store log messages securely in
    encrypted, compressed and timestamped binary files. From a
    compliance point of view, this serves a double purpose. Encryption
    guarantees the integrity of log messages so you can be sure that
    they have not been manipulated. Timestamping provides verifiable
    proof about the exact time when log messages arrived.

- Reliable Log Transfer Protocol (RLTP) is a proprietary transport
    protocol that prevents message loss during connection breaks. When
    using this protocol, the sender detects which messages the receiver
    has successfully received (based on the acknowledgments returned by
    the receiver after having processed messages). If messages are lost
    during transfer, the sender resends the missing messages, starting
    from the last successfully received message. Therefore, messages are
    not duplicated at the receiving end in case of a connection break.

## Wide range of supported platforms with binary installers

syslog-ng Premium Edition comes with tested binary files that are
available for a wide array of server platforms, reducing the time
required for installation and maintenance. Support for a wide range of
operating system and hardware platforms also make syslog-ng PE an ideal
choice to collect logs in massively heterogeneous environments.

## Enterprise-level support services

As all commercial software, syslog-ng PE also comes with various
enterprise-level support packages, which means that you get immediate
and pro-active assistance (24x7 if you choose a top-tier package),
dedicated to resolving your issue as soon as possible when you
experience problems.

For more information about syslog-ng Premium Edition, see
[The syslog-ng Premium Edition Administration Guide](https://support.oneidentity.com/syslog-ng-premium-edition/).

## syslog-ng Store Box, ready-to-use log management appliance

syslog-ng Store Box (SSB) is a log management appliance that is built on
syslog-ng Premium Edition. It is a turnkey solution to manage your log
data, meaning that no software installation is necessary. As SSB is
available both as a virtual machine and a physical appliance, it is also
easily scalable.

SSB provides a number of features that can add value for your use cases:

- A web GUI that makes searching logs, as well as configuring and
    managing SSB itself easy:

  - The search interface allows you to use wildcards and Boolean
    operators to perform complex searches, and drill down on the
    results. You can gain a quick overview and pinpoint problems
    fast by generating ad-hoc charts from the distribution of the
    log messages.

    In addition, you can easily create customized reports from the
    charts and statistics you create on the search interface to
    demonstrate compliance with standards and regulations such as
    PCI-DSS, ISO 27001, SOX and HIPAA.

  - Configuring SSB is done through the user interface. All of the
    flexible filtering, classification and routing features in the
    syslog-ng Open Source Edition and syslog-ng Premium Edition can
    be configured with it. Access and authentication policies can be
    set to integrate with Microsoft Active Directory, LDAP and
    Radius servers. The web interface is accessible through a
    network interface dedicated to management traffic. This
    management interface is also used for backups, sending alerts,
    and other administrative traffic.

- High availability support to ensure continuous log collection in business-critical environments.

For further details about syslog-ng Store Box, see 
[The syslog-ng Store Box Administration Guide](https://support.oneidentity.com/syslog-ng-store-box/).

## Upgrading from syslog-ng OSE to syslog-ng PE

If you wish to upgrade from syslog-ng OSE to syslog-ng PE, read the blog
post [Upgrading from syslog-ng OSE to syslog-ng PE](https://syslog-ng.com/blog/upgrading-from-syslog-ng-open-source-to-premium-edition/) for instructions and tips.
