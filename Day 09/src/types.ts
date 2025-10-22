import * as tf from "@tensorflow/tfjs";
export type MoodEntry = {
  date: string;
  mood: number; //1..10
  note?: string;
};

export type Dataset = {
  xs: tf.Tensor2D;
  ys: tf.Tensor2D;
  featureSize: number;
};