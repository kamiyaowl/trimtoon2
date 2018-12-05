import { Component, ViewChild } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { PredictService } from '../service/predict.service';
import { filter } from 'rxjs/operators';
import { DomSanitizer } from '@angular/platform-browser';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  @ViewChild('videoElement') videoElement;
  @ViewChild('bufferCanvas') bufferCanvas;

  srcFile: File | null = null;
  srcFileBlobPath: any = null;
  predict: any;

  loaded$ = this.predictService.loaded$;
  /** Based on the screen size, switch from standard to one column per row */
  cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if (matches) {
        return [
          { title: 'Card 1', cols: 1, rows: 1 },
          { title: 'Card 2', cols: 1, rows: 1 },
          { title: 'Card 3', cols: 1, rows: 1 },
          { title: 'Card 4', cols: 1, rows: 1 }
        ];
      }

      return [
        { title: 'Card 1', cols: 2, rows: 1 },
        { title: 'Card 2', cols: 1, rows: 1 },
        { title: 'Card 3', cols: 1, rows: 2 },
        { title: 'Card 4', cols: 1, rows: 1 }
      ];
    })
  );

  constructor(
    private breakpointObserver: BreakpointObserver,
    private predictService: PredictService,
    private domSanitizer: DomSanitizer,
    ) {
      this.loaded$
          .subscribe(x => {
            if (!x) { return; }
            // TODO: here
          });
  }
  // Videoファイルが選択された際
  onFileSelect(event) {
    const URL = window.URL;
    const objectURL = URL.createObjectURL(this.srcFile);
    this.srcFileBlobPath = this.domSanitizer.bypassSecurityTrustUrl(objectURL);

    const video = this.videoElement.nativeElement as HTMLVideoElement;
    const canvas = this.bufferCanvas.nativeElement as HTMLCanvasElement;
    console.log(this.srcFileBlobPath, video, canvas);

    video.currentTime = 100;
  }
  onCapture() {
    const width = 80;
    const height = 45;

    const video = this.videoElement.nativeElement as HTMLVideoElement;
    const canvas = this.bufferCanvas.nativeElement as HTMLCanvasElement;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(video, 0, 0, width, height);
    const data = ctx.getImageData(0, 0, width, height);
    let sum = 0;
    data.data.forEach(v => { sum += v; });
    console.log('sum', sum);

    const result = this.predictService.predict(data);
    this.predict = result;
  }
}
