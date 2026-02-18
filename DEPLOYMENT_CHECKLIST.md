# Deployment Checklist

## Frontend (`netflix-clone-ui`)
- `npm ci` succeeds
- `npm run lint` succeeds
- `npm run build` succeeds
- `VITE_NETFLIX_AUTH_BASE_URL` points to backend HTTPS URL

## Backend (`netflix-clone-backend`)
- `./mvnw test` succeeds
- Database env vars configured (`DB_URL`, `DB_USERNAME`, `DB_PASSWORD`)
- Redis env vars configured (`REDIS_HOST`, `REDIS_PORT`, `REDIS_PASSWORD`)
- `CORS_ALLOWED_ORIGIN_PATTERNS` set to frontend origin
- `SESSION_COOKIE_SECURE=true`
- `SESSION_COOKIE_SAMESITE=None`
- `RATE_LIMIT_FAIL_OPEN=false`

## Cross-Service
- Frontend and backend both use HTTPS in production
- Login, register, `/api/auth/me`, and premium subscribe flows work from deployed UI
- Browser network panel confirms cookie + CSRF header are present on POST requests
