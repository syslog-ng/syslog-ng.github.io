---
title: 'if-else-elif: Conditional expressions'
short_title: if-else-elif - Conditional expressions
id: adm-log-cond
---

You can use **if {}**, **elif {}**, and **else {}** blocks to configure
conditional expressions.

## Conditional expressions' format

Conditional expressions have two formats:

- Explicit filter expression:

    ```config
    if (message('foo')) {
        parser { date-parser(); };
    } else {
        ...
    };
    ```

    This format only uses the filter expression in if(). If if does not
    contain \'foo\', the else branch is taken.

    The else{} branch can be empty, you can use it to send the message
    to the default branch.

- Condition embedded in the log path:

    ```config
    if {
        filter { message('foo')); };
        parser { date-parser(); };
    } else {
        ...
    };
    ```

    This format considers all filters and all parsers as the condition,
    combined. If the message contains \'foo\' and the date-parser()
    fails, the else branch is taken. Similarly, if the message does not
    contain \'foo\', the else branch is taken.

## Using the if {} and else {} blocks in your configuration

You can copy-paste the following example and use it as a template for
using the if {} and else {} blocks in your configuration.

### Example for using the if {} and else {} blocks in your configuration

The following configuration can be used as a template for using the if
{} and else {} blocks:

```config
log{
    source { example-msg-generator(num(1) template("...,STRING-TO-MATCH,..."));};
    source { example-msg-generator(num(1) template("...,NO-MATCH,..."));};
    
if (message("STRING-TO-MATCH")) 
    {   
    destination { file(/dev/stdout template("matched: $MSG\n") persist-name("1")); };
    }
else    
    {
    destination { file(/dev/stdout template("unmatched: $MSG\n") persist-name("2")); };
    };
};
```

The configuration results in the following console printout:

>matched: ...,STRING-TO-MATCH,...  
>unmatched: ...,NO-MATCH,...

An alternative, less straightforward way to implement conditional
evaluation is to use junctions. For details on junctions and channels,
see [[Junctions and channels]].
