## cloud-auth()

*Description:* Configures cloud authentication module for the for gRPC and http based destinations. This option enables OAuth2 authentication for gRPC connections using the syslog-ng cloud authentication framework.

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

Configures OAuth2 authentication for gRPC-based and http destinations. Tokens are automatically injected into gRPC metadata for each request.

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
