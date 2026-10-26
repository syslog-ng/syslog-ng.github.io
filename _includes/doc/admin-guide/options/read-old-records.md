## read-old-records()

| Accepted values: | `no`, `yes`                                      |
| Default:         | `{{ include.read_old_records | default: "no" }}` |

{% if page.driver == 'file' or page.driver == 'wildcard-file' %}
*Description:* Controls where {{ site.product.short_name }} starts reading a regular file when no saved position exists in the persist file.

- `no`: Skip the existing content and read only messages appended after the file is opened.
- `yes`: Read the file from the beginning.

A saved position takes precedence over this option: if a position exists in the persist file, reading resumes from that position with either value. With `read-old-records(no)`, the skipped end-of-file position is saved even if no new messages arrive before shutdown, so messages appended while {{ site.product.short_name }} is stopped can be read after restart.

{% if page.driver == 'wildcard-file' %}
For wildcard-file(), `read-old-records(no)` only skips existing content in files whose readers are created during source initialization. Files discovered later are read from the beginning unless a saved position exists. This also applies to files in subdirectories discovered later when `recursive(yes)` is enabled.

If max-files() delays starting a reader for a file found during source initialization, the file is read from the beginning when a reader becomes available, unless a saved position exists. This exception also reads the old content, even with `read-old-records(no)`, to avoid skipping records appended while the file was waiting.
{: .notice--primary}
{% endif %}
{% else %}
*Description:* If read-old-record() is set to `yes`, {{ site.product.short_name }} will start fetching from the oldest available message; otherwise, it will start from the newest one (if no bookmarks are present, or ignore-saved-bookmarks() is set to `yes`).
{% endif %}
