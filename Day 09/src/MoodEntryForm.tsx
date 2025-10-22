import { useState } from "react";
import type { MoodEntry } from "./types";

export function MoodEntryForm({
  onSave,
  defaultDate,
}: {
  onSave: (e: MoodEntry) => void;
  defaultDate: string;
}) {
  const [date, setDate] = useState(defaultDate);
  const [mood, setMood] = useState(5);
  const [note, setNote] = useState("");
  return (
    <div
      style={{
        display: "flex",
        gap: 8,
        alignItems: "center",
        flexWrap: "wrap",
      }}
    >
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />
      <input
        type="number"
        min={1}
        max={10}
        value={mood}
        onChange={(e) => setMood(Number(e.target.value))}
      />
      <input
        type="text"
        placeholder="Note (optional)"
        value={note}
        onChange={(e) => setNote(e.target.value)}
        style={{ flex: 1, minWidth: 240 }}
      />
      <button
        onClick={() => onSave({ date, mood, note: note.trim() || undefined })}
      >
        Save
      </button>
    </div>
  );
}