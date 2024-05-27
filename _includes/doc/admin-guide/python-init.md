### init(self, options) method (optional)

The {{ site.product.short_name }} application initializes Python objects every time when
it is started or reloaded. The init method is executed as part of the
initialization. You can perform any initialization steps that are
necessary for your source to work.

{% include doc/admin-guide/warnings/python-reload.md %}

When this method returns with False, {{ site.product.short_name }} does not start. It
can be used to check options and return False when they prevent the
successful start of the source.

options: This optional argument contains the contents of the options()
parameter of the {{ site.product.short_name }} configuration object as a Python
dictionary.
