import { Component } from "@angular/core";
import { BreakpointObserver, Breakpoints } from "@angular/cdk/layout";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { PredictService } from "./service/predict.service";
import { MatSnackBar } from "@angular/material";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {
  loaded$ = this.predictService.loaded$;
  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(map(result => result.matches));

  constructor(
    private breakpointObserver: BreakpointObserver,
    private predictService: PredictService,
    private matSnackBar: MatSnackBar
  ) {
    this.loaded$.subscribe(x => {
      if (x) {
        this.matSnackBar.open("学習済モデルの読み込みが完了しました", "OK", {
          duration: 3000
        });
      }
    });
  }
}
