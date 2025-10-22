import React, { useEffect, useMemo, useState } from "react";
import ReactDOM from "react-dom/client";
import * as tf from "@tensorflow/tfjs";
import type {MoodEntry } from "./types";
import { TrendChart } from "./TrendChart";
import {TrainModel} from './TrainModel';
import {loadEntries , upsertEntry} from './Entry';
import {todayISO } from "./ISOstandarddates";
import {PredictNext} from './PredictNext';
import { MoodEntryForm } from "./MoodEntryForm";
import {TrendSlope} from './TrendSlope';

function App() {
  const [entries, setEntries] = useState<MoodEntry[]>(() => loadEntries());
  const [training, setTraining] = useState(false);
  const [epochInfo, setEpochInfo] = useState("");
  const [trained, setTrained] = useState<{
    model: tf.LayersModel;
    windowSize: number;
  } | null>(null);
  const [pred, setPred] = useState<number | null>(null);
  const slope = useMemo(() => TrendSlope(entries, 14), [entries]);

  const handleSave = async (entry: MoodEntry) => {
    const next = upsertEntry(entries, entry);
    setEntries(next);
  };

  useEffect(() => {
    let isCancelled = false;
    async function run() {
      if (entries.length < 8) {
        setPred(null);
        setTrained(null);
        return;
      }
      setTraining(true);
      setEpochInfo("Training...");
      const trainedModel = await TrainModel(entries, 7, (e, logs) => {
        setEpochInfo(
          `Epoch ${e + 1} - loss: ${logs?.loss?.toFixed(
            4
          )} val_mse: ${logs?.val_mse?.toFixed(4)}`
        );
      });
      if (isCancelled) {
        return;
      }
      if (trainedModel) {
        setTrained(trainedModel);
        const p = PredictNext(entries, trainedModel);
        setPred(null);
      }
      setTraining(false);
      setEpochInfo("");
    }
    run();
    return () => {
      isCancelled = true;
    };
  }, [entries]);
  return (
    <div
      style={{
        fontFamily: "Inter,system-ui,sans-serif",
        padding: 16,
        maxWidth: 840,
        margin: "0 auto",
      }}
    >
      <MoodEntryForm onSave={handleSave} defaultDate={todayISO()} />
      <div style={{ marginTop: 12 }}>
        <button
          onClick={async () => {
            if (!trained) {
              setEpochInfo("Training...");
              setTraining(true);
              const tm = await TrainModel(entries, 7, (e, logs) =>
                setEpochInfo(`Epoch ${e + 1} - loss: ${logs?.loss?.toFixed(4)}`)
              );
              if (tm) setTrained(tm);
              setTraining(false);
              setEpochInfo("");
            }
            if (trained || entries.length >= 8) {
              const t = trained ?? (await TrainModel(entries, 7));
              if (t) {
                const p = PredictNext(entries, t);
                setPred(p);
                setTrained(t);
              }
            }
          }}
          disabled={training || entries.length < 8}
        >
          {training ? "Training..." : "Retrain & Predict"}
        </button>
        <span style={{ marginLeft: 12, color: "#666" }}>{epochInfo}</span>
      </div>

      <div
        style={{ marginTop: 16, display: "flex", gap: 16, flexWrap: "wrap" }}
      >
        <div
          style={{
            padding: 12,
            border: "1px solid #eee",
            borderRadius: 8,
            minWidth: 220,
          }}
        >
          <div style={{ fontSize: 12, color: "#666" }}>Next day prediction</div>
          <div style={{ fontSize: 28 }}>{pred ? pred.toFixed(1) : "—"}</div>
        </div>
        <div
          style={{
            padding: 12,
            border: "1px solid #eee",
            borderRadius: 8,
            minWidth: 220,
          }}
        >
          <div style={{ fontSize: 12, color: "#666" }}>14-day trend slope</div>
          <div style={{ fontSize: 28 }}>
            {slope != null ? slope.toFixed(2) + " / day" : "—"}
          </div>
        </div>
      </div>

      <div style={{ marginTop: 16 }}>
        <TrendChart entries={entries} predicted={pred} />
      </div>

      <div style={{ marginTop: 16 }}>
        <h3>History</h3>
        <ul style={{ listStyle: "none", padding: 0 }}>
          {entries
            .slice()
            .reverse()
            .map((e) => (
              <li
                key={e.date}
                style={{ padding: "8px 0", borderBottom: "1px solid #f1f1f1" }}
              >
                <strong>{e.date}</strong> — mood {e.mood}
                {e.note ? (
                  <span style={{ color: "#666" }}> · {e.note}</span>
                ) : null}
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
}

const rootElement = document.getElementById("root");

if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}

