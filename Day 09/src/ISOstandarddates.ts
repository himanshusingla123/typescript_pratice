export function todayISO(): string {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}



export function dayOfWeekFromISO(dateISO: string): number {
  const d = new Date(dateISO + "T00:00:00");
  return d.getDay();
}