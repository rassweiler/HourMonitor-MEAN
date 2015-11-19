'use strict';

describe('Pays E2E Tests:', function () {
  describe('Test pays page', function () {
    it('Should report missing credentials', function () {
      browser.get('http://localhost:3001/pays');
      expect(element.all(by.repeater('pay in pays')).count()).toEqual(0);
    });
  });
});
