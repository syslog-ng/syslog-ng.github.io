## channel-args()

|  Type:|      |
|Default:| -|

*Description:* The `channel-args()` option is available in gRPC-based drivers. The option accepts name-value pairs and sets channel arguments defined in the [GRPC Core library documentation](https://grpc.github.io/grpc/core/group__grpc__arg__keys.html).

### Example: channel-args() declaration

```config
    channel-args(
        "grpc.loadreporting" => 1
        "grpc.minimal_stack" => 0
    )
```
