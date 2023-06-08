export interface IAuthStorage {
  getItem(key: string): any;
  setItem(key: string, value: string): void;
  removeItem(key: string): void;
}
