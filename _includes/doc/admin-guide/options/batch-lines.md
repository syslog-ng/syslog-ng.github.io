## batch-lines()

| Type:    | number                               |
| Default: | `{{ page.batch_lines | default:'1' }}` |

**Description:** Specifies how many lines are flushed to a destination in one batch. The {{ site.product.short_name }} application waits for this number of lines to accumulate and sends them off in a single batch. Increasing this number increases throughput as more messages are sent in a single batch, but also increases message latency.

For example, if you set batch-lines() to 100, {{ site.product.short_name }} waits for 100 messages.

When batches are flushed:

- During active message processing: When the queue contains messages, {{ site.product.short_name }} flushes the batch immediately upon reaching the batch-lines() limit, regardless of the batch-timeout() setting.
- When queue becomes empty: If the batch-timeout() option is enabled and the queue becomes empty with unflushed messages, {{ site.product.short_name }} will only flush them after batch-timeout() expires. If batch-timeout() is disabled, messages are flushed immediately when the queue becomes empty.
- On shutdown or reload: If you stop or reload {{ site.product.short_name }}, or in case of network sources when the connection with the client is closed, {{ site.product.short_name }} automatically sends any unsent messages to the destination.

Note on batch-timeout() interaction: When actively processing messages from the queue, {{ site.product.short_name }} flushes the batch immediately when the batch-lines() limit is reached, regardless of the batch-timeout() setting. However, when the message queue becomes empty and there are batched messages waiting, {{ site.product.short_name }} will only flush them after batch-timeout() expires. This means batch-timeout() acts as a maximum delay for flushing incomplete batches when no new messages arrive.

For optimal performance, make sure that the {{ site.product.short_name }} source that
feeds messages to this destination is configured properly: the value of
the log-iw-size() option of the source must be higher than the
batch-lines() * workers() of the destination. Otherwise, the size of the
batches cannot reach the batch-lines() limit.
