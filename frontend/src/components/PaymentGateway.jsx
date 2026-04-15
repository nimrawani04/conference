import { apiUrl } from "../config/api";

/** POST form redirect used by Qfix and similar gateways */
export function postToPaymentGateway(url, paymentData) {
  const form = document.createElement("form");
  form.method = "POST";
  form.action = url;

  Object.keys(paymentData).forEach((key) => {
    const input = document.createElement("input");
    input.type = "hidden";
    input.name = key;
    input.value = paymentData[key];
    form.appendChild(input);
  });

  document.body.appendChild(form);
  form.submit();
}

/**
 * Creates an order and submits to the payment portal (full page navigation).
 */
export async function startGatewayCheckout({ amount, currency, registrationData }) {
  const response = await fetch(apiUrl("/api/create-payment-order"), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ amount, currency, registrationData }),
  });

  const result = await response.json().catch(() => ({}));
  if (!response.ok || !result.success) {
    throw new Error(result.error || result.message || "Failed to create payment order");
  }

  postToPaymentGateway(result.paymentUrl, result.paymentData);
}
