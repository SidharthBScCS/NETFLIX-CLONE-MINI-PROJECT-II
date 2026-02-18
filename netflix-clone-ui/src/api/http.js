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
