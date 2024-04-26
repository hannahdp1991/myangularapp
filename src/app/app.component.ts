import { Component, OnInit } from '@angular/core';
import { NodeService } from './nodeservice';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'myapp';
  progress = 0;

  constructor(private nodeService: NodeService) {
  }

  public ngOnInit() {
    this.nodeService.get().subscribe();
  }

  setProgress(value: Event) {
    this.progress = Number((value.target as HTMLInputElement).value);
  }
}