import dns from "node:dns/promises";

try {
  const records = await dns.resolveSrv("_mongodb._tcp.trumate.fzx52n0.mongodb.net");
  console.log("✅ SRV Records:", records);
} catch (err) {
  console.error("❌ DNS Error:", err);
}