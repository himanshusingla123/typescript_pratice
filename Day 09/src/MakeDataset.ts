import { dayOfWeekFromISO } from "./ISOstandarddates.js";
import { normalizeMood } from "./ModdValueFix.js";
import type { Dataset, MoodEntry } from "./types.js";
import * as tf from "@tensorflow/tfjs";
// create sliding windows of past window Size moods + features to predict the next mood
export function MakeDataset(entries: MoodEntry[], windowSize = 7): Dataset | null {
  if (entries.length <= windowSize) return null;
  const moods = entries.map((e) => normalizeMood(e.mood));
  const dates = entries.map((e) => e.date);

  const rows: number[][] = [];
  const labels: number[] = [];

  const rollingAvg = (endIndex: number, k = windowSize): number => {
    const start = Math.max(0, endIndex - k + 1);
    const slice = moods.slice(start, endIndex + 1);
    return slice.reduce((a, b) => a + b, 0) / slice.length;
  };

  for (let i = windowSize; i < entries.length; i++) {
    const window = moods.slice(i - windowSize, i);
    const nextDayDow = dayOfWeekFromISO(dates[i]!);
    const dowOneHot = Array(7).fill(0);
    dowOneHot[nextDayDow] = 1;
    const roll = rollingAvg(i - 1);
    const features = [...window, ...dowOneHot, roll];
    rows.push(features);
    labels.push(moods[i]!);
  }

  const featureSize = rows[0]?.length || 0;
  const xs = tf.tensor2d(rows, [rows.length, featureSize]);
  const ys = tf.tensor2d(labels, [labels.length, 1]);
  return { xs, ys, featureSize };
}