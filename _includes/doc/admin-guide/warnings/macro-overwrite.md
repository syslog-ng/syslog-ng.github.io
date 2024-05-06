
![]({{ site.baseurl}}/assets/images/caution.png) **CAUTION:**
If the names of keys in the {{ page.message | default: 'message' }} is the same as the names of
syslog-ng OSE soft macros, the value from the parsed message
will overwrite the value of the macro. For example, the
{{ page.macro_content | default: 'PROGRAM=value1, MESSAGE=value2' }} content will overwrite the
\${PROGRAM} and \${MESSAGE} macros. To avoid overwriting such  
macros, use the **prefix()** option.
{: .notice--warning}

{% include doc/admin-guide/notes/hard-macros.md %}
