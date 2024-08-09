import * as tf from '@tensorflow/tfjs';

// Define a simple model
const model = tf.sequential();
model.add(tf.layers.dense({ units: 10, inputShape: [3], activation: 'relu' }));
model.add(tf.layers.dense({ units: 1, activation: 'sigmoid' }));

model.compile({
  optimizer: 'adam',
  loss: 'binaryCrossentropy',
});

// Generate dummy training data
const xs = tf.tensor2d([[500, 10, 5], [800, 20, 15], [300, 5, 1]], [3, 3]);
const ys = tf.tensor2d([[1], [0], [1]], [3, 1]);

// Train the model
model.fit(xs, ys, {
  epochs: 10,
}).then(() => {
  model.save('localstorage://my-model');
});
