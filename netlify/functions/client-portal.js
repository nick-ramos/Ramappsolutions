const Stripe = require("stripe");

exports.handler = async (event) => {
  const cors = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
  };

  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 204, headers: cors, body: "" };
  }

  if (event.httpMethod !== "POST") {
    return { statusCode: 405, headers: cors, body: JSON.stringify({ error: "Method not allowed" }) };
  }

  const stripeKey = process.env.STRIPE_SECRET_KEY;
  if (!stripeKey) {
    return {
      statusCode: 503,
      headers: { ...cors, "Content-Type": "application/json" },
      body: JSON.stringify({ error: "Payment portal not configured. Contact nick@ramappsolutions.com." }),
    };
  }

  let email;
  try {
    ({ email } = JSON.parse(event.body ?? "{}"));
  } catch {
    return { statusCode: 400, headers: cors, body: JSON.stringify({ error: "Invalid request body" }) };
  }

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return {
      statusCode: 400,
      headers: { ...cors, "Content-Type": "application/json" },
      body: JSON.stringify({ error: "A valid email address is required." }),
    };
  }

  const stripe = new Stripe(stripeKey, { apiVersion: "2023-10-16" });

  const customers = await stripe.customers.list({ email: email.toLowerCase().trim(), limit: 1 });

  if (!customers.data.length) {
    return {
      statusCode: 404,
      headers: { ...cors, "Content-Type": "application/json" },
      body: JSON.stringify({
        error: "No account found for that email. If you believe this is a mistake, email nick@ramappsolutions.com.",
      }),
    };
  }

  const customer = customers.data[0];

  const origin = event.headers.origin || event.headers.referer || "https://ramappsolutions.com";
  const baseUrl = origin.startsWith("http") ? new URL(origin).origin : "https://ramappsolutions.com";

  const session = await stripe.billingPortal.sessions.create({
    customer: customer.id,
    return_url: `${baseUrl}/portal.html`,
  });

  return {
    statusCode: 200,
    headers: { ...cors, "Content-Type": "application/json" },
    body: JSON.stringify({ url: session.url }),
  };
};
