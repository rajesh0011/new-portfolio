import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const COUNTER_API_TOKEN =
  process.env.COUNTER_API_TOKEN || "ut_AtA25Bh6P79JJgT7yVNpOaOoYYydn6vP3Ik2GGrN";
const COUNTER_API_BASE =
  process.env.COUNTER_API_BASE ||
  "https://api.counterapi.dev/v2/rajesh-rathores-team-6022/first-counter-6022";

const localBackupPath = path.join(process.cwd(), "lib", "visitor_count.json");

function getLocalBackupCount() {
  try {
    if (fs.existsSync(localBackupPath)) {
      const data = JSON.parse(fs.readFileSync(localBackupPath, "utf8"));
      return data.count || 1;
    }
  } catch (e) {}
  return 1;
}

function saveLocalBackupCount(count) {
  try {
    fs.writeFileSync(
      localBackupPath,
      JSON.stringify({ count, lastUpdated: new Date().toISOString() }, null, 2),
      "utf8"
    );
  } catch (e) {}
}

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const action = searchParams.get("action"); // 'read' or null (defaults to 'up')

  const endpoint = action === "read" ? COUNTER_API_BASE : `${COUNTER_API_BASE}/up`;

  try {
    const response = await fetch(endpoint, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${COUNTER_API_TOKEN}`,
      },
      cache: "no-store",
    });

    if (response.ok) {
      const result = await response.json();
      const count = result?.data?.up_count;
      if (typeof count === "number") {
        saveLocalBackupCount(count);
        return NextResponse.json({
          count,
          activeNow: Math.floor(Math.random() * 3) + 2,
          source: "counterapi",
        });
      }
    }
  } catch (err) {
    console.error("CounterAPI request error, using fallback:", err);
  }

  // Graceful fallback to persistent backup
  const backupCount = getLocalBackupCount();
  return NextResponse.json({
    count: backupCount,
    activeNow: 2,
    source: "local-fallback",
  });
}

export async function POST() {
  try {
    const response = await fetch(`${COUNTER_API_BASE}/up`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${COUNTER_API_TOKEN}`,
      },
      cache: "no-store",
    });

    if (response.ok) {
      const result = await response.json();
      const count = result?.data?.up_count;
      if (typeof count === "number") {
        saveLocalBackupCount(count);
        return NextResponse.json({ count });
      }
    }
  } catch (err) {
    console.error("CounterAPI POST error:", err);
  }

  return NextResponse.json({ count: getLocalBackupCount() });
}
