/* global it, describe */
import sinon from 'sinon';
import { expect } from 'chai';

import CookieStorageHandler from '../src/CookieStorageHandler';
import type { ICookie, IGenericStorageHandler } from '../types/types';

describe('CookieStorageHandler', () => {

  it('is instantiable' , () => {
    const cookieSpy = sinon.spy();
    const csHandler = new CookieStorageHandler(cookieSpy);
    expect(csHandler).to.be.instanceOf(CookieStorageHandler);
  });

  describe('calls the appropriate cookie functions', () => {
    const cookieSpy : ICookie = sinon.spy();
    const csHandler : IGenericStorageHandler = new CookieStorageHandler({}, cookieSpy);

    it('calls the getCookie function', () => {
      cookieSpy.getCookie = sinon.stub();
      csHandler.getValue("key");
      expect(cookieSpy.getCookie.calledOnce).to.eq(true);
    });

    it('calls the setCookie function', () => {
      cookieSpy.setCookie = sinon.stub();
      csHandler.storeValue("key", "value");
      expect(cookieSpy.setCookie.calledOnce).to.eq(true);
    });

    it('calls the removeCookie function', () => {
      cookieSpy.removeCookie = sinon.stub();
      csHandler.removeValue("key");
      expect(cookieSpy.removeCookie.calledOnce).to.eq(true);
    });

  });

  it('gives the correct return when testing for existence values', () => {
    const cookieSpy : ICookie = sinon.spy();
    const getItemStub = sinon.stub();

    type TtestCase = {
      key: string,
      returnValue? : string,
      expectedResult : boolean
    };

    const testCases : Array<TtestCase> = [
      { key : 'existingKey', returnValue : 'existingValue', expectedResult : true },
      { key : 'nonexistingkey', returnValue: '', expectedResult : false }
    ];

    for (const testCase : TtestCase of testCases) {
      const cookieStorageHanlder : IGenericStorageHandler = new CookieStorageHandler({}, cookieSpy);
      getItemStub.withArgs(testCase.key).returns(testCase.returnValue);
      cookieSpy.getCookie = getItemStub;
      const result = cookieStorageHanlder.hasValue(testCase.key);
      expect(result).to.eq((testCase.expectedResult));
    }

  });
});
