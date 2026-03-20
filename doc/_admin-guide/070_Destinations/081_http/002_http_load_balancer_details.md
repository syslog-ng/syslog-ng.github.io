---
title: HTTP Load Balancer in Details
id: adm-dest-http-load-balancer-details
description: >-
    The HTTP load balancer distributes log messages across multiple HTTP endpoints with automatic failover and recovery capabilities.
---

## How Load Balancing Works

When you configure multiple URLs for an HTTP destination, {{ site.product.short_name }} automatically distributes the log traffic across all available endpoints. This provides redundancy and allows you to scale your log collection infrastructure horizontally.

**Key Behavior:**

- {{ site.product.short_name }} distributes processing tasks evenly across all operational endpoints
- Each worker keeps its HTTP connection open between requests (reducing connection overhead)
- If an endpoint fails, its workers are immediately reassigned to healthy endpoints
- When a failed endpoint recovers, workers are automatically rebalanced to include it again
- Rebalancing happens continuously and automatically - no manual intervention required

**Important Setting:**

- **Recovery timeout**: Controls how long {{ site.product.short_name }} waits before retrying a failed endpoint (default: 60 seconds)

## What Happens When an Endpoint Fails

{{ site.product.short_name }} continuously monitors the health of all configured endpoints. When an endpoint becomes unavailable:

1. The endpoint is immediately marked as failed (connection errors, HTTP 4xx/5xx errors, or timeouts)
2. Workers assigned to the failed endpoint are automatically redistributed to healthy endpoints
3. Messages are automatically retried on alternative endpoints
4. After the recovery timeout has elapsed since the last recovery attempt, {{ site.product.short_name }} attempts to deliver messages to the failed endpoint
5. If the delivery succeeds, the endpoint is immediately restored to service and workers are automatically rebalanced to include it; if it fails, another retry is scheduled after the recovery timeout

**Automatic Rebalancing:** Each time an endpoint's status changes (fails or recovers), {{ site.product.short_name }} automatically redistributes workers across all available endpoints to maintain even load distribution.

**All Endpoints Down:** If all configured endpoints fail simultaneously, messages are queued and retried according to your retry settings (time-reopen). Delivery resumes automatically when any endpoint recovers.

**Disk Buffer Support:** For high-reliability scenarios, enable disk buffers to ensure messages are not lost during endpoint outages. See Using disk-based and memory buffering for configuration details.

## Using Dynamic URLs

You can use {{ site.product.short_name }} templates in URLs to route messages dynamically based on message content:

- **Static URL example:** `http://logs.example.com:8080/api/logs`
- **Dynamic URL example:** `http://logs.example.com:8080/${HOST}/logs`

**Important Restrictions:**

- Templates can only be used in the URL path and query parameters
- You cannot template the hostname, port, protocol, or credentials (for security and routing stability)
- Template values are automatically URL-encoded (spaces become `%20`, etc.)

**NOTE:** Dynamic URLs have slightly more processing overhead than static URLs since each message needs URL formatting.
{: .notice--info}

## Important Limitations to Know

- **Message order**: Using multiple endpoints can result in messages arriving out of order at different destinations
- **Equal distribution**: All endpoints receive roughly equal traffic; you cannot configure weighted distribution
- **Reactive monitoring only**: {{ site.product.short_name }} detects failures when they occur, but does not proactively health-check idle endpoints
- **Fixed recovery timing**: The recovery timeout is constant; there is no exponential backoff for repeatedly failing endpoints

## Configuration Guidelines

### Setting Worker Count

Configure at least as many workers as you have target URLs to fully utilize all endpoints:

``` config
destination d_http {
    http(
        url("http://server1.example.com/logs" "http://server2.example.com/logs")
        workers(2)  # At least 2 workers for 2 URLs
    );
};
```

**Recommendation:** Use 2-4 workers per endpoint for high-volume scenarios.

### Using Persist Names (Critical for Production)

Always configure `persist-name()` when using multiple URLs. This prevents message loss if you need to add, remove, or change endpoint URLs:

``` config
destination d_http {
    http(
        url("http://server1.example.com/logs" "http://server2.example.com/logs")
        persist-name("http_log_endpoints")  # Preserves state across config changes
        workers(4)
    );
};
```

### Adjusting Recovery Timeout

Choose a recovery timeout based on your operational needs:

``` config
destination d_http {
    http(
        url("http://server1.example.com/logs" "http://server2.example.com/logs")
        time-reopen(30)  # Retry failed endpoints after 30 seconds
    );
};
```

**When to adjust:**

- **Fast recovery needed (10-30s)**: Use for endpoints that recover quickly (e.g., containerized services)
- **Stable infrastructure (60-120s)**: Use for endpoints that rarely fail but need time to recover (e.g., maintenance windows)
- **Default (60s)**: Suitable for most production scenarios

### Combining Dynamic URLs with Batching

If you use templates in URLs and batching is enabled, configure `worker-partition-key()` to ensure messages with identical URLs are batched together:

``` config
destination d_http {
    http(
        url("http://logs.example.com:8080/${HOST}/logs")
        batch-lines(100)
        worker-partition-key("${HOST}")  # Messages for the same host go to same batch
        workers(8)
    );
};
```

This prevents inefficient batch splitting and optimizes request consolidation.
