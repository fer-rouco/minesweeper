import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { TileType } from '../models/tile.model';

@Injectable({
  providedIn: 'root'
})
export class BoardService {
  private tileChange = new Subject<TileType>();

  constructor() { }

  public onTileChange(tileType: TileType) {
    this.tileChange.next(tileType);
  }

  public getTileChangesObservable(): Observable<TileType> {
    return this.tileChange.asObservable();
  }
}
