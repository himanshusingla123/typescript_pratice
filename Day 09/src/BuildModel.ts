import * as tf from "@tensorflow/tfjs";
export function BuildModel(inputSize: number): tf.Sequential {
  const model = tf.sequential();
  model.add(
    tf.layers.dense({ units: 32, activation: "relu", inputShape: [inputSize] })
  );
  model.add(tf.layers.dropout({ rate: 0.1 }));
  model.add(tf.layers.dense({ units: 1, activation: "sigmoid" }));
  model.compile({
    optimizer: tf.train.adam(0.01),
    loss: "meanSquaredError",
    metrics: ["mse"],
  });
  return model;
}