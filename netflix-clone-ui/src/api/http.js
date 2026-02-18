function readCookie(name) {
  if (typeof document === "undefined" || !document.cookie) {
    return "";
  }

  const prefix = `${encodeURIComponent(name)}=`;
  const parts = document.cookie.split(";");
  for (const rawPart of parts) {
    const part = rawPart.trim();
    if (part.startsWith(prefix)) {
      return decodeURIComponent(part.slice(prefix.length));
    }
  }
  return "";
}

export function getBackendBaseUrl() {
  const configured = (import.meta.env.VITE_NETFLIX_AUTH_BASE_URL || "").trim();
  if (configured) {
    return configured.replace(/\/+$/, "");
  }

  // In local dev and production, fallback to same-origin /api.
  // In production this is expected to be handled by Vercel API proxy.
  if (import.meta.env.DEV) {
    return "";
  }

  return "";
}

export function buildJsonHeaders(method = "GET", headers = {}) {
  const normalizedMethod = method.toUpperCase();
  const baseHeaders = {
    "Content-Type": "application/json",
    ...headers,
  };

  if (!["GET", "HEAD", "OPTIONS"].includes(normalizedMethod)) {
    const csrfToken = readCookie("XSRF-TOKEN");
    if (csrfToken) {
      baseHeaders["X-XSRF-TOKEN"] = csrfToken;
    }
  }

  return baseHeaders;
}
