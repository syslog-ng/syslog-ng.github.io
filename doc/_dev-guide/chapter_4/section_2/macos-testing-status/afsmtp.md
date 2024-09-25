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
|      x86     |     Works    |
|      ARM     |     Works    |

### Testing <a href="#testing" id="testing"></a>

**AFSMTP Setup**

To test this driver, we need to set up AFSMTP first. You can use MacPorts to install all the necessary dependencies.

To be able to successfully test this driver, we need to install libesmtp, for that, we can do the following:

`$ sudo port install libesmtp`

**Note:** HomeBrew does not have this library in its package list currently
{: .notice--info}
