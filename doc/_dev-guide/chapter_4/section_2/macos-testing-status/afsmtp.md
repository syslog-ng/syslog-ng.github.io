---
title: afsmtp
description: >-
  The smtp() driver sends email messages triggered by log messages. The smtp()
  driver uses SMTP, without needing external applications.
id: dev-macos-mod-sup-afsmtp
---

### Status

| Architecture |    Status    |
| :----------: | :----------: |
|      x86     | Doesn't Work |
|      ARM     | Doesn't Work |

### Root Cause

This driver has a dependency on the libesmtp driver. However, this driver does not compile on the latest version of macOS.
