### value-pairs() options

{% include doc/admin-guide/value-pairs-description.md show_value_pairs_options_link=false %}

The same selection mechanism is available in two forms:

- In a destination or another configuration option, use the `value-pairs()`
  syntax.
- In a template function such as `format-json()`, `format-welf()`, or
  `format-cef-extension()`, use the command-line-like `--` syntax.

For example, these configurations select the same two groups of data:

```config
mongodb(
    value-pairs(
        scope(rfc3164 rfc5424)
    )
);
```

```config
$(format-json --scope rfc3164,rfc5424)
```

#### Selecting data

Use `scope()` or `--scope` to select a predefined group of message data. The
following scopes are currently available:

| Scope | Contents |
| --- | --- |
| `nv-pairs` | Non-dot-prefixed name-value pairs. |
| `dot-nv-pairs` | Dot-prefixed name-value pairs. |
| `all-nv-pairs` | Both `nv-pairs` and `dot-nv-pairs`. |
| `rfc3164` | The macros associated with RFC 3164 messages. |
| `core` | Alias for `rfc3164`. |
| `base` | Alias for `rfc3164`. |
| `rfc5424` | The macros associated with RFC 5424 messages. |
| `syslog-proto` | Alias for `rfc5424`. |
| `all-macros` | All registered macros. |
| `selected-macros` | The selected built-in macros, including `TAGS`, `SOURCEIP`, and `SEQNUM`. |
| `sdata` | SDATA fields. |
| `everything` | All currently supported scopes. |

Scope names are separated by spaces in the `value-pairs()` configuration
syntax and by commas in the template-function syntax. An unknown scope causes
configuration or template parsing to fail. The `syslog` scope is not
currently available.

Use `key()` or `--key` to select individual names or name patterns:

```config
file("/var/log/messages.json"
     template("$(format-json --key PROGRAM --key .SDATA.*)\n"));
```

Use `exclude()` or `--exclude` to remove names or name patterns from the
selected data. Exclusions can be combined with scopes and keys:

```config
$(format-json --scope everything --exclude R_* --exclude S_*)
```

The patterns use the glob-matching rules supported by value-pairs. When a
name is selected by both an inclusion pattern and an exclusion pattern, the
exclusion determines whether the name is emitted.

#### Adding and transforming pairs

Use `pair()` to add a new name-value pair in the configuration syntax. The
value is a template:

```config
mongodb(
    value-pairs(
        pair("message_id" "${HOST}-${PID}")
    )
);
```

Use `--pair` in a template function. Its argument has the form
`name=template`:

```config
$(format-json --pair message_id="${HOST}-${PID}")
```

Use `key()` together with `rekey()` to transform the names of selected pairs.
The available transformations include:

- `shift()` and `shift-levels()` remove levels from a hierarchical name;
- `add-prefix()` adds a prefix;
- `replace-prefix()` replaces a prefix;
- `upper()` and `lower()` change the case of a name.

For template functions, use the corresponding command-line options:
`--rekey`, `--shift`, `--shift-levels`, `--add-prefix`,
`--replace-prefix`, `--upper`, and `--lower`.

For example, this moves the selected SDATA fields below the `structured`
key:

```config
$(format-json --key .SDATA.* --rekey .SDATA.* --shift 1 \
    --add-prefix structured.)
```

The exact options accepted by a template function can depend on the function.
See the reference of the individual template function for its complete
syntax. The `format-json()`, `format-welf()`, and
`format-cef-extension()` template functions use the value-pairs selection
mechanism described here.
