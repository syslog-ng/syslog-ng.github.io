---
title: Referencing earlier messages of the context
id: adm-cor-prev
---

When creating the aggregated message, or in the various parameters of
the grouping-by() parser, you can also refer to fields and values of
earlier messages of the context by adding the
@\<distance-of-referenced-message-from-the-current\> suffix to the
macro. For example, if there are three log messages in a context, the
\${HOST}@1 expression refers to the host field of the current (third)
message in the context, the \${HOST}@2 expression refers to the host
field of the previous (second) message in the context, \${PID}@3 to the
PID of the first message, and so on. For example, the following message
can be created from SSH login/logout messages: An SSH session for
\${SSH\_USERNAME}@1 from \${SSH\_CLIENT\_ADDRESS}@2 closed. Session
lasted from \${DATE}@2 to \${DATE}.

![]({{ site.baseurl}}/assets/images/caution.png) **CAUTION:**
When referencing an earlier message of the context, always enclose the
field name between braces, for example, \${PID}@3. The reference will not work
if you omit the braces.
{: .notice--warning}

**NOTE**: To use a literal @ character in a template, use **@@**.
{: .notice--info}

### Example: Referencing values from an earlier message

The following action can be used to log the length of an SSH session
(the time difference between a login and a logout message in the
context):

```config
aggregate(
    value('value name="MESSAGE" An SSH session for ${SSH_USERNAME}@1 from ${SSH_CLIENT_ADDRESS}@2 closed. Session lasted from ${DATE}@2 to ${DATE}')
)
```

For another example, see [The grouping-by() parser in syslog-ng blog
post](https://www.syslog-ng.com/community/b/blog/posts/the-grouping-by-parser-in-syslog-ng-3-8)

If you do not know in which message of the context contains the
information you need, you can use the **grep** template function. For
details, see
`grep`.

### Example: Using the grep template function

The following example selects the message of the context that has a
**username** name-value pair with the **root** value, and returns the
value of the auth\_method name-value pair.

```config
$(grep ("${username}" == "root") ${auth_method})
```

To perform calculations on fields that have numerical values, see
[[Numerical operations]].
