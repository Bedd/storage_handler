// @flow
import type {
  IConcreteStorageHandler,
  IGenericStorageHandler,
  storageHandlerConfig
} from '../types/types';
import CookieStorageHandler from './CookieStorageHandler';
import LocalStorageManager from './LocalStorageHandler';
import StorageFactory from './StorageFactory';

const STORAGE_METHODS = {
  COOKIE : 'COOKIE',
  LS : 'LS'
};


const ERRORS = {
  no_valid_storage_methods : 'No valid storage method selected, please choose "COOKIE" OR "LOCALSTORAGE" as storage method',
  localstorage_not_available : 'LocalStorage is not avaiable, switching to cookie storage',
  cookies_not_available : 'Cookies are not avaiable, switching to localstorage',
};


class StorageHandler implements IConcreteStorageHandler {
  storageHandler : IGenericStorageHandler;

  constructor(config : storageHandlerConfig) { // eslint-disable-line no-undef
    this.checkAndInstantiateStorageHandler(config);
  }

  checkAndInstantiateStorageHandler(config : storageHandlerConfig) {
    if (!this.localStorageEnabled() && !this.localStorageEnabled()) {
      console.error(ERRORS.no_valid_storage_methods); // eslint-disable-line no-console
      return;
    }

    if (typeof config === 'undefined') {
      config = {};
      if (this.cookiesEnabled()) {
        config.type = STORAGE_METHODS.COOKIE;
      }
      else {
        config.type = STORAGE_METHODS.LS;
      }
    }

    if (config.type === STORAGE_METHODS.COOKIE && !this.cookiesEnabled()) {
      console.warn(ERRORS.cookies_not_available); //eslint-disable-line no-console
      config.type = STORAGE_METHODS.LS;

    } else if (config.type === STORAGE_METHODS.LS && !this.localStorageEnabled()) {
      console.warn(ERRORS.localstorage_not_available); //eslint-disable-line no-console
      config.type = STORAGE_METHODS.COOKIE;
    }

    this.storageHandler = StorageFactory.getStorage(config);
  }


  tryLocalStorage() {
    if (!this.localStorageEnabled()) {
      console.error(ERRORS.localstorage_not_available); // eslint-disable-line no-console
      return false;
    }
    this.storageHandler = new LocalStorageManager(localStorage());
    return true;
  }

  tryCookieStore() {
    if (!this.cookiesEnabled()) {
      console.error(ERRORS.cookies_not_available); // eslint-disable-line no-console
      return false;
    }
    this.storageHandler = new CookieStorageHandler(cookie());
    return true;

  }

  /**
     * retrieve a value
     * @param {string} key the key under which the value is stored
     */
  getValue(key : string) {
    return this.storageHandler.getValue(key);
  }

  /**
     * stores a key value pair
     * @param {string} key the key under which the value is stored
     * @param {string} data the value to store
     */
  storeValue(key : string, data : string) : void {
    this.storageHandler.storeValue(key, data);
  }

  /**
     * removes a value from storage
     * @param {string} key the key under which the value is stored
     */
  removeValue(key : string) : void {
    this.storageHandler.removeValue(key);
  }

  /**
     * checks whether a value exists
     * @param {string} key the key under which the value is stored
     * @returns {boolean} whether a value exists
     */
  hasValue(key : string) : boolean {
    return this.storageHandler.hasValue(key);
  }

  localStorageEnabled() : boolean {
    return navigator.cookieEnabled;
  }

  cookiesEnabled() : boolean {
    const test = 'test';
    try {
      localStorage.setItem(test, test);
      localStorage.removeItem(test);
      return true;
    } catch (e) {
      return false;
    }
  }
}

export default StorageHandler;
