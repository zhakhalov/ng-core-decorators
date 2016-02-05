/// <reference path="../typings/tsd.d.ts" />

import {
ngDepencencies,
} from 'src/decorators';

describe('#ngDepencencies', () => {
  describe('angular way', () => {
    angular.module('module1', [])
      .constant('const1', 'const1');
    beforeEach()
  })
});
