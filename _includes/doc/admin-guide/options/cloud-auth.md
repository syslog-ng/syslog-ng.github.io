## cloud-auth()

*Description:* Configures cloud-based authentication for the syslog-ng-otlp() destination. This option enables OAuth2 authentication for gRPC connections using the syslog-ng cloud authentication framework.

The following authentication methods are available:

### oauth2()

Configures OAuth2 authentication for gRPC-based destinations. Tokens are automatically injected into gRPC metadata for each request.

The `oauth2()` option supports the following parameters:
- client_id()
- client_secret()
- token_url()
- scope()