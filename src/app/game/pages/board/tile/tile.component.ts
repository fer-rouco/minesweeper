import { Component, EventEmitter, Input, Output } from '@angular/core';
import type { Tile } from '../../../models/tile.model';
import { TileType } from '../../../models/tile.model';

@Component({
    selector: 'tile',
    template: `
      <span
        [id]="'tile-' + tile?.getId()"
        class="tile" 
        [class.filled]="!tile?.isDiscovered() && (tile?.isTypeEmpty() || tile?.isTypeNumber() || tile?.isTypeBomb())"
        [class.bomb]="tile?.isDiscovered() && tile?.isTypeBomb()"
        [class.explosion]="tile?.isDiscovered() && tile?.isTypeExplosion()"
        [class.flag]="!tile?.isDiscovered() && tile?.isFlag()"
        (click)="onClick()"
        (contextmenu)="onContextMenuClick($event)">
        @if ((tile && tile.getNumber() > 0) && tile.isDiscovered()) 
        {
          <span
            class="tile__number"
            [class.one]="tile.isNumber(1)"
            [class.two]="tile.isNumber(2)"
            [class.three]="tile.isNumber(3)"
            [class.four]="tile.isNumber(4)"
            [class.five]="tile.isNumber(5)"
            [class.six]="tile.isNumber(6)"
          >
            {{ tile.getNumber() }}
          </span>
        } 
      </span>
    `,
    styleUrls: ['./tile.component.scss'],
    imports: []
})
export class TileComponent {
  public readonly TileTypes: typeof TileType = TileType;

  @Input() public tile: Tile | undefined = undefined;
  @Output() public change = new EventEmitter<Tile>();

  @Input() public gameOver: boolean = false;

  constructor() {}

  private updateType(): void {
    if (this.gameOver) {
      return;
    }

    if (!this.tile) {
      return;
    }

    if (this.tile.isDiscovered()) {
      return;
    }

    if (this.tile.isFlag()) {
      return;
    }

    if (this.tile.isTypeBomb()) {
      this.tile.setType(this.TileTypes.EXPLOSION);
      this.tile.setDiscovered(true);
    }

    if (
      this.tile.isTypeBomb() ||
      this.tile.isTypeEmpty() ||
      this.tile.isTypeNumber()
    ) {
      this.tile.setDiscovered(true);
    }
  }

  public onClick(): void {
    if (!this.tile) {
      return;
    }

    this.updateType();
    this.change.next(this.tile);
  }

  public onContextMenuClick(event: Event): void {
    event.preventDefault();

    if (this.gameOver) {
      return;
    }

    if (!this.tile) {
      return;
    }

    if (this.tile.isDiscovered()) {
      return;
    }

    this.tile.setFlag(!this.tile.isFlag());
    this.change.next(this.tile);
  }
}
