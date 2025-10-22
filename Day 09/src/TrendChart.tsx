import { useEffect, useMemo, useRef } from "react";
import type { MoodEntry } from "./types";
export function TrendChart({
  entries,
  predicted,
}: {
  entries: MoodEntry[];
  predicted: number | null;
}) {
  const ref = useRef<HTMLCanvasElement | null>(null);
  const data = useMemo(() => entries.slice(-30), [entries]);
  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const width = canvas.width;
    const height = canvas.height;
    ctx.clearRect(0, 0, width, height);
    ctx.font = "12px sans-serif";
    const allValues = data.map((d) => d.mood);
    const values = [...allValues];
    const labels = data.map((d) => d.date.slice(5));
    let predIndex = data.length;
    if (predicted != null) {
      values.push(predicted);
      labels.push("->");
    }

    if (values.length === 0) return;
    const minV = Math.min(1, Math.floor(Math.min(...values)));
    const maxV = Math.max(10, Math.ceil(Math.max(...values)));
    const pad = 30;
    const plotW = width - pad - 10;
    const plotH = height - pad - 10;

    // axes
    ctx.strokeStyle = "#ccc";
    ctx.beginPath();
    ctx.moveTo(pad, 10);
    ctx.lineTo(pad, 10 + plotH);
    ctx.lineTo(pad + plotW, 10 + plotH);
    ctx.stroke();

    // y ticks
    ctx.fillStyle = "#666";
    for (let y = minV; y <= maxV; y++) {
      const py = 10 + plotH - ((y - minV) / (maxV - minV)) * plotH;
      ctx.fillText(String(y), 5, py + 4);
      ctx.strokeStyle = "#f1f1f1";
      ctx.beginPath();
      ctx.moveTo(pad, py);
      ctx.lineTo(pad + plotW, py);
      ctx.stroke();
    }

    // line
    const stepX = values.length > 1 ? plotW / (values.length - 1) : 0;
    ctx.strokeStyle = "#2a7";
    ctx.lineWidth = 2;
    ctx.beginPath();
    values.forEach((v, i) => {
      const x = pad + i * stepX;
      const y = 10 + plotH - ((v - minV) / (maxV - minV)) * plotH;
      if (i == 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    });
    ctx.stroke();

    // actual points
    ctx.fillStyle = "#2a7";
    data.forEach((d, i) => {
      const x = pad + i * stepX;
      const y = 10 + plotH - ((d.mood - minV) / (maxV - minV)) * plotH;
      ctx.beginPath();
      ctx.arc(x, y, 3, 0, Math.PI * 2);
      ctx.fill();
    });

    // predicted point
    if (predicted != null) {
      const x = pad + predIndex * stepX;
      const y = 10 + plotH - ((predicted - minV) / (maxV - minV)) * plotH;
      ctx.fillStyle = "#d9534f";
      ctx.beginPath();
      ctx.arc(x, y, 4, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillText("pred", x + 5, y - 5);
    }

    // x labels (sparse)
    ctx.fillStyle = "#666";
    const labelEvery = Math.max(1, Math.floor(labels.length / 6));
    labels.forEach((lab, i) => {
      if (i % labelEvery === 0 || i === labels.length - 1) {
        const x = pad + i * stepX;
        ctx.fillText(lab, x - 8, height - 2);
      }
    });
  }, [data, predicted]);

  return (
    <canvas
      ref={ref}
      width={640}
      height={240}
      style={{ width: "100%", border: "1px solid #eee", borderRadius: 6 }}
    />
  );
}
