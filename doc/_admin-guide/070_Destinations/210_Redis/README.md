---
title: 'redis: Storing name-value pairs in Redis'
short_title: redis
id: adm-dest-redis
description: >-
    The redis() driver sends messages as name-value pairs to a
    [Redis](https://redis.io/) key-value store.

    For the list of available parameters, see [[redis() destination options]].  
---

**Declaration**

```config
redis(
    host("<redis-server-address>")
    port("<redis-server-port>")
    auth("<redis-server-password>") # Optional, for password-protected servers
    command("<redis-command>", "<first-command-parameter>", "<second-command-parameter>", "<third-command-parameter>")
);
```

### Example: Using the redis() driver

The following destination counts the number of log messages received per
host.

```config
destination d_redis {
    redis(
        host("localhost")
        port(6379)
        command("HINCRBY", "hosts", "$HOST", "1")
    );
};
```

The following example creates a statistic from Apache webserver logs
about the browsers that the visitors use (per minute)

```config
@version: 3.38

source s_apache {
    file("/var/log/apache2/access.log");
};

parser p_apache {
    csv-parser(columns("APACHE.CLIENT_IP", "APACHE.IDENT_NAME", "APACHE.USER_NAME",
                    "APACHE.TIMESTAMP", "APACHE.REQUEST_URL", "APACHE.REQUEST_STATUS",
                    "APACHE.CONTENT_LENGTH", "APACHE.REFERER", "APACHE.USER_AGENT",
                    "APACHE.PROCESS_TIME", "APACHE.SERVER_NAME")
                flags(escape-double-char,strip-whitespace)
    delimiters(" ")
    quote-pairs('""[]')
    );
};

destination d_redis {
    redis( command("HINCRBY" "${MONTH_ABBREV} ${DAY} ${HOUR}:${MIN}"  "${APACHE.USER_AGENT}" "1"));
};

log {
    source(s_apache);
    parser(p_apache);
    destination(d_redis);
};
```
