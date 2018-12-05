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
    const labels = ['battle', 'battle_finish', 'battle_loby', 'battle_matching', 'battle_result', 'battle_rule', 'battle_start', 'loading', 'menu', 'other', 'salmon', 'salmon_lobby', 'salmon_matching', 'salmon_miss', 'salmon_result', 'salmon_start', 'weapon_select'];
    const width = 80;
    const height = 45;
    console.log(tf.memory());
    const model = await tf.loadModel('/assets/model/model.json', false);
    model.summary();
    console.log(tf.memory());
    const data = tf.fill([width, height, 3], 0); // TODO: replace canvas
    console.log(tf.memory());
    const src = data.reshape([1, width, height, 3]);
    console.log(tf.memory());
    const dst = model.predict(src) as any;
    console.log(tf.memory());
    const index = dst.argMax(1).dataSync()[0];
    const result = dst.dataSync();
    console.log(index, result);
  }
}
