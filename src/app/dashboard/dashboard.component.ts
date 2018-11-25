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

  srcFile: File | null = null;
  srcFileBlobPath: string = null;

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
    const URL = window.URL || window.webkitURL;
    const objectURL = URL.createObjectURL(this.srcFile);
    this.srcFileBlobPath = this.domSanitizer.bypassSecurityTrustUrl(objectURL);
    console.log(this.srcFileBlobPath, this.videoElement);

    this.videoElement.nativeElement.currentTime = 100;

  }
}
