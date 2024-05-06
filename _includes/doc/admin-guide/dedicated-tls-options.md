Make sure that you specify TLS options either using their own dedicated
option (ca-file(), cert-file(), key-file(), and peer-verify()), or using
the tls() block and inserting the relevant options within tls(). Avoid
mixing the two methods. In case you do specify TLS options in both ways,
the one that comes later in the configuration file will take effect.
