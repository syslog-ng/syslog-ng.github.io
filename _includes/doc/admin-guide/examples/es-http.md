**Declaration**

```config
destination d_elasticsearch-http {
        elasticsearch-http(
                url("http://your-elasticsearch-server:9200/_bulk")
                type("")
                index("example-index")
                tls(
                        ca-dir("dir")
                        cert-file("cert")
                        cipher-suite("cipher")
                        key-file("key")
                        peer-verify(yes|no)
                        ssl-version(<the permitted SSL/TLS version>)
                )
        );
};
```
