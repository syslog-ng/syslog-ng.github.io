```config
destination  d_amqp {
    amqp(
        host("127.0.0.1")
        port(5672)
        username("test")
        password("test")        
        tls(
            ca-file("ca")
            cert-file("cert") 
            key-file("key")
            peer-verify(yes|no)
        )
    );
};
```
