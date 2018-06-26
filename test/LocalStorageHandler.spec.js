/* global it, describe */
import { expect } from 'chai';
import sinon from 'sinon';

import LocalStorageHandler from '../src/LocalStorageHandler';
import type { ILocalStorage, IGenericStorageHandler } from '../types/types';

describe('LocalStorageHandler', () => {

  it('is instantiable', () => {
    const spy : ILocalStorage = sinon.spy();
    const localStorageHandler : IGenericStorageHandler = new LocalStorageHandler(spy);
    expect(localStorageHandler).to.be.instanceOf(LocalStorageHandler);
  });

  describe('is calls the correct localstorage functions', () => {

    const spy : ILocalStorage = sinon.spy();
    const lsHandler : IGenericStorageHandler = new LocalStorageHandler({}, spy);

    it('calls the getItem function', () => {
      spy.getItem = sinon.stub();
      lsHandler.getValue('stuff');
      expect(spy.getItem.calledOnce).to.eq(true);
    });

    it('calls the setItem function', () => {
      spy.setItem = sinon.stub();
      lsHandler.storeValue('key', 'data');
      expect(spy.setItem.calledOnce).to.eq(true);
    });

    it('calls the removeValue function', () => {
      spy.removeItem = sinon.stub();
      lsHandler.removeValue('key');
      expect(spy.removeItem.calledOnce).to.eq(true);
    });

  });

  it('gives the correct return when testing for existence values', () => {
    const localStorageSpy : ILocalStorage = sinon.spy();
    const getItemStub = sinon.stub();

    type TtestCase = {
      key: string,
      returnValue? : string,
      expectedResult : boolean
    };

    const testCases : Array<TtestCase> = [
      { key : 'existingKey', returnValue : 'existingValue', expectedResult : true },
      { key : 'nonexistingkey', returnValue: null, expectedResult : false }
    ];

    for (const testCase : TtestCase of testCases) {
      const localStorageHandler : IGenericStorageHandler = new LocalStorageHandler({}, localStorageSpy);
      getItemStub.withArgs(testCase.key).returns(testCase.returnValue);
      localStorageSpy.getItem = getItemStub;
      const result = localStorageHandler.hasValue(testCase.key);
      expect(result).to.eq((testCase.expectedResult));
    }

  });

});

