const Stripe = require("stripe");

exports.handler = async (event) => {
  const cors = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
  };

  const json = (body, status = 200) => ({
    statusCode: status,
    headers: { ...cors, "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  if (event.httpMethod === "OPTIONS") return { statusCode: 204, headers: cors, body: "" };
  if (event.httpMethod !== "POST") return json({ error: "Method not allowed" }, 405);

  const stripeKey = process.env.STRIPE_SECRET_KEY;
  if (!stripeKey) return json({ error: "Payment portal not configured. Contact nramos@ramappsolutions.com." }, 503);

  let email;
  try {
    ({ email } = JSON.parse(event.body ?? "{}"));
  } catch {
    return json({ error: "Invalid request body" }, 400);
  }

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return json({ error: "A valid email address is required." }, 400);
  }

  try {
    const stripe = new Stripe(stripeKey, { apiVersion: "2023-10-16" });

    const customers = await stripe.customers.list({ email: email.toLowerCase().trim(), limit: 1 });

    if (!customers.data.length) {
      return json({
        error: "No account found for that email. If you believe this is a mistake, email nramos@ramappsolutions.com.",
      }, 404);
    }

    const customer = customers.data[0];
    const origin = event.headers.origin || event.headers.referer || "https://ramappsolutions.com";
    const baseUrl = origin.startsWith("http") ? new URL(origin).origin : "https://ramappsolutions.com";

    const session = await stripe.billingPortal.sessions.create({
      customer: customer.id,
      return_url: `${baseUrl}/portal.html`,
    });

    return json({ url: session.url });
  } catch (err) {
    console.error("Stripe error:", err.message);
    return json({
      error: err.message.includes("No configuration")
        ? "Billing portal not configured in Stripe yet. Go to Stripe → Settings → Billing → Customer portal and enable it."
        : `Something went wrong: ${err.message}. Contact nramos@ramappsolutions.com.`,
    }, 500);
  }
};
