import {
  existsSync,
  readFileSync,
  appendFileSync,
} from "node:fs";

import { randomBytes } from "node:crypto";

if (!existsSync("package.json")) {
  console.error(
    "Run this command from your Next.js project folder—the folder containing package.json."
  );

  process.exit(1);
}

const path = ".env.local";

const existing = existsSync(path)
  ? readFileSync(path, "utf8")
  : "";

const defaults = {
  TREECHAT_DEMO_SECRET: randomBytes(32).toString("hex"),
  TREECHAT_APP_URL: "http://localhost:3001",
  STRIPE_SECRET_KEY: "",
  STRIPE_PRICE_ID: "",
};

const additions = Object.entries(defaults)
  .filter(([name]) => {
    const pattern = new RegExp(
      `^\\s*(?:export\\s+)?${name}\\s*=`,
      "m"
    );

    return !pattern.test(existing);
  })
  .map(([name, value]) => `${name}=${value}`);

if (additions.length > 0) {
  appendFileSync(
    path,
    `\n# TreeChat local demo\n${additions.join("\n")}\n`,
    { mode: 0o600 }
  );
}

console.log("Demo setup ready.");
console.log("Existing .env.local values were preserved.");
console.log("Email: test@treechat.com");
console.log("Password: TreeChat123!");
console.log(
  "Add your Stripe test key and recurring price ID when ready."
);