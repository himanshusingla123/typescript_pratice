type InputType = Array<Array<Array<[number, number]>>>;
type OutputType = Array<Array<Array<[number, number]>>>;

function hullMethod(points: InputType): OutputType {
  const results: OutputType = [];
  points.forEach(batch => {
    const batchResult: Array<Array<[number, number]>> = [];
    batch.forEach(pointSet => {
      const hull = calculateConvexHull(pointSet);
      batchResult.push(hull);
    });
    results.push(batchResult);
  });
  return results;
}

function calculateConvexHull(points: Array<[number, number]>): Array<[number, number]> {
  if (points.length <= 1) return points;

  const sorted = [...points].sort((a, b) => a[0] - b[0] || a[1] - b[1]);
  const cross = (o: [number, number], a: [number, number], b: [number, number]) =>
    (a[0] - o[0]) * (b[1] - o[1]) - (a[1] - o[1]) * (b[0] - o[0]);

  const lower: [number, number][] = [];
  for (const p of sorted) {
    while (lower.length >= 2 && cross(lower[lower.length - 2]!, lower[lower.length - 1]!, p) <= 0) {
      lower.pop();
    }
    lower.push(p);
  }

  const upper: [number, number][] = [];
  for (const p of [...sorted].reverse()) {
    while (upper.length >= 2 && cross(upper[upper.length - 2]!, upper[upper.length - 1]!, p) <= 0) {
      upper.pop();
    }
    upper.push(p);
  }

  upper.pop();
  lower.pop();
  return lower.concat(upper);
}

const input: InputType = [
  [
    [[0, 0], [5, 3], [0, 5]],
    [[0, 0], [5, 3], [0, 5], [2, 3]],
    [[0, 0], [5, 3], [0, 5], [0, 3]],
    [[0, 0], [5, 3], [0, 5], [5, 3]],
    [[0, 0], [5, 3], [0, 5], [0, 3], [2, 3], [5, 3]]
  ]
];

console.dir(hullMethod(input), { depth: null });

