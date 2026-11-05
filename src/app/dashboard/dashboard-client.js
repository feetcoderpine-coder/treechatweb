"use client";

import Link from "next/link";
import { useState } from "react";

import {
  createDemoCheckout,
  signOutDemo,
} from "../treechat-demo-actions";

import styles from "../treechat-demo.module.css";

export default function DashboardClient({
  email,
  plan,
  paymentVerified,
  paymentCheckFailed,
  canceled,
}) {
  const [busy, setBusy] = useState(false);
  const [loggingOut, setLoggingOut] =
    useState(false);

  const [error, setError] = useState("");

  async function buyNow() {
    if (busy || loggingOut) return;

    setBusy(true);
    setError("");

    try {
      const result = await createDemoCheckout();

      if (result.error) {
        setError(result.error);
        setBusy(false);
        return;
      }

      window.location.assign(result.url);
    } catch {
      setError(
        "Unable to open checkout. Please try again."
      );

      setBusy(false);
    }
  }

  async function logOut() {
    if (loggingOut || busy) return;

    setLoggingOut(true);
    setError("");

    try {
      await signOutDemo();

      window.location.assign("/login");
    } catch {
      setError(
        "Unable to sign out. Please try again."
      );

      setLoggingOut(false);
    }
  }

  return (
    <main className={styles.page}>
      <div className={styles.shell}>
        <nav
          className={styles.nav}
          aria-label="Dashboard navigation"
        >
          <Link
            className={styles.brand}
            href="/home"
          >
            🌲 TreeChat
          </Link>

          <button
            className={styles.secondaryButton}
            onClick={logOut}
            disabled={loggingOut || busy}
          >
            {loggingOut
              ? "Signing out…"
              : "Sign out"}
          </button>
        </nav>

        <header className={styles.heading}>
          <span className={styles.badge}>
            TEST ACCOUNT
          </span>

          <h1 className={styles.dashboardTitle}>
            Your business dashboard
          </h1>

          <p className={styles.muted}>
            Welcome back. You’re signed in as{" "}
            {email}.
          </p>
        </header>

        {paymentVerified && (
          <div
            className={styles.success}
            role="status"
          >
            <strong>
              Test checkout completed.
            </strong>{" "}
            Stripe confirmed your test payment.
            No real money was charged.
          </div>
        )}

        {paymentCheckFailed && (
          <div
            className={styles.notice}
            role="status"
          >
            We couldn’t confirm this test payment.
            Refresh to check again.
          </div>
        )}

        {canceled && !paymentVerified && (
          <div
            className={styles.notice}
            role="status"
          >
            You returned from checkout. You can
            try again when you’re ready.
          </div>
        )}

        <div className={styles.grid}>
          <section
            className={styles.panel}
            aria-labelledby="account-heading"
          >
            <p className={styles.eyebrow}>
              YOUR WORKSPACE
            </p>

            <h2
              id="account-heading"
              className={styles.sectionTitle}
            >
              TreeChat Demo Business
            </h2>

            <p className={styles.muted}>
              A place for your team, business
              tools, and billing.
            </p>

            <dl className={styles.details}>
              <div>
                <dt>Account</dt>
                <dd>{email}</dd>
              </div>

              <div>
                <dt>Role</dt>
                <dd>Demo owner</dd>
              </div>

              <div>
                <dt>Environment</dt>
                <dd>Local demo</dd>
              </div>
            </dl>
          </section>

          <section
            className={`${styles.panel} ${styles.planPanel}`}
            aria-labelledby="plan-heading"
          >
            <div className={styles.planHeader}>
              <p className={styles.eyebrow}>
                SUBSCRIPTION
              </p>

              <span className={styles.stripeLabel}>
                Stripe Checkout
              </span>
            </div>

            <h2
              id="plan-heading"
              className={styles.sectionTitle}
            >
              TreeChat Business
            </h2>

            <p className={styles.muted}>
              Try the subscription checkout
              experience.
            </p>

            {plan ? (
              <div className={styles.price}>
                <strong>{plan.amount}</strong>
                <span>{plan.period}</span>
              </div>
            ) : (
              <div className={styles.unconfigured}>
                <strong>
                  Your subscription plan goes here
                </strong>

                <p className={styles.muted}>
                  Test checkout will be available
                  once billing is connected.
                </p>
              </div>
            )}

            <ul className={styles.features}>
              <li>Hosted Stripe payment page</li>
              <li>
                Recurring subscription in test mode
              </li>
              <li>
                No real charges during testing
              </li>
            </ul>

            <button
              className={styles.primaryButton}
              onClick={buyNow}
              disabled={
                !plan ||
                busy ||
                loggingOut ||
                paymentVerified
              }
            >
              {paymentVerified
                ? "Test payment complete"
                : busy
                  ? "Opening checkout…"
                  : "Buy now"}
            </button>

            <p className={styles.finePrint}>
              Payments are entered on Stripe’s
              test checkout page.
            </p>
          </section>
        </div>

        <p
          className={styles.error}
          role="alert"
        >
          {error}
        </p>
      </div>
    </main>
  );
}