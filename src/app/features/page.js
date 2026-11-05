
"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

import {
  Sparkles,
  Users,
  Layers3,
  Zap,
  ChartNoAxesCombined,
  Blocks,
  ArrowRight,
  ShieldCheck,
  Globe2,
  Menu,
  X,
} from "lucide-react";

import styles from "../marketing.module.css";

// =====================================
// TREECHAT FEATURES
// =====================================

const features = [
  {
    icon: Sparkles,
    title: "AI Suite",
    description:
      "Create, summarize, brainstorm, and automate your work with powerful AI tools.",
    color: "green",
  },
  {
    icon: Users,
    title: "Social Media",
    description:
      "Connect with your audience, publish posts, and manage your social presence.",
    color: "purple",
  },
  {
    icon: Layers3,
    title: "Content Tools",
    description:
      "Create, organize, and manage your content from one powerful workspace.",
    color: "blue",
  },
  {
    icon: Zap,
    title: "Workflows",
    description:
      "Automate repetitive tasks, content scheduling, and everyday processes.",
    color: "purple",
  },
  {
    icon: ChartNoAxesCombined,
    title: "Analytics",
    description:
      "Understand your content performance and growth with meaningful insights.",
    color: "blue",
  },
  {
    icon: Blocks,
    title: "Integrations",
    description:
      "Connect your favorite services and bring your tools together in one place.",
    color: "green",
  },
];

const benefits = [
  {
    icon: ShieldCheck,
    title: "Built for Security",
    description: "Designed with privacy and control in mind.",
  },
  {
    icon: Zap,
    title: "Move Faster",
    description: "Spend less time on repetitive work.",
  },
  {
    icon: Globe2,
    title: "Everything Connected",
    description: "Keep your tools and content in one place.",
  },
];

export default function FeaturesPage() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className={styles.marketing}>
      {/* =====================================
          NAVIGATION
      ===================================== */}

      <header>
        <nav className={styles.nav}>
          <Link href="/home" className={styles.brand}>
            <Image
              src="/treethree.png"
              alt="TreeChat Logo"
              width={34}
              height={34}
            />
            <span>TreeChat</span>
          </Link>

          <div
            className={styles.links}
            id="features-navigation"
          >
            <Link
              href="/home"
              onClick={() => setMenuOpen(false)}
            >
              Home
            </Link>

            <Link
              href="/features"
              className={styles.active}
              onClick={() => setMenuOpen(false)}
            >
              Features
            </Link>

            <Link
              href="/features"
              onClick={() => setMenuOpen(false)}
            >
              Solutions
            </Link>

            <Link
              href="/pricing"
              onClick={() => setMenuOpen(false)}
            >
              Pricing
            </Link>
          </div>

          <div className={styles.actions}>
            <Link href="/login" className={styles.login}>
              Log in
            </Link>

            <Link href="/login" className={styles.start}>
              Get Started
            </Link>
          </div>

          <button
            type="button"
            className={styles.mobileMenu}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="features-navigation"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={23} /> : <Menu size={23} />}
          </button>
        </nav>
      </header>

      {/* =====================================
          MAIN FEATURES SECTION
      ===================================== */}

      <main className={styles.container}>
        <section>
          <div className={styles.heading}>
            <span className={styles.eyebrow}>
              ✦ Features
            </span>

            <h1>
              One platform.
              <br />
              <span className={styles.gradient}>
                Multiple possibilities.
              </span>
            </h1>

            <p>
              A unified space for AI, social media, content
              creation, and automation. Everything you need
              to create, connect, and grow.
            </p>
          </div>

          {/* SIX FEATURE CARDS */}

          <div className={styles.featureGrid}>
            {features.map((feature) => {
              const Icon = feature.icon;

              return (
                <article
                  key={feature.title}
                  className={styles.featureCard}
                >
                  <div className={styles.featureIcon}>
                    <Icon
                      size={27}
                      strokeWidth={1.8}
                      aria-hidden="true"
                    />
                  </div>

                  <h2>{feature.title}</h2>

                  <p>{feature.description}</p>

                  <div
                    className={styles.featureArrow}
                    aria-hidden="true"
                  >
                    <ArrowRight size={19} />
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        {/* =====================================
            PLATFORM BENEFITS
        ===================================== */}

        <section className={styles.benefitsSection}>
          <div className={styles.benefitsGrid}>
            {benefits.map((benefit) => {
              const Icon = benefit.icon;

              return (
                <div
                  className={styles.benefitItem}
                  key={benefit.title}
                >
                  <Icon
                    size={28}
                    strokeWidth={1.8}
                    aria-hidden="true"
                  />

                  <div>
                    <h3>{benefit.title}</h3>
                    <p>{benefit.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* =====================================
            CALL TO ACTION
        ===================================== */}

        <section className={styles.featuresCTA}>
          <span className={styles.eyebrow}>
            GET STARTED
          </span>

          <h2>
            Your tools. Your content.
            <br />
            <span className={styles.gradient}>
              One powerful platform.
            </span>
          </h2>

          <p>
            Discover a better way to create, connect,
            automate, and grow with TreeChat.
          </p>

          <Link
            href="/login"
            className={styles.start}
          >
            Get Started Free
            <ArrowRight size={17} />
          </Link>
        </section>
      </main>

      {/* =====================================
          FOOTER
      ===================================== */}

      <footer className={styles.bottom}>
        © {new Date().getFullYear()} TreeChat.
        All rights reserved.
      </footer>
    </div>
  );
}
