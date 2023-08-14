
export class Tile {
  private type: TileType = TileType.FILLED;
  private show: boolean = false;
  private bomb: boolean = false;
  private flag: boolean = false;
  private number: number = 0;

  public getType(): TileType {
    return this.type;
  }

  public setType(value: TileType) {
    this.type = value;
  }

  public getShow(): boolean {
    return this.show;
  }

  public setShow(value: boolean) {
    this.show = value;
  }

  public getNumber(): number {
    return this.number;
  }
  public setNumber(value: number) {
    this.number = value;
  }

  public isBomb(): boolean {
    return this.bomb;
  }

  public setBomb(value: boolean) {
    this.bomb = value;
  }
    
  public isFlag(): boolean {
    return this.flag;
  }

  public setFlag(value: boolean) {
    this.flag = value;
  }

}

export enum TileType {
  EMPTY = 0,
  FILLED = 1,
  BOMB = 2,
  EXPLOSION = 3,
  FLAG = 4
}