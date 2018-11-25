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
}
