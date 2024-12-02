By default, {{ page.parser }}() uses the .{{ page.prefix | default: page.parser }}. prefix. To modify it, use
the following format:

```config
parser {
    {{page.parser}}(prefix("myprefix."));
};
```
