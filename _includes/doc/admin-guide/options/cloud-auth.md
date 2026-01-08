## cloud-auth()

*Description:* Configures the cloud authentication module for gRPC- and HTTP-based destinations, enabling OAuth2 authentication using the {{ site.product.short_name }} cloud authentication framework.

The following authentication methods are available:

### azure()

The `azure()` option supports the following parameters:
- `app_id`
- `app_secret`
- `monitor`
- `tenant_id`

### gcp()

The `gcp()` option supports the following parameters:
- `service_account`
  - `audience`
  - `key`
  - `scope`
  - `token_validity_duration`
- `user_managed_service_account`
  - `metadata_url`
  - `name`

### oauth2()

Configures OAuth2 authentication for gRPC-based and http destinations. Tokens are automatically injected into gRPC metadata and HTTP headers for each request.

The `oauth2()` option supports the following parameters:
- `client_id`
- `client_secret`
- `token_url`
- `scope`
- `auth_method`
  - `basic`
  - `post_body`
- `authorization_details`
- `refresh_offset`
- `resource`
