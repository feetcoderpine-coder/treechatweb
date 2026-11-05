
"use client";

import Link from "next/link";
import Image from "next/image";
import styles from "./page.module.css";

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
  return (
    <div className={styles.page}>
      {/* NAVIGATION */}
      <header className={styles.header}>
        <nav className={styles.nav}>
          <Link href="/" className={styles.logo}>
            <Image
              src="/treethree.png"
              alt="TreeChat Logo"
              width={36}
              height={36}
            />
            <span>TreeChat</span>
          </Link>

          <div className={styles.navLinks}>
            <Link href="/#features">Product</Link>
            <Link href="/#features">Features</Link>
            <Link href="/#features">Solutions</Link>
            <Link href="/#pricing">Pricing</Link>
          </div>

          <div className={styles.navActions}>
            <Link href="/login" className={styles.loginButton}>
              Log in
            </Link>

            <Link href="/login" className={styles.navGetStarted}>
              Get Started
            </Link>
          </div>
        </nav>
      </header>

      {/* HERO */}
      <main>
        <section className={styles.hero}>
          <div className={styles.greenGlow} />
          <div className={styles.purpleGlow} />

          <div className={styles.heroContent}>
            <div className={styles.announcement}>
              <span className={styles.newBadge}>✦ New</span>
              TreeChat 2.0 is here
              <span>→</span>
            </div>

            <h1 className={styles.title}>
              The All-in-One Platform for
              <span className={styles.gradientText}>
                AI, Social Media, and More
              </span>
            </h1>

            <p className={styles.subtitle}>
              Chat, create, post, automate, and grow — all in one
              powerful platform.
            </p>

            <div className={styles.heroButtons}>
              <Link href="/login" className={styles.primaryButton}>
                Get Started Free <span>→</span>
              </Link>

              <a href="#features" className={styles.secondaryButton}>
                <span className={styles.playIcon}>▶</span>
                Explore Features
              </a>
            </div>
          </div>

          {/* BACKGROUND WAVES */}
          <div className={styles.landscape}>
            <div className={styles.leftWave} />
            <div className={styles.rightWave} />
            <div className={styles.bottomWave} />
          </div>

          {/* CENTER TREE */}
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

          {/* FEATURES */}
          <div id="features" className={styles.features}>
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

        <section id="pricing" className={styles.bottomSection}>
          <h2>Everything you need. One platform.</h2>
          <p>
            Discover a better way to create, connect, and grow.
          </p>
          <Link href="/login" className={styles.primaryButton}>
            Get Started Free →
          </Link>
        </section>
      </main>
    </div>
  );
}
