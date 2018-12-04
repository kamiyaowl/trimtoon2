import { Component } from '@angular/core';
import * as tf from '@tensorflow/tfjs';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor() {

  }
  async test() {
    const width = 640;
    const height = 360;
    console.log(tf.memory());
    const model = await tf.loadModel('/assets/model/model.json');
    model.summary();
    console.log(tf.memory());
    const data = tf.fill([640, 360, 3], 0); // TODO: replace canvas
    console.log(tf.memory());
    const src = data.reshape([1, 640, 360, 3]);
    console.log(tf.memory());
    const dst = model.predict(src) as any;
    console.log(tf.memory());
    const index = dst.argMax(1).dataSync()[0];
    const result = dst.dataSync();
    console.log(index, result);
  }
}
