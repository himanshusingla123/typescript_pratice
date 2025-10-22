import type { MoodEntry } from "./types.js";

const STORAGE_KEY = "moodJournal.entries.v1";
export function loadEntries(): MoodEntry[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const arr = JSON.parse(raw) as MoodEntry[];
    return arr.sort((a, b) => a.date.localeCompare(b.date));
  } catch {
    return [];
  }
}

export function saveEntries(entries: MoodEntry[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
}

export function upsertEntry(
  entries: MoodEntry[],
  entry: MoodEntry
): MoodEntry[] {
  const map = new Map(entries.map((e) => [e.date, e]));
  map.set(entry.date, entry);
  const result = Array.from(map.values()).sort((a, b) =>
    a.date.localeCompare(b.date)
  );
  saveEntries(result);
  return result;
}
