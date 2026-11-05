import "server-only";

import {
  createHmac,
  randomUUID,
  timingSafeEqual,
} from "node:crypto";

import { cookies } from "next/headers";
import Stripe from "stripe";

export const DEMO_EMAIL = "test@treechat.com";
export const DEMO_PASSWORD = "TreeChat123!";

const COOKIE_NAME = "treechat_demo_session";
const SESSION_SECONDS = 60 * 60 * 2;

export function assertDemoEnabled() {
  if (process.env.NODE_ENV !== "development") {
    throw new Error(
      "This demo only runs with npm run dev."
    );
  }
}

function secret() {
  const value = process.env.TREECHAT_DEMO_SECRET;

  if (!value || value.length < 32) {
    throw new Error(
      "Run node scripts/setup-treechat-demo.mjs, then restart Next.js."
    );
  }

  return value;
}

function signature(payload) {
  return createHmac("sha256", secret())
    .update(payload)
    .digest("base64url");
}

export async function startDemoSession() {
  assertDemoEnabled();

  const session = {
    userId: "treechat-demo-business",
    sessionId: randomUUID(),
    email: DEMO_EMAIL,
    expiresAt: Date.now() + SESSION_SECONDS * 1000,
  };

  const payload = Buffer.from(
    JSON.stringify(session)
  ).toString("base64url");

  const token = `${payload}.${signature(payload)}`;

  const cookieStore = await cookies();

  cookieStore.set(COOKIE_NAME, token, {
    httpOnly: true,
    sameSite: "lax",

    // Local HTTP demo only. Production login is disabled.
    secure: false,

    path: "/",
    maxAge: SESSION_SECONDS,
  });
}

export async function getDemoSession() {
  if (process.env.NODE_ENV !== "development") {
    return null;
  }

  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(COOKIE_NAME)?.value;

    if (!token || token.length > 2048) {
      return null;
    }

    const parts = token.split(".");

    if (parts.length !== 2) {
      return null;
    }

    const [payload, providedSignature] = parts;

    const expected = Buffer.from(signature(payload));
    const provided = Buffer.from(providedSignature);

    if (
      provided.length !== expected.length ||
      !timingSafeEqual(provided, expected)
    ) {
      return null;
    }

    const session = JSON.parse(
      Buffer.from(payload, "base64url").toString("utf8")
    );

    if (
      session.userId !== "treechat-demo-business" ||
      session.email !== DEMO_EMAIL ||
      typeof session.sessionId !== "string" ||
      !Number.isFinite(session.expiresAt) ||
      session.expiresAt <= Date.now()
    ) {
      return null;
    }

    return session;
  } catch {
    return null;
  }
}

export async function endDemoSession() {
  const cookieStore = await cookies();

  cookieStore.delete(COOKIE_NAME);
}

export function stripeTestClient() {
  assertDemoEnabled();

  const key = process.env.STRIPE_SECRET_KEY?.trim();

  if (!key?.startsWith("sk_test_")) {
    throw new Error(
      "Add a Stripe sk_test_ secret key to .env.local. Live keys are blocked."
    );
  }

  return new Stripe(key, {
    maxNetworkRetries: 1,
    timeout: 15000,
  });
}

export async function getDemoPlan(
  stripe = stripeTestClient()
) {
  const priceId = process.env.STRIPE_PRICE_ID?.trim();

  if (!priceId?.startsWith("price_")) {
    throw new Error(
      "Add a recurring Stripe price_ ID to .env.local."
    );
  }

  const price = await stripe.prices.retrieve(priceId);

  if (
    price.livemode ||
    !price.active ||
    price.type !== "recurring" ||
    price.currency !== "usd" ||
    price.billing_scheme !== "per_unit" ||
    price.unit_amount == null ||
    price.recurring?.usage_type !== "licensed"
  ) {
    throw new Error(
      "Choose an active, flat recurring USD price from the same Stripe sandbox."
    );
  }

  const amount = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(price.unit_amount / 100);

  const count = price.recurring.interval_count;
  const interval = price.recurring.interval;

  return {
    id: price.id,
    amount,
    period:
      count === 1
        ? `per ${interval}`
        : `every ${count} ${interval}s`,
  };
}

export function localAppUrl() {
  const url = new URL(
    process.env.TREECHAT_APP_URL ||
      "http://localhost:3001"
  );

  if (
    url.protocol !== "http:" ||
    !["localhost", "127.0.0.1", "[::1]"].includes(
      url.hostname
    ) ||
    url.username ||
    url.password
  ) {
    throw new Error(
      "TREECHAT_APP_URL must be your local HTTP development URL."
    );
  }

  return url.origin;
}