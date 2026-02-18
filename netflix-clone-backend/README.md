# Netflix Clone Backend

## Local Run
1. Set environment variables from `.env.example`.
2. For local browser testing over `http://localhost`, use:
```bash
SPRING_PROFILES_ACTIVE=local
```
3. Start the app:
```bash
./mvnw spring-boot:run
```
4. If no external DB is configured, the app falls back to in-memory H2 by default.

## Production Run
Set at minimum:
- `DB_URL`, `DB_USERNAME`, `DB_PASSWORD`
- `REDIS_HOST`, `REDIS_PORT`, `REDIS_PASSWORD`
- `CORS_ALLOWED_ORIGIN_PATTERNS` (your frontend domain)
- `SESSION_COOKIE_SECURE=true`
- `SESSION_COOKIE_SAMESITE=None`
- `RATE_LIMIT_FAIL_OPEN=true` (recommended until Redis is confirmed healthy)

Then start with:
```bash
./mvnw spring-boot:run
```

## Security Notes
- CSRF protection is enabled and uses the `XSRF-TOKEN` cookie + `X-XSRF-TOKEN` header.
- Session cookies are secure by default in `application.properties`.
- A `local` profile exists for localhost development.
