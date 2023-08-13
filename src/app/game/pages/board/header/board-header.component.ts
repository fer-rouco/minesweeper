import { Component } from '@angular/core';

@Component({
  selector: 'board-header',
  templateUrl: './board-header.component.html',
  styleUrls: ['./board-header.component.scss']
})
export class BoardHeaderComponent {
  public timer: number = 0;
  public flagCounter: number = 0;

  public restartGame() {}
}
