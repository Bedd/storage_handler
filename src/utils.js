// @flow
import type { ICookie, ICookieUtils, ILocalStorage, TcookieConfig } from '../types/types';

export const localStorage = () : ILocalStorage => {

  const setItem = (key : string, data : string) : void => {
    localStorage.setItem(key, data);
  };
  const removeItem = (key : string) : void =>{
    localStorage.removeItem(key);
  };
  const getItem = (key : string) : ?string => {
    return localStorage.getItem(key);
  };

  return {
    setItem : (key : string, data : string) : void => {
      setItem(key, data);
    },
    removeItem : (key : string) : void => {
      removeItem(key);
    },
    getItem : (key : string ) : ?string => {
      return getItem(key);
    }
  };
};

export const cookieUtils = () : ICookieUtils => {
  const createExpireDate = (days : ?number) => {
    const now = new Date();
    now.setDate(now.getDate() + days);
    now.toUTCString();
    return now.toUTCString();
  };
  return {
    createExpireDate : (days : ?number = 30) : string => {
      return createExpireDate(days);
    }
  };
};

export const cookie = () : ICookie => {

  const getCookie = (key : string) : ?string => {
    const name = key + "=";
    const decodedCookie = decodeURIComponent(document.cookie);
    const ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  };

  const setCookie = (key: string, data: string, config : TcookieConfig) : void => {
    config = config || {};
    if (!config.expires) {
      config.expires;
    }
    else {
      config.expires = cookieUtils().createExpireDate(null);
    }
    document.cookie = `${key}=${data};`
      + (config.path ? `;path=${config.path}` : "") +
      + (config.domain ? `;path=${config.domain}` : "") +
      + `expires=${config.expires}`;
  };

  const removeCookie = (key : string, config? : TcookieConfig) => {
    if (typeof config === 'undefined') {
      config = {};
    }
    if (getCookie(key)) {
      document.cookie = key + "=" +        
        ((config.path) ? `;path=${config.path}` : "") +
        ((config.domain) ? `;domain=${config.domain}` : "") +
        ";expires=Thu, 01 Jan 1970 00:00:01 GMT";
    }
  };

  return {
    getCookie: (key : string) : ?string => {
      return getCookie(key);
    },
    setCookie: (key: string, data: string, config : TcookieConfig): void => {
      setCookie(key, data, config);
    },
    removeCookie : (key : string, config? : TcookieConfig) : void => {
      removeCookie(key, config);
    }
  };
};
