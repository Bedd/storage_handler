import type { IGenericStorageHandler, IStorageFactory, storageHandlerConfig } from '../types/types';
import CookieStorageHandler from './CookieStorageHandler';
import LocalStorageHandler from './LocalStorageHandler';
import { cookie, localStorage } from './utils';

class StorageFactory implements IStorageFactory {

  static getStorage(config : storageHandlerConfig ) : IGenericStorageHandler {
    if (config.type === 'COOKIE') {
      return new CookieStorageHandler(config, cookie());
    }
    else if (config.type === 'LS') {
      return new LocalStorageHandler(config, localStorage());
    }
  }

}

export default StorageFactory;
