import { Injectable } from '@angular/core';

interface StorageManagerInterface {
  useSessionStorage: boolean;
  prefix: string;
  separator: '.' | '-' | '_';
}

@Injectable({
  providedIn: 'root',
})
export class StorageManagerService {
  private config: StorageManagerInterface = {
    useSessionStorage: false,
    prefix: 'Minesweeper',
    separator: '.',
  } as StorageManagerInterface;

  private storeObject: Storage = this.config.useSessionStorage
    ? window.sessionStorage
    : window.localStorage;

  public constructor() {
    this.storeObject = localStorage;
  }

  public setStoreObject(storage: Storage): void {
    this.storeObject = storage;
  }

  private ensureKey(key: string): string {
    const split: Array<string> = key.split('.');
    if (split.length > 0 && split[0] !== this.config.prefix) {
      return `${this.config.prefix}${this.config.separator}${key}`;
    }
    return key;
  }

  public setItem<T>(key: string, object: T): void {
    if (!key) {
      console.error('StorageManagerService empty key');
      return;
    }
    const ensuredKey: string = this.ensureKey(key);
    this.storeObject.setItem(ensuredKey, JSON.stringify(object));
  }

  public getItem<T>(key: string): T | null {
    if (!key) {
      console.error('StorageManagerService empty key');
      return null;
    }
    const ensuredKey: string = this.ensureKey(key);
    const objectString: string | null  = this.storeObject.getItem(ensuredKey);
    if (objectString) {
      return JSON.parse(objectString) as T;
    }
    return null;
  }

  public hasItem(key: string): boolean {
    if (!key) {
      console.error('StorageManagerService empty key');
      return false;
    }

    return this.storeObject.getItem(this.ensureKey(key)) !== null;
  }

  public removeItem<T>(key: string): T | null {
    if (!key) {
      console.error('StorageManagerService empty key');
      return null;
    }
    const ensuredKey: string = this.ensureKey(key);
    if (this.hasItem(ensuredKey)) {
      const item: T | null = JSON.parse(this.storeObject.getItem(ensuredKey) || '');
      this.storeObject.removeItem(ensuredKey);
      return item;
    }
    return null;
  }
}
