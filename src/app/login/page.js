"use client";

import Link from "next/link";
import { useState } from "react";

import { signInDemo } from "../treechat-demo-actions";
import styles from "../treechat-demo.module.css";

export default function LoginPage() {
  const [showPassword, setShowPassword] =
    useState(false);

  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();

    if (pending) return;

    const formData = new FormData(
      event.currentTarget
    );

    setError("");
    setPending(true);

    try {
      const result = await signInDemo(formData);

      if (result.error) {
        setError(result.error);
        setPending(false);
        return;
      }

      window.location.assign("/dashboard");
    } catch {
      setError(
        "Unable to sign in. Please try again."
      );

      setPending(false);
    }
  }

  return (
    <main
      className={`${styles.page} ${styles.center}`}
    >
      <section
        className={styles.loginCard}
        aria-labelledby="login-title"
      >
        <Link
          href="/home"
          className={styles.brand}
        >
          🌲 TreeChat
        </Link>

        <p className={styles.eyebrow}>
          BUSINESS PORTAL
        </p>

        <h1
          id="login-title"
          className={styles.title}
        >
          Welcome back
        </h1>

        <p className={styles.muted}>
          Manage your business and subscription.
        </p>

        <aside className={styles.demoNote}>
          <strong>Local demo account</strong>
          <span>Email: test@treechat.com</span>
          <span>Password: tigercat123!</span>
        </aside>

        <form
          onSubmit={handleSubmit}
          aria-busy={pending}
        >
          <label
            className={styles.label}
            htmlFor="email"
          >
            Email address
          </label>

          <input
            className={styles.input}
            id="email"
            name="email"
            type="email"
            autoComplete="username"
            autoCapitalize="none"
            spellCheck={false}
            placeholder="you@company.com"
            required
            disabled={pending}
          />

          <label
            className={styles.label}
            htmlFor="password"
          >
            Password
          </label>

          <div className={styles.passwordWrap}>
            <input
              className={`${styles.input} ${styles.passwordInput}`}
              id="password"
              name="password"
              type={
                showPassword ? "text" : "password"
              }
              autoComplete="current-password"
              placeholder="Enter your password"
              required
              disabled={pending}
            />

            <button
              className={styles.showButton}
              type="button"
              disabled={pending}
              aria-label={
                showPassword
                  ? "Hide password"
                  : "Show password"
              }
              aria-controls="password"
              onClick={() => {
                setShowPassword(
                  (previous) => !previous
                );
              }}
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>

          <p
            className={styles.error}
            role="alert"
          >
            {error}
          </p>

          <button
            className={styles.primaryButton}
            type="submit"
            disabled={pending}
          >
            {pending ? "Signing in…" : "Sign in"}
          </button>
        </form>

        <Link
          href="/home"
          className={styles.backLink}
        >
          ← Back to home
        </Link>
      </section>
    </main>
  );
}