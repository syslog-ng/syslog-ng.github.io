---
title: 'Hypr Audit Trail and Hyper App Audit Trail'
short_title: hype-audit
id: adm-src-hypr
description: >-
    This source is available in syslog-ng OSE 4.2 and later versions. Using this source syslog-ng OSE can fetch events from the Hypr REST API using the following drivers:
---
* `hypr-audit-trail()`: is a source driver that pulls messages from the Hypr API, associated to any RP Application ID.
* `hypr-app-audit-trail()`: is a source driver that pulls messages from the Hypr API, but only those associated to a specific RP Application ID.

**Note:** Applications that are registered after syslog-ng is started are not recognized.
{: .notice--info}

## Hyper Audit Trail

The `hypr-audit-trail()` source queries the Hypr API for the list of potential applications at startup, then monitors the audit trail for each of the detected applications.

To follow audit trails restart syslog-ng.

### Example: hypr-audit-trail minimal configuration

```config
source s_hypr {
    hypr-audit-trail(
        url('https://<custom domain>.hypr.com')
        bearer-token('<base64 encoded bearer token>')
    );
};
```

### Example: hypr-audit-trail detailed configuration

```config
source s_hypr {
    hypr-audit-trail(
        url('https://<custom domain>.hypr.com')
        bearer-token('<base64 encoded bearer token>')
        page-size(<number of results to return in a single page>)
        initial-hours(<number of hours to search backward on initial fetch>)
        application-skip-list('HYPRDefaultApplication', 'HYPRDefaultWorkstationApplication')
        log-level('INFO')
        flags(<optional flags passed to the source>)
        ignore-persistence(<yes/no>)
    );
};
```
## Hypr App Audit Trail

The `hypr-app-audit-trail()` monitors the audit trail for one specific RP Application ID. This driver requires the `rp-app-id()` parameter in order to operate.

## Acknowledgements

These chapters are based on the hypr-audit-trail() content, written by Dan Elder.