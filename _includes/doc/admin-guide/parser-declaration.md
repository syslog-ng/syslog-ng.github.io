```config
@version: 3.38
@include "scl.conf"

log {
    source { system(); };
    parser { {{ page.parser }}-parser(); };
    destination { ... };
};
```
