## read-old-records()

| Accepted values: | `yes`, `no` |
| Default:         | `no`        |

*Description:* If read-old-record() is set to `yes`, {{ site.product.short_name }} will start fetching from the oldest available message; otherwise, it will start from the newest one (if no bookmarks are present, or ignore-saved-bookmarks() is set to `yes`).
