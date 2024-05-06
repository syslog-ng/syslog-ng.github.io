---
title: Comparing macro values in filters
id: adm-log-filters-macro
description: >-
    Starting with syslog-ng OSE version 3.2, it is also possible to compare
    macro values and templates as numerical and string values. String
    comparison is alphabetical: it determines if a string is alphabetically
    greater or equal to another string. Use the following syntax to compare
    macro values or templates. 
---

For details on macros and templates, see
[[Customize message format using macros and templates]].

```config
filter <filter-id>
        {"<macro-or-template>" operator "<value-or-macro-or-template>"};
```

## String and numerical comparison

syslog-ng Open Source Edition versions prior to 4.0 used separate
operators for string comparisons (for example, eq). In version 4.0 and
onwards, mathematical symbols can be used as operators (==, !=, \>=),
and syslog-ng Open Source Edition automatically determines how to
compare the arguments based on their type.

- If both sides of the comparison are strings, the comparison is
    string.

- If at least one of the argument is numeric, the comparison is
    numeric.

- Numbers not enclosed by quotation marks, are recognized as numeric.

- It is possible to explicitly type-cast an argument as numeric.

**Examples:**

- if ("${.apache.httpversion}" == 1.0)

    The right side of the argument is 1.0 (a floating point literal), so
    the comparison is numeric.

- if (double("${.apache.httpversion}") == "1.0")

    The left side of the argument is explicitly type cast into double,
    the right side is a string (note the use of quotation marks), so the
    comparison is numeric.

- if ("${.apache.request}" == "/wp-admin/login.php")

    The left side of the argument is not type-cast, so it remains a
    string. The right side of the argument is also a string, so the
    comparison is string.

**NOTE:** The old string operators can still be used for the sake of
backwards compatibility, but it is advised and easier to use the numeric
operators for strings as well.
{: .notice--info}

### Example: Comparing macro values in filters

The following expression selects log messages containing a PID (that is,
\${PID} macro is not empty):

```config
filter f_pid {"${PID}" !=""};
```

The following expression selects log messages that do not contain a PID.
Also, it uses a template as the left argument of the operator and
compares the values as strings:

```config
filter f_pid {"${HOST}${PID}" eq "${HOST}"};
```

The following example selects messages with priority level higher than 5.

```config
filter f_level {"${LEVEL_NUM}" > "5"};
```

Note that:

- The macro or template must be enclosed in double-quotes.

- The \$ character must be used before macros.

- Using comparator operators can be equivalent to using filter
    functions, but is somewhat slower. For example, using **\"\${HOST}\"
    eq \"myhost\"** is equivalent to using **host(\"myhost\"
    type(string))**.

- You can use any macro in the expression, including user-defined
    macros from parsers and results of pattern database classifications.

- The results of filter functions are boolean values, so they cannot
    be compared to other values.

- You can use boolean operators to combine comparison expressions.

The following operators are available:

|  Numerical operator   |String operator  | Meaning|
|--------------------|-----------------|----------------------|
|  ==  |                 eq |               Equals|
|  !=   |                ne  |              Not equal to|
| \>    |               gt   |             Greater than|
| \<     |              lt    |            Less than|
| \>=     |             ge     |           Greater than or equal|
| =\<      |            le      |          Less than or equal|
