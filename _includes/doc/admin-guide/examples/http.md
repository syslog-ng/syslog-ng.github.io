**Declaration**

```config
destination d_http {
    http(
        url("http://127.0.0.1:8080")
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
