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

  const hardFallback = "https://netflix-clone-mini-project-ii.onrender.com";
  if (import.meta.env.PROD) {
    return hardFallback;
  }

  // In local dev, Vite proxy can handle /api requests without explicit base URL.
  if (import.meta.env.DEV) {
    return "";
  }

  throw new Error("Backend URL is not configured. Set VITE_NETFLIX_AUTH_BASE_URL in Vercel.");
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
