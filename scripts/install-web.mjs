import { execSync } from "child_process";
import { existsSync } from "fs";
import path from "path";

const webDir = path.resolve(process.cwd(), "web");

if (!existsSync(path.join(webDir, "package.json"))) {
  console.error("web/package.json not found");
  process.exit(1);
}

console.log("Installing dependencies in web/ ...");
try {
  execSync("npm install --legacy-peer-deps", {
    cwd: webDir,
    stdio: "inherit",
  });
  console.log("Done! web/ dependencies installed.");
} catch (e) {
  console.error("Install failed:", e.message);
  process.exit(1);
}
