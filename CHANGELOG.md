# Changelog

## 1.0.3

- Reorganized public SDK types by module.
- Added typed `ApiResult<T>` responses.
- Added `isApiError`, `isContextError` and `isExternalProviderError` helpers.
- Sanitized connected account types so public SDK responses do not expose `accessToken` or `refreshToken`.
- Added module-specific package exports.

## 1.0.2

- Updated package scope to `@undernouzen/ay-payments-sdk`.
- Added AY Payments docs homepage.

## 1.0.0

- Initial SDK client for AY Payments API v1.
