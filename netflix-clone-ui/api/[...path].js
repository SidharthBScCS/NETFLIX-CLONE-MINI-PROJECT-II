const HOP_BY_HOP_HEADERS = new Set([
  "connection",
  "keep-alive",
  "proxy-authenticate",
  "proxy-authorization",
  "te",
  "trailer",
  "transfer-encoding",
  "upgrade",
  "host",
  "content-length",
]);

function buildTargetUrl(req) {
  const backendBaseUrl = process.env.BACKEND_BASE_URL;
  if (!backendBaseUrl) {
    return null;
  }

  const trimmedBase = backendBaseUrl.replace(/\/+$/, "");
  const path = req.url?.replace(/^\/api/, "") || "";
  return `${trimmedBase}/api${path}`;
}

function forwardHeaders(reqHeaders) {
  const headers = new Headers();
  for (const [key, value] of Object.entries(reqHeaders || {})) {
    const lower = key.toLowerCase();
    if (HOP_BY_HOP_HEADERS.has(lower)) continue;
    if (Array.isArray(value)) {
      value.forEach((v) => headers.append(key, v));
    } else if (typeof value === "string") {
      headers.set(key, value);
    }
  }
  return headers;
}

export default async function handler(req, res) {
  const targetUrl = buildTargetUrl(req);
  if (!targetUrl) {
    res.status(500).json({ message: "BACKEND_BASE_URL is not configured on Vercel" });
    return;
  }

  const method = req.method || "GET";
  const headers = forwardHeaders(req.headers);
  let body;
  if (!["GET", "HEAD"].includes(method)) {
    if (typeof req.body === "string" || Buffer.isBuffer(req.body)) {
      body = req.body;
    } else if (req.body != null) {
      body = JSON.stringify(req.body);
      if (!headers.has("content-type")) {
        headers.set("content-type", "application/json");
      }
    }
  }

  const upstream = await fetch(targetUrl, {
    method,
    headers,
    body,
    redirect: "manual",
  });

  upstream.headers.forEach((value, key) => {
    if (HOP_BY_HOP_HEADERS.has(key.toLowerCase())) return;
    res.setHeader(key, value);
  });

  const setCookie = upstream.headers.getSetCookie?.();
  if (setCookie && setCookie.length > 0) {
    res.setHeader("set-cookie", setCookie);
  }

  const responseBuffer = Buffer.from(await upstream.arrayBuffer());
  res.status(upstream.status).send(responseBuffer);
}
