
"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
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

const particles = [
  { left: "8%", top: "28%", delay: "0s", size: "4px" },
  { left: "17%", top: "55%", delay: "1.2s", size: "3px" },
  { left: "32%", top: "15%", delay: "2.4s", size: "3px" },
  { left: "72%", top: "24%", delay: "0.7s", size: "4px" },
  { left: "88%", top: "48%", delay: "1.8s", size: "3px" },
  { left: "93%", top: "70%", delay: "3.1s", size: "4px" },
  { left: "44%", top: "66%", delay: "2s", size: "2px" },
  { left: "59%", top: "40%", delay: "1.5s", size: "3px" },
];

export default function HomePage() {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const elements = document.querySelectorAll(
      "[data-reveal]"
    );

    if (!("IntersectionObserver" in window)) {
      elements.forEach((element) =>
        element.classList.add(styles.isVisible)
      );
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(styles.isVisible);
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -30px 0px",
      }
    );

    elements.forEach((element) =>
      observer.observe(element)
    );

    return () => observer.disconnect();
  }, []);

  return (
    <div className={styles.page}>
      {/* NAVIGATION */}
      <header className={styles.header}>
        <nav className={styles.nav}>
          <Link href="/home" className={styles.logo}>
            <Image
              src="/treethree.png"
              alt="TreeChat Logo"
              width={36}
              height={36}
            />
            <span>TreeChat</span>
          </Link>

          <div
            className={`${styles.navLinks} ${
              menuOpen ? styles.navOpen : ""
            }`}
          >
            <Link href="/home" onClick={() => setMenuOpen(false)}>
              Home
            </Link>

            <Link href="/features" onClick={() => setMenuOpen(false)}>
              Features
            </Link>

            <Link href="/features" onClick={() => setMenuOpen(false)}>
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

            <Link
              href="/login"
              className={styles.navGetStarted}
            >
              Get Started
            </Link>
          </div>

          <button
            type="button"
            className={styles.mobileMenu}
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          >
            {menuOpen ? "✕" : "☰"}
          </button>
        </nav>
      </header>

      <main>
        {/* HERO */}
        <section className={styles.hero}>
          {/* ANIMATED BACKGROUND */}
          <div
            className={styles.ambientLayer}
            aria-hidden="true"
          >
            <div className={styles.greenGlow} />
            <div className={styles.purpleGlow} />

            <div className={styles.auroraOne} />
            <div className={styles.auroraTwo} />

            {particles.map((particle, index) => (
              <span
                key={index}
                className={styles.particle}
                style={{
                  left: particle.left,
                  top: particle.top,
                  width: particle.size,
                  height: particle.size,
                  animationDelay: particle.delay,
                }}
              />
            ))}
          </div>

          {/* HERO CONTENT */}
          <div className={styles.heroContent}>
            <div
              className={`${styles.announcement} ${styles.heroEnterOne}`}
            >
              <span className={styles.newBadge}>
                ✦ New
              </span>

              <span>TreeChat 2.0 is here</span>
              <span>→</span>
            </div>

            <h1
              className={`${styles.title} ${styles.heroEnterTwo}`}
            >
              The All-in-One Platform for

              <span className={styles.gradientText}>
                AI, Social Media, and More
              </span>
            </h1>

            <p
              className={`${styles.subtitle} ${styles.heroEnterThree}`}
            >
              Chat, create, post, automate, and grow — all in
              one powerful platform.
            </p>

            <div
              className={`${styles.heroButtons} ${styles.heroEnterFour}`}
            >
              <Link
                href="/login"
                className={`${styles.primaryButton} ${styles.shineButton}`}
              >
                <span>Get Started Free</span>
                <span>→</span>
              </Link>

              <Link
                href="/features"
                className={styles.secondaryButton}
              >
                <span className={styles.playIcon}>▶</span>
                Explore Features
              </Link>
            </div>
          </div>

          {/* GRADIENT LANDSCAPE */}
          <div
            className={styles.landscape}
            aria-hidden="true"
          >
            <div className={styles.leftWave} />
            <div className={styles.rightWave} />
            <div className={styles.bottomWave} />
          </div>

          {/* FLOATING TREE MASCOT */}
          <div className={styles.treeContainer}>
            <div className={styles.treeAura} />

            <div className={styles.treeCard}>
              <div className={styles.treeInnerGlow} />

              <Image
                src="/treethree.png"
                alt="TreeChat Mascot"
                width={150}
                height={150}
                priority
                className={styles.heroTree}
              />
            </div>
          </div>

          {/* FEATURES */}
          <div
            id="features"
            className={styles.features}
          >
            {features.map((feature, index) => (
              <div
                key={feature.title}
                className={`${styles.feature} ${styles.reveal}`}
                data-reveal
                style={{
                  transitionDelay: `${index * 100}ms`,
                }}
              >
                <div className={styles.featureIcon}>
                  {feature.icon}
                </div>

                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* BOTTOM SECTION */}
        <section
          className={`${styles.bottomSection} ${styles.enhancedBottom}`}
        >
          <div
            className={`${styles.reveal} ${styles.bottomContent}`}
            data-reveal
          >
            <span className={styles.sectionEyebrow}>
              ONE PLATFORM. ENDLESS POSSIBILITIES.
            </span>

            <h2>
              Everything you need.
              <span className={styles.bottomGradientText}>
                All in one place.
              </span>
            </h2>

            <p>
              Create, connect, automate, and grow with TreeChat.
            </p>

            <Link
              href="/features"
              className={`${styles.primaryButton} ${styles.shineButton}`}
            >
              Explore the Platform
              <span>→</span>
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
