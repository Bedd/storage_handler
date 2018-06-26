// @flow
import type { IGenericStorageHandler, ILocalStorage, keyValuePair } from '../types/types';

class LocalStorageHandler implements IGenericStorageHandler {

  localStorage : ILocalStorage;
  config : keyValuePair;

  constructor(config : keyValuePair, localStorage : ILocalStorage) {
    this.config = config;
    this.localStorage = localStorage;
  }

  storeValue (key : string, data : string) {
    this.localStorage.setItem(key, data);
  }

  removeValue (key: string) : void {
    this.localStorage.removeItem(key);
  }

  getValue(key : string) : ?string {
    return this.localStorage.getItem(key);
  }

  hasValue(key: string) : boolean {
    return this.localStorage.getItem(key) !== null;
  }
  

}

export default LocalStorageHandler;
