export function normalizeMood(mood: number): number {
  return (mood - 1) / 9;
}

export function denormalizeMood(mood: number): number {
  return Math.min(10, Math.max(1, 1 + mood * 9));
}