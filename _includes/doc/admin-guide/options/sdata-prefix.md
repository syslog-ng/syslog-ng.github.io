## sdata-prefix()

|Type:|   string|
|Default:|           `.SDATA.`|

Available in {{ site.product.short_name }} 4.1 and later versions.

*Description:* Adds a specific string before the names of the parsed SDATA fields to store the name-value pairs created from the SDATA fields separately. Note that unless the value of `sdata-prefix` starts with `.SDATA.`, using this option excludes the parsed fields from the sdata and `rfc5424` scopes of the value pairs.
