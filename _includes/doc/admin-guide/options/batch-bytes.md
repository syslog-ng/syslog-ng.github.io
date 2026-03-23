## batch-bytes()

| Type:    | number                                 |
| Default: | `{{ page.batch_bytes | default: '0'}}` |

**Description:** Sets the maximum size of payload in a batch. If the size of the messages reaches this value, {{ site.product.short_name }} sends the batch to the destination even if the number of messages is less than the value of the batch-lines() option.

Note on batch-timeout() interaction: When actively processing messages from the queue, {{ site.product.short_name }} flushes the batch immediately when either batch-bytes() or batch-lines() limits are reached, regardless of the batch-timeout() setting. However, when the message queue becomes empty and there are batched messages waiting, {{ site.product.short_name }} will only flush them after batch-timeout() expires. This means batch-timeout() acts as a maximum delay for flushing incomplete batches when no new messages arrive.

If the batch-bytes() option is set to 0, the batch size is not limited by the total byte size of the messages, and only the batch-lines() option determines when to send the batch.

If both batch-bytes() and batch-lines() options are set, the batch is sent when either of the limits is reached. For example, if batch-bytes() is set to 1000 and batch-lines() is set to 10, the batch will be sent when either 10 messages are collected or the total size of the messages reaches 1000 bytes, whichever comes first.

If both batch-bytes() and batch-lines() options are set to 0, no batching will occur, and messages will be sent to the destination immediately as they are processed.

Available in {{ site.product.short_name }} version 3.19 and later.
