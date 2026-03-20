This parser does not have a default prefix. To configure a custom
prefix, use the following format:

```config
parser {
    {{ page.parser }}-parser
        ... other options ...
        (prefix("myprefix.")
    );
};
```
