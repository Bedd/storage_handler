/* global it, describe */
import { expect } from 'chai';
import { cookieUtils } from '../src/utils';


describe('Cookie Utilities', () => {
  it('sets the default expiredate to 30 days in the future', () => {
    const currentDate = new Date();

    currentDate.setDate(currentDate.getDate() + 30);

    const targetDate = currentDate.toUTCString();
    const expireDate = cookieUtils().createExpireDate();
    expect(expireDate).to.be.eq(targetDate);
  });

  it('creates appropriate expiredates when passed a day count', () => {

    const days = [2, 5, 10, 15, 20, 25];
    for (let day = 0; day < days.length; day++) {
      const currentDate = new Date();
      currentDate.setDate(currentDate.getDate() + days[day]);

      const targetDate = currentDate.toUTCString() ;
      const expireDate = cookieUtils().createExpireDate(days[day]);
      expect(expireDate).to.be.eq(targetDate);
    }

  });

});
