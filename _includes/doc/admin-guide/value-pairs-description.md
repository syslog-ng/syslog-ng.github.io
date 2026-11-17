The `value-pairs()` option creates structured name-value pairs from the
macros, name-value pairs, and metadata of a log message. It can be used by
destinations that accept structured fields and by template functions that
format structured output.

The option accepts a list of value-pairs parameters that select, exclude,
add, or transform fields. The default value is
`scope("selected-macros" "nv-pairs")`. Empty keys are not logged.

{% if include.show_value_pairs_options_link != false %}
For the complete list and description of the parameters, see the
[[value-pairs options|adm-spec-value-pairs#value-pairs-options]] reference.
{% endif %}
