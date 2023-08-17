
export class Tile {
  private id: number = 0;
  private type: TileType = TileType.EMPTY;
  private discovered: boolean = false;
  private flag: boolean = false;
  private number: number = 0;

  public getId(): number {
    return this.id;
  }

  public setId(value: number) {
    this.id = value;
  }

  public getType(): TileType {
    return this.type;
  }

  public setType(value: TileType) {
    this.type = value;
  }

  public isDiscovered(): boolean {
    return this.discovered;
  }

  public setDiscovered(value: boolean) {
    this.discovered = value;
  }

  public getNumber(): number {
    return this.number;
  }

  public setNumber(value: number) {
    this.number = value;
  }

  public setFlag(value: boolean): void {
    this.flag = value;
  }

  public isFlag(): boolean {
    return this.flag;
  }

  private isType(tileType: TileType): boolean {
    return (this.getType() === tileType);
  }

  public isTypeEmpty(): boolean {
    return this.isType(TileType.EMPTY);
  }

  public isTypeNumber(): boolean {
    return this.isType(TileType.NUMBER);
  }

  public isTypeBomb(): boolean {
    return this.isType(TileType.BOMB);
  }

  public isTypeExplosion(): boolean {
    return this.isType(TileType.EXPLOSION);
  }

  public isNumber(tileNumber: number): boolean {
    return (this.getNumber() === tileNumber);
  } 
}

export enum TileType {
  EMPTY = 0,
  NUMBER = 1,
  BOMB = 2,
  EXPLOSION = 4
}