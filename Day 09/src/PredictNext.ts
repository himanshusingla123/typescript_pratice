import { dayOfWeekFromISO } from "./ISOstandarddates.js";
import { denormalizeMood, normalizeMood } from "./ModdValueFix.js";
import type { MoodEntry } from "./types.js";
import * as tf from "@tensorflow/tfjs";
export function PredictNext(
  entries: MoodEntry[],
  trained: { model: tf.LayersModel; windowSize: number } | null
): number | null {
  if (!trained) return null;
  const { model, windowSize } = trained;
  if (entries.length < windowSize) return null;

  const recent = entries.slice(-windowSize);
  const window = recent.map((e) => normalizeMood(e.mood));

  // predict for next day: contruct features using tomorrow's day-of-week and rolling avg
  const lastDate = new Date(entries[entries.length - 1]!.date + "T00:00:00");
  const nextDate = new Date(lastDate.getTime() + 24 * 3600 * 1000);
  const nextISO = nextDate.toISOString().slice(0, 10);
  const dow = dayOfWeekFromISO(nextISO);
  const dowOneHot = Array(7).fill(0);
  dowOneHot[dow] = 1;

  const roll = window.reduce((a, b) => a + b, 0) / window.length;
  const features = tf.tensor2d(
    [...[...window, ...dowOneHot, roll]],
    [1, windowSize + 7 + 1]
  );

  const pred = model.predict(features) as tf.Tensor;
  const value = pred.dataSync()[0];
  features.dispose();
  pred.dispose();
  return denormalizeMood(value!);
}