const fs = require("fs");
const path = require("path");

const SRC_DIR = path.join(__dirname, "src");

function processFile(filePath) {
  let content = fs.readFileSync(filePath, "utf8");

  content = content
    .replace(/\.jpg/g, ".webp")
    .replace(/\.jpeg/g, ".webp")
    .replace(/\.png/g, ".webp");

  fs.writeFileSync(filePath, content);
  console.log("Updated:", filePath);
}

function scan(dir) {
  const files = fs.readdirSync(dir);

  for (const file of files) {
    const fullPath = path.join(dir, file);

    if (fs.statSync(fullPath).isDirectory()) {
      scan(fullPath);
    } else if (/\.(js|jsx|ts|tsx)$/.test(file)) {
      processFile(fullPath);
    }
  }
}

scan(SRC_DIR);

console.log("✅ All imports updated.");