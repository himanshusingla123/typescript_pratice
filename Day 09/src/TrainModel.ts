import { BuildModel } from "./BuildModel.js";
import { MakeDataset } from "./MakeDataset.js";
import type { MoodEntry } from "./types.js";
import * as tf from "@tensorflow/tfjs";

export async function TrainModel(
  entries: MoodEntry[],
  windowSize = 7,
  onEpoch?: (e: number, logs?: tf.Logs) => void
) {
  const ds = MakeDataset(entries, windowSize);
  if (!ds) return null;
  const model = BuildModel(ds.featureSize);
  const split = Math.max(1, Math.floor(ds.xs.shape[0] * 0.8));
  const xTrain = ds.xs.slice([0, 0], [split, ds.featureSize]);
  const yTrain = ds.ys.slice([0, 0], [split, 1]);
  const xVal = ds.xs.slice(
    [split, 0],
    [ds.xs.shape[0] - split, ds.featureSize]
  );
  const yVal = ds.ys.slice([split, 0], [ds.ys.shape[0] - split, 1]);

  const fitArgs: tf.ModelFitArgs = {
    epochs: 60,
    batchSize: 8,
    shuffle: true,
    callbacks: {
      onEpochEnd: async (epoch, logs) => {
        onEpoch?.(epoch, logs);
        await tf.nextFrame();
      },
    },
  };

  if (xVal.shape[0] > 0) {
    fitArgs.validationData = [xVal, yVal];
  }

  await model.fit(xTrain, yTrain, fitArgs);

  ds.xs.dispose();
  ds.ys.dispose();
  xTrain.dispose();
  yTrain.dispose();
  xVal.dispose();
  yVal.dispose();

  return { model, windowSize };
}
