## persist-name()

|  Type:|      string|
  |Default:|   N/A|

*Description:* If you receive the following error message during
{{ site.product.short_name }} startup, set the persist-name() option of the duplicate
drivers:

> Error checking the uniqueness of the persist names, please override it with persist-name option. Shutting down.

or

> Automatic assignment of persist names failed, as conflicting persist names were found. Please override the automatically assigned identifier using an explicit persist-name() option or remove the duplicated configuration elements.

This error happens if you use identical drivers in multiple sources, for
example, if you configure two file sources to read from the same file.
In this case, set the persist-name() of the drivers to a custom string,
for example, **persist-name("example-persist-name1")**.
