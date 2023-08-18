import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Tile, TileType } from '../../../models/tile.model';

@Component({
  selector: 'tile',
  templateUrl: './tile.component.html',
  styleUrls: ['./tile.component.scss'],
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
