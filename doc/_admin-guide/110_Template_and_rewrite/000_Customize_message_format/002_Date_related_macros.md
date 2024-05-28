---
title: Date-related macros
id: adm-temp-date-macro
---

The macros related to the date of the message (for example: ${ISODATE},
${HOUR}, and so on) have three further variants each:

- S_ prefix, for example, ${S_DATE}: The ${S_DATE} macro
    represents the date found in the log message, that is, when the
    message was sent by the original application.

    ![]({{ site.baseurl}}/assets/images/caution.png) **CAUTION:**
    To use the S\_ macros, the keep-timestamp() option must be enabled
    (this is the default behavior of {{ site.product.short_name }}).
    {: .notice--warning}

- R_ prefix, for example, ${R_DATE}: ${R_DATE} is the date when
    {{ site.product.short_name }} has received the message.

- C_ prefix, for example, ${C_DATE}: ${C_DATE} is the current
    date, that is when {{ site.product.short_name }} processes the message and resolves
    the macro.

The ${DATE} macro equals the ${S_DATE} macro.

The values of the date-related macros are calculated using the original
timezone information of the message. To convert it to a different
timezone, use the **time-zone()** option. You can set the time-zone()
option as a global option, or per destination. For sources, it applies
only if the original message does not contain timezone information.
Alternatively, you can modify the timezone of the message using
timezone-specific rewrite rules. For details, see
Rewrite the timezone of a message.
Converting the timezone changes the values of the following date-related
macros (macros MSEC and USEC are not changed):

- ${AMPM}

- ${DATE}

- ${DAY}

- ${FULLDATE}

- ${HOUR}

- ${HOUR12}

- ${ISODATE}

- ${ISOWEEK}

- ${MIN}

- ${MONTH}

- ${MONTH_ABBREV}

- ${MONTH_NAME}

- ${MONTH_WEEK}

- ${SEC}

- ${STAMP}

- ${TZ}

- ${TZOFFSET}

- ${UNIXTIME}

- ${WEEK}

- ${WEEK_DAY}

- ${WEEK_DAY_ABBREV}

- ${WEEK_DAY_NAME}

- ${YEAR}

- ${YEAR_DAY}
