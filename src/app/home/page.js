"use client";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function HomePage() {
  const [gradientPos, setGradientPos] = useState(0);

  // Animate gradient background by shifting position
  useEffect(() => {
    const interval = setInterval(() => {
      setGradientPos((prev) => (prev + 1) % 200);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      style={{
        backgroundColor: "black",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Nav Bar */}
      <nav
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "1rem 2rem",
          background: `linear-gradient(90deg, #00ff88, #00aaff, #ff00aa)`,
          backgroundSize: "300% 300%",
          backgroundPosition: `${gradientPos}% 50%`,
          borderBottom: "2px solid #222",
          position: "sticky",
          top: 0,
          zIndex: 10,
          transition: "background-position 0.3s ease",
        }}
      >
        <div
          style={{
            fontSize: "1.5rem",
            fontWeight: "bold",
            color: "white",
            animation: "float 3s ease-in-out infinite",
          }}
        >
          🌲 TreeChat
        </div>

        <ul
          style={{
            listStyle: "none",
            display: "flex",
            gap: "2rem",
            margin: 0,
            padding: 0,
          }}
        >
          {["/", "/about", "/contact"].map((path, idx) => (
            <li key={idx}>
              <Link
                href={path}
                style={{
                  color: "white",
                  textDecoration: "none",
                  fontSize: "1rem",
                  transition: "color 0.3s ease",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.color = "#00ff88")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.color = "white")
                }
              >
                {path === "/" ? "Home" : path.replace("/", "").toUpperCase()}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Center Content */}
      <main
        style={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Image
          src="/treethree.png" // make sure tree.png is in your /public folder
          alt="Tree"
          width={300}
          height={300}
          style={{
            filter: "drop-shadow(0 0 10px #00ff88)",
            animation: "pulse 4s infinite",
          }}
        />
      </main>

      {/* Keyframes via global style injection */}
      <style jsx global>{`
        @keyframes pulse {
          0% {
            transform: scale(1);
            filter: drop-shadow(0 0 5px #00ff88);
          }
          50% {
            transform: scale(1.05);
            filter: drop-shadow(0 0 20px #00aaff);
          }
          100% {
            transform: scale(1);
            filter: drop-shadow(0 0 5px #ff00aa);
          }
        }
        @keyframes float {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-6px);
          }
        }
      `}</style>
    </div>
  );
}
