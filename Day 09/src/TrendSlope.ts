import type { MoodEntry } from "./types.js";

export function TrendSlope(entries: MoodEntry[], loopback = 14): number | null {
  const sliced = entries.slice(-loopback);
  if (sliced.length < 2) return null;
  const n = sliced.length;
  const xs = Array.from({ length: n }, (_, i) => i + 1);
  const ys = sliced.map((e) => e.mood);
  const meanX = xs.reduce((a, b) => a + b, 0) / n;
  const meanY = ys.reduce((a, b) => a + b, 0) / n;

  let num = 0;
  let den = 0;
  for (let i = 0; i < n; i++) {
    num += (xs[i]! - meanX) * (ys[i]! - meanY);
    den += (xs[i]! - meanX) ** 2;
  }

  return den == 0 ? 0 : num / den; //mood change per day
}