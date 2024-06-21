## multi-line-timeout()

|  Type:|      time in seconds|
|Default:| N/A|

*Description:*  Specifies the time {{ site.product.short_name }} waits without reading new data from the source, before
the last (potentially partial) message is flushed and sent through the pipeline as a LogMessage.

Since the multi-line source detects the end of a message after finding the beginning of the subsequent message
(indented or no-garbage/suffix mode), this option can be used to flush the last multi-line message
in the file after a multi-line-timeout()-second timeout.

There is no default value, so it must be explicitly configured. It should be a higher value than follow-freq(), so we recommend to set it to a multiple value of follow-freq().

### Example: multi-line-timeout()

```config
source s_multi {
 file("/some/folder/events"
  multi-line-mode("prefix-garbage")
  multi-line-prefix('^EVENT: ')
  multi-line-timeout(10)
  flags("no-parse")
 );
}
```

For more details see the blogpost Multi-line-timeout: making sure your last multi-line message is not lost.
