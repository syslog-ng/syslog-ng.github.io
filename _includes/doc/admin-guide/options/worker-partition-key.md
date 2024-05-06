## worker-partition-key()

|  Type:|     template|
|Default:| |

*Description:* This option specifies a template. Messages that expand the template to the same value are mapped to the same partition. If batching is enabled and multiple workers are configured, only add messages to a batch that generate identical URLs. To achieve this, set the `worker-partition-key()` option with a template that contains all the templates used in the `url()` option, otherwise messages get mixed.

### Example: partitioning messages based on destination host

```config
worker-partition-key("$HOST")
```