const { execSync } = require("child_process");
const path = require("path");

const webDir = path.resolve(__dirname, "..", "web");

console.log("[v0] Installing dependencies in web/ directory...");
console.log("[v0] Web dir:", webDir);

try {
  execSync("npm install --legacy-peer-deps", {
    cwd: webDir,
    stdio: "inherit",
  });
  console.log("[v0] Web dependencies installed successfully!");
} catch (err) {
  console.error("[v0] Failed to install web dependencies:", err.message);
  process.exit(1);
}
