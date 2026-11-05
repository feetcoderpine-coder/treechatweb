
"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

import {
  Check,
  ArrowRight,
  Sparkles,
  Menu,
  X,
  ShieldCheck,
  Zap,
  Users,
} from "lucide-react";

import styles from "../marketing.module.css";

// ======================================
// TREECHAT PRICING CONFIGURATION
// Example prices only
// ======================================

const plans = [
  {
    name: "Free",
    monthly: 0,
    yearly: 0,
    description:
      "Everything you need to explore TreeChat and get started.",
    features: [
      "Basic AI tools",
      "1 social media account",
      "Basic content creation",
      "Community access",
      "Limited automations",
    ],
    button: "Get Started Free",
    href: "/login",
    featured: false,
  },
  {
    name: "Pro",
    monthly: 20,
    yearly: 16,
    description:
      "Powerful tools for creators, professionals, and growing brands.",
    features: [
      "Advanced AI suite",
      "Multiple social accounts",
      "Advanced content creation",
      "Workflow automations",
      "Analytics and insights",
      "Priority support",
    ],
    button: "Start with Pro",
    href: "/login",
    featured: true,
  },
  {
    name: "Team",
    monthly: 50,
    yearly: 40,
    description:
      "More collaboration, control, and flexibility for your team.",
    features: [
      "Everything in Pro",
      "Shared team workspace",
      "Multiple team members",
      "Admin and permission controls",
      "Team analytics",
      "Priority team support",
    ],
    button: "Explore Team",
    href: "/login",
    featured: false,
  },
];

const highlights = [
  {
    icon: Sparkles,
    title: "Powerful AI",
    description: "Create and work smarter.",
  },
  {
    icon: Zap,
    title: "One Platform",
    description: "Keep everything connected.",
  },
  {
    icon: ShieldCheck,
    title: "Privacy First",
    description: "Designed with control in mind.",
  },
  {
    icon: Users,
    title: "Built for Growth",
    description: "From individuals to teams.",
  },
];

// ======================================
// MAIN COMPONENT
// ======================================

export default function PricingPage() {
  const [billing, setBilling] = useState("monthly");
  const [menuOpen, setMenuOpen] = useState(false);

  const isYearly = billing === "yearly";

  return (
    <div className={styles.marketing}>
      {/* ======================================
          NAVIGATION
      ====================================== */}

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
            id="pricing-navigation"
          >
            <Link
              href="/home"
              onClick={() => setMenuOpen(false)}
            >
              Home
            </Link>

            <Link
              href="/features"
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
              className={styles.active}
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
            aria-label={
              menuOpen ? "Close menu" : "Open menu"
            }
            aria-expanded={menuOpen}
            aria-controls="pricing-navigation"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? (
              <X size={23} />
            ) : (
              <Menu size={23} />
            )}
          </button>
        </nav>
      </header>

      {/* ======================================
          MAIN PRICING SECTION
      ====================================== */}

      <main className={styles.container}>
        <section>
          <div className={styles.heading}>
            <span className={styles.eyebrow}>
              ✦ SIMPLE PRICING
            </span>

            <h1>
              Simple, flexible{" "}
              <span className={styles.gradient}>
                pricing.
              </span>
            </h1>

            <p>
              One platform. Everything you need to create,
              connect, and grow. Start free and unlock more
              as you scale.
            </p>

            {/* MONTHLY / YEARLY TOGGLE */}

            <div className={styles.billingToggle}>
              <button
                type="button"
                className={
                  !isYearly ? styles.billingActive : ""
                }
                onClick={() => setBilling("monthly")}
                aria-pressed={!isYearly}
              >
                Monthly
              </button>

              <button
                type="button"
                className={
                  isYearly ? styles.billingActive : ""
                }
                onClick={() => setBilling("yearly")}
                aria-pressed={isYearly}
              >
                Yearly
                <span className={styles.savingsBadge}>
                  Save 20%
                </span>
              </button>
            </div>
          </div>

          {/* ======================================
              PRICING CARDS
          ====================================== */}

          <div className={styles.pricingGrid}>
            {plans.map((plan) => {
              const price = isYearly
                ? plan.yearly
                : plan.monthly;

              return (
                <article
                  key={plan.name}
                  className={`${styles.pricingCard} ${
                    plan.featured
                      ? styles.proCard
                      : ""
                  }`}
                >
                  {plan.featured && (
                    <span className={styles.popular}>
                      ✦ Most Popular
                    </span>
                  )}

                  <h2 className={styles.planName}>
                    {plan.name}
                  </h2>

                  <div className={styles.price}>
                    ${price}
                    <span>/month</span>
                  </div>

                  {isYearly && price > 0 && (
                    <p className={styles.billingNote}>
                      Billed ${price * 12} annually
                    </p>
                  )}

                  <p className={styles.planDescription}>
                    {plan.description}
                  </p>

                  <div className={styles.benefits}>
                    {plan.features.map((feature) => (
                      <div
                        key={feature}
                        className={styles.benefit}
                      >
                        <Check
                          size={17}
                          strokeWidth={2.5}
                          className={styles.check}
                          aria-hidden="true"
                        />

                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>

                  <Link
                    href={plan.href}
                    className={styles.planButton}
                  >
                    {plan.button}
                    <ArrowRight
                      size={16}
                      aria-hidden="true"
                    />
                  </Link>
                </article>
              );
            })}
          </div>

          <p className={styles.footerNote}>
            Example pricing for design purposes only.
            Plans and features are not yet available
            for purchase.
          </p>
        </section>

        {/* ======================================
            PLATFORM HIGHLIGHTS
        ====================================== */}

        <section className={styles.pricingHighlights}>
          {highlights.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.title}
                className={styles.pricingHighlight}
              >
                <Icon
                  size={24}
                  strokeWidth={1.8}
                  aria-hidden="true"
                />

                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
            );
          })}
        </section>

        {/* ======================================
            FINAL CTA
        ====================================== */}

        <section className={styles.featuresCTA}>
          <span className={styles.eyebrow}>
            GET STARTED
          </span>

          <h2>
            Ready to grow with
            <br />
            <span className={styles.gradient}>
              TreeChat?
            </span>
          </h2>

          <p>
            Discover an all-in-one platform built for
            AI, social media, and content creation.
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

      {/* ======================================
          FOOTER
      ====================================== */}

      <footer className={styles.bottom}>
        © {new Date().getFullYear()} TreeChat.
        All rights reserved.
      </footer>
    </div>
  );
}
