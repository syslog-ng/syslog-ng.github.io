By default, {{ page.parser }}-parser() uses the .{{ page.prefix | default: page.parser }}. prefix. To modify it, use
the following format:

```config
parser {
    {{page.parser}}-parser(prefix("myprefix."));
};
```
