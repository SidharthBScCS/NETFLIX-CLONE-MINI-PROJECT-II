import { buildJsonHeaders, getBackendBaseUrl } from "./http";

const BACKEND_BASE_URL = getBackendBaseUrl();

export async function subscribePremium({
  planCode,
  cardHolderName,
  cardNumber,
  expiryMonth,
  expiryYear,
  cvv,
}) {
  const method = "POST";
  const response = await fetch(`${BACKEND_BASE_URL}/api/payments/premium/subscribe`, {
    method,
    credentials: "include",
    headers: buildJsonHeaders(method),
    body: JSON.stringify({
      planCode,
      cardHolderName,
      cardNumber,
      expiryMonth,
      expiryYear,
      cvv,
    }),
  });

  let payload = {};
  try {
    payload = await response.json();
  } catch {
    payload = {};
  }

  if (!response.ok) {
    throw new Error(payload.message || `Payment request failed: ${response.status}`);
  }

  return payload;
}
