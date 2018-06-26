// @flow

export type keyValuePair = { [string]: string };

export type storageHandlerConfig = {
  [string]: string,
  type : 'LS' | 'COOKIE'
};

export interface IStorageFactory {
  getStorageHandler(config : keyValuePair) : IGenericStorageHandler
}

export interface IGenericStorageHandler {
  storeValue(key : string, data : string) : void;
  removeValue(key: string) : void;
  getValue(key : string) : ?string;
  hasValue(key: string) : boolean;
}

export interface IConcreteStorageHandler extends IGenericStorageHandler {
  cookiesEnabled() : boolean;
  localStorageEnabled() : boolean;
}

export interface ILocalStorage {
    setItem(key: string, data : string) : void;
    removeItem(key : string) : void;
    getItem(key : string) : ?string
}

export type TcookieConfig = {
  expires : string,
  path? : string,
  domain? : string
};

export interface ICookie {
  setCookie(key : string, data : string, config : TcookieConfig ) : void;
  getCookie(key : string) : ?string;
  removeCookie(key : string, config : TcookieConfig) : void;
}

export interface ICookieUtils {
  createExpireDate(days? : number | null) : string;
}
