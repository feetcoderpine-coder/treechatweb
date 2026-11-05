
"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import styles from "../page.module.css";

const features = [
  {
    icon: "✦",
    title: "AI Tools",
    description: "Write, create, and automate with AI",
  },
  {
    icon: "♧",
    title: "Social Media",
    description: "Post, engage, and grow your audience",
  },
  {
    icon: "▱",
    title: "All-in-One",
    description: "Everything you need in a single platform",
  },
  {
    icon: "ϟ",
    title: "Automations",
    description: "Save time with powerful workflows",
  },
];

export default function HomePage() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className={styles.page}>
      {/* NAVIGATION */}
      <header className={styles.header}>
        <nav className={styles.nav}>
          <Link href="/" className={styles.logo}>
            <Image
              src="/treethree.png"
              alt="TreeChat Logo"
              width={35}
              height={35}
              className={styles.logoImage}
            />
            <span>TreeChat</span>
          </Link>

          <div
            className={`${styles.navLinks} ${
              menuOpen ? styles.navOpen : ""
            }`}
          >
            <Link href="/product" onClick={() => setMenuOpen(false)}>
              Product
            </Link>
            <Link href="/features" onClick={() => setMenuOpen(false)}>
              Features
            </Link>
            <Link href="/solutions" onClick={() => setMenuOpen(false)}>
              Solutions
            </Link>
            <Link href="/pricing" onClick={() => setMenuOpen(false)}>
              Pricing
            </Link>
          </div>

          <div className={styles.navActions}>
            <Link href="/login" className={styles.loginButton}>
              Log in
            </Link>

            <Link href="/signup" className={styles.navGetStarted}>
              Get Started
            </Link>
          </div>

          <button
            type="button"
            className={styles.menuButton}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle navigation"
            aria-expanded={menuOpen}
          >
            {menuOpen ? "✕" : "☰"}
          </button>
        </nav>
      </header>

      {/* HERO */}
      <main className={styles.main}>
        <section className={styles.hero}>
          {/* Background glow */}
          <div className={styles.greenGlow} />
          <div className={styles.purpleGlow} />

          <div className={styles.heroContent}>
            {/* Announcement */}
            <div className={styles.announcement}>
              <span className={styles.newBadge}>✦ New</span>

              <span>TreeChat 2.0 is here</span>

              <span className={styles.announcementArrow}>→</span>
            </div>

            {/* Main headline */}
            <h1 className={styles.title}>
              The All-in-One Platform for
              <span className={styles.gradientText}>
                {" "}
                AI, Social Media, and More
              </span>
            </h1>

            <p className={styles.subtitle}>
              Chat, create, post, automate, and grow — all in one
              powerful platform.
            </p>

            {/* Main buttons */}
            <div className={styles.heroButtons}>
              <Link href="/signup" className={styles.primaryButton}>
                Get Started Free
                <span>→</span>
              </Link>

              <Link href="/demo" className={styles.secondaryButton}>
                <span className={styles.playIcon}>▶</span>
                Watch Demo
              </Link>
            </div>
          </div>

          {/* GRADIENT LANDSCAPE */}
          <div className={styles.landscape} aria-hidden="true">
            <div className={styles.leftWave} />
            <div className={styles.rightWave} />
            <div className={styles.bottomWave} />
          </div>

          {/* TREE LOGO */}
          <div className={styles.treeContainer}>
            <div className={styles.treeCard}>
              <Image
                src="/treethree.png"
                alt="TreeChat"
                width={150}
                height={150}
                priority
                className={styles.heroTree}
              />
            </div>
          </div>

          {/* FEATURE HIGHLIGHTS */}
          <div className={styles.features}>
            {features.map((feature) => (
              <div className={styles.feature} key={feature.title}>
                <div className={styles.featureIcon}>
                  {feature.icon}
                </div>

                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
