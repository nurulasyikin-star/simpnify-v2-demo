import fs from "node:fs";

const html = fs.readFileSync("out/our-platform/index.html", "utf8");
const matches = [...html.matchAll(/src="([^"]+\.(webp|png|jpg|jpeg))"/g)].map((m) => m[1]);
console.log([...new Set(matches)].join("\n"));
