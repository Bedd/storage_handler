// @flow

import type { ICookie, IGenericStorageHandler, keyValuePair } from '../types/types';

class CookieStorageHandler implements IGenericStorageHandler {
  cookie : ICookie;
  config : keyValuePair;

  constructor(config : keyValuePair, cookie: ICookie) {
    this.cookie = cookie;
    this.config = config;
  }

  getValue(key : string) : ?string {
    return this.cookie.getCookie(key);
  }

  storeValue(key : string, value : string) : void {
    this.cookie.setCookie(key, value, this.config);
  }

  removeValue(key : string) : void {
    this.cookie.removeCookie(key, this.config);
  }

  hasValue(key : string) : boolean {
    return this.cookie.getCookie(key) !== '';
  }

}

export default CookieStorageHandler;
