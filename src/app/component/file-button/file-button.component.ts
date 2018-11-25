import { Component, ViewChild, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-file-button',
  templateUrl: './file-button.component.html',
  styleUrls: ['./file-button.component.scss']
})
export class FileButtonComponent implements OnInit {
  @Input() disabled = false;
  @Input() accept = "";
  @Input() attachMessage = "ファイルを選択";
  @Input() noFileMessage = "ファイルが選択されていません";

  @ViewChild('fileInput') fileInput;
  
  @Input() file: File | null = null;
  @Output() fileChange = new EventEmitter<File>();

  constructor() { }
  ngOnInit() {
  }

  onClick(): void {
    this.fileInput.nativeElement.click();
  }

  onChange(): void {
    const files: { [key: string]: File } = this.fileInput.nativeElement.files;
    this.file = files[0];

    this.fileChange.emit(this.file);
  }

}
