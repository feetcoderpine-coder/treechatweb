
"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "../preview.module.css";

export default function LoginPreview() {
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    setMessage(
      "This is a design preview. Connect your existing login handler to enable sign-in."
    );
  }

  return (
    <div className={styles.loginPage}>
      <div className={styles.loginAurora} />
      <div className={styles.loginWave} />

      <header className={styles.loginHeader}>
        <Link href="/home" className={styles.brand}>
          <Image
            src="/treethree.png"
            width={38}
            height={38}
            alt="TreeChat logo"
          />
          <span>TreeChat</span>
        </Link>
      </header>

      <main className={styles.loginLayout}>
        <section className={styles.loginIntro}>
          <div className={styles.loginMascot}>
            <Image
              src="/treethree.png"
              width={100}
              height={100}
              alt="TreeChat mascot"
            />
          </div>

          <h1>
            Welcome back
            <br />
            to <span>TreeChat.</span>
          </h1>

          <p>
            Chat, create, post, and grow.
            <br />
            All in one place.
          </p>

          <div className={styles.loginBenefits}>
            <span>✦ AI Powered</span>
            <span>♧ Social</span>
            <span>ϟ Automations</span>
          </div>
        </section>

        <section className={styles.loginFormCard}>
          <div className={styles.cardAccent} />

          <div className={styles.loginFormHeading}>
            <h2>Log in to your account</h2>
            <p>Enter your details to continue to TreeChat.</p>
          </div>

          <form onSubmit={handleSubmit}>
            <label className={styles.formLabel} htmlFor="email">
              Email address
            </label>

            <div className={styles.inputWrap}>
              <span>✉</span>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="you@example.com"
                autoComplete="email"
                required
              />
            </div>

            <label className={styles.formLabel} htmlFor="password">
              Password
            </label>

            <div className={styles.inputWrap}>
              <span>♙</span>
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                autoComplete="current-password"
                required
              />

              <button
                type="button"
                className={styles.showPassword}
                onClick={() => setShowPassword(!showPassword)}
                aria-label={
                  showPassword ? "Hide password" : "Show password"
                }
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>

            <div className={styles.forgotRow}>
              <span />
              <span className={styles.accentText}>
                Secure account access
              </span>
            </div>

            <button type="submit" className={styles.loginSubmit}>
              Log In <span>→</span>
            </button>

            {message && (
              <p role="status" className={styles.previewNotice}>
                {message}
              </p>
            )}
          </form>

          <div className={styles.dividerText}>
            <span />
            <p>Preview only</p>
            <span />
          </div>

          <div className={styles.socialLogin}>
            <button
              type="button"
              onClick={() =>
                setMessage("Google sign-in is not connected in this preview.")
              }
            >
              <strong className={styles.googleG}>G</strong>
              Continue with Google
            </button>

            <button
              type="button"
              onClick={() =>
                setMessage("Apple sign-in is not connected in this preview.")
              }
            >
              <strong>●</strong>
              Continue with Apple
            </button>
          </div>

          <p className={styles.signupPrompt}>
            Want to explore the platform?{" "}
            <Link href="/dashboard-preview">
              View Dashboard
            </Link>
          </p>
        </section>
      </main>
    </div>
  );
}
