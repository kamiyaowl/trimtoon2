import { Injectable } from "@angular/core";
import * as tf from "@tensorflow/tfjs";
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class PredictService {
  loaded$ = new BehaviorSubject<boolean>(false);
  labels = [
    "battle",
    "battle_finish",
    "battle_loby",
    "battle_matching",
    "battle_result",
    "battle_rule",
    "battle_start",
    "loading",
    "menu",
    "other",
    "salmon",
    "salmon_lobby",
    "salmon_matching",
    "salmon_miss",
    "salmon_result",
    "salmon_start",
    "weapon_select"
  ];
  model: tf.Model;
  constructor() {
    tf.loadModel("/assets/model/model.json", false).then(x => {
      this.model = x;
      this.loaded$.next(true);
      console.log("model loaded", x);
    });
  }
  predict(id: any) {
    if (!this.model) {
      console.error("model not load.");
      return;
    }
    const inputData = tf
      .fromPixels(id, 3)
      .reshape([1, 80, 45, 3])
      .cast("float32")
      .div(tf.scalar(255));
    inputData.print(true);
    
    const p = (this.model.predict(inputData) as any).dataSync();
    const ps = Array.from(p).map((p, i) => { return { label: this.labels[i], p: p }});
    const argmax = p.indexOf(Math.max(...p));
    return {
      result: this.labels[argmax],
      details: ps,
    };
  }
}
