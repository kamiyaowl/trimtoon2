import { Injectable } from '@angular/core';
import * as tf from '@tensorflow/tfjs';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PredictService {
  loaded$ = new BehaviorSubject<boolean>(false);
  model: tf.Model;
  constructor() {
    tf.loadModel('/assets/model/splat-scene-detect/model.json')
    .then(x => {
      this.model = x;
      this.loaded$.next(true);
      console.log('model loaded', x);
    });
   }
   predict(id: ImageData) {
     if (!this.model) {
       console.error('model not load.');
       return;
     }
     const inputData = this.transformImageData(id);
     const result = this.model.predict(inputData, { verbose: true });
     console.log(result);
     return result;
   }

   transformImageData(id: ImageData) {
    const dst = tf.fromPixels(id)
                  .reshape([1, 640, 360, 3])
                  .cast('float32')
                  .div(tf.scalar(255));
    console.log(dst);
    return dst;
   }
}
