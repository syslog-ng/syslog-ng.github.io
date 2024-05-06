## template-escape()

|  Type:|      yes or no|
  |Default:|   no|

*Description:* Turns on escaping for the \', \", and backspace
characters in templated output files. This is useful for generating SQL
statements and quoting string contents so that parts of the log message
are not interpreted as commands to the SQL server.

**NOTE:** In syslog-ng OSE 4.5 and later versions `template-escape(yes)` escapes the top-level template function in case of nested template functions.
{: .notice--info}
