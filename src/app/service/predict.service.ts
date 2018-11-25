import { Injectable } from '@angular/core';
import * as tf from '@tensorflow/tfjs';

@Injectable({
  providedIn: 'root'
})
export class PredictService {
  model: tf.Model;
  constructor() {
    tf.loadModel('/assets/model/splat-scene-detect/model.json')
    .then(x => {
      this.model = x;
      console.log('model loaded', x);
    });
   }
}
