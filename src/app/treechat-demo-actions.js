"use server";

import {
  DEMO_EMAIL,
  DEMO_PASSWORD,
  assertDemoEnabled,
  startDemoSession,
  getDemoSession,
  endDemoSession,
  stripeTestClient,
  getDemoPlan,
  localAppUrl,
} from "../lib/treechat-demo";

export async function signInDemo(formData) {
  try {
    assertDemoEnabled();

    const email = String(formData.get("email") || "")
      .trim()
      .toLowerCase();

    const password = String(
      formData.get("password") || ""
    );

    if (
      email !== DEMO_EMAIL ||
      password !== DEMO_PASSWORD
    ) {
      return {
        error: "Incorrect email or password.",
      };
    }

    await startDemoSession();

    return { ok: true };
  } catch (error) {
    return {
      error: error.message,
    };
  }
}

export async function signOutDemo() {
  await endDemoSession();

  return { ok: true };
}

export async function createDemoCheckout() {
  try {
    assertDemoEnabled();

    const account = await getDemoSession();

    if (!account) {
      return {
        error:
          "Your session expired. Please sign in again.",
      };
    }

    const stripe = stripeTestClient();

    // The server chooses the price.
    // The browser cannot supply a different amount.
    const plan = await getDemoPlan(stripe);

    const appUrl = localAppUrl();

    const session =
      await stripe.checkout.sessions.create({
        mode: "subscription",

        payment_method_types: ["card"],

        line_items: [
          {
            price: plan.id,
            quantity: 1,
          },
        ],

        customer_email: account.email,

        client_reference_id: account.userId,

        metadata: {
          demo_session: account.sessionId,
        },

        success_url:
          `${appUrl}/dashboard` +
          "?session_id={CHECKOUT_SESSION_ID}",

        cancel_url:
          `${appUrl}/dashboard?canceled=1`,
      });

    if (!session.url || session.livemode) {
      return {
        error: "Could not open a test checkout.",
      };
    }

    return {
      url: session.url,
    };
  } catch {
    return {
      error:
        "Checkout is unavailable. Check your Stripe sandbox key and recurring price ID, then retry.",
    };
  }
}