---
title: Regular expressions
id: adm-temp-regexp
description: >-
    Filters and substitution rewrite rules can use regular expressions. In
    regular expressions, the characters ()[].*?+^$&#124;\ are used as
    special symbols. Depending on how you want to use these characters and
    which quotation mark you use, these characters must be used differently,
    as summarized below.
---

- Strings between single quotes (\'string\') are treated literally and
    are not interpreted at all, you do not have to escape special
    characters. For example, the output of \'\\x41\' is \\x41
    (characters as follows: backslash, x(letter), 4(number), 1(number)).
    This makes writing and reading regular expressions much more simple:
    it is recommended to use single quotes when writing regular
    expressions.

- When enclosing strings between double-quotes (**\"string\"**), the
    string is interpreted and you have to escape special characters,
    that is, to precede them with a backslash (**\\**) character if they
    are meant literally. For example, the output of the \"\\x41\" is
    simply the letter a. Therefore special characters like \\(backslash)
    or \"(quotation mark) must be escaped (\\\\ and \\\"). The following
    expressions are interpreted: \\a, \\n, \\r, \\t, \\v. For example,
    the \\\$40 expression matches the \$40 string. Backslashes have to
    be escaped as well if they are meant literally, for example, the
    \\\\d expression matches the \\d string.

    **TIP:** If you use single quotes, you do not need to escape the
    backslash, for example, **match(\"\\\\.\")** is equivalent to
    match(\'\\.\').
    {: .notice--info}

- Enclosing alphanumeric strings between double-quotes
    (**\"string\"**) is not necessary, you can just omit the
    double-quotes. for example, when writing filters,
    **match(\"sometext\")** and **match(sometext)** will both match for
    the sometext string.

    >**NOTE:** Only strings containing alphanumerical characters can be used  
    >without quotes or double quotes. If the string contains whitespace  
    >or any special characters (()\[\].\*?+\^\$\|\\ or ;:\#), you must  
    >use quotes or double quotes.  
    >  
    >When using the ;:\# characters, you must use quotes or double  
    >quotes, but escaping them is not required.  
    >  
    {: .notice--info}

By default, all regular expressions are case sensitive. To disable the
case sensitivity of the expression, add the **flags(ignore-case)**
option to the regular expression.

```config
filter demo_regexp_insensitive {
    host("system" flags(ignore-case));
};
```

**NOTE:** Adding the flags(ignore-case) option to glob patterns does not
disable case sensitivity.
{: .notice--info}

The regular expressions can use up to 255 regexp matches (**\${1} \...
\${255}**), but only from the last filter and only if the
**flags(\"store-matches\")** flag was set for the filter. For
case-insensitive searches, use the **flags(\"ignore-case\")** option.
