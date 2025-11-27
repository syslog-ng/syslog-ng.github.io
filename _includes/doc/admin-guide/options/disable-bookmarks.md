## disable-bookmarks()

| Type:     | boolean |
| Default:  | no |

*Description:* This option prevents {{ site.product.short_name }} from storing a bookmark (such as position or offset) in its persist file for the last processed message.

**NOTE:** This will not prevent usage of an already presented bookmark entry, for ignoring those bookmark entries specify `ignore-saved-bookmarks(yes)` as well.
{: .notice--info}