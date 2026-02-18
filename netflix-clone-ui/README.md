# Netflix Clone UI

## Setup
1. Install dependencies:
```bash
npm install
```
2. Copy `.env.example` to `.env` and set:
```bash
VITE_NETFLIX_AUTH_BASE_URL=https://your-backend-domain.com
```
3. Run locally:
```bash
npm run dev
```

## Build
```bash
npm run build
```

## Deployment Notes
- This UI relies on cookie-based backend auth (`credentials: include`).
- Your backend must allow this UI origin in `CORS_ALLOWED_ORIGIN_PATTERNS`.
- Backend session cookies must be `Secure=true` and `SameSite=None` when UI and API are on different domains.
