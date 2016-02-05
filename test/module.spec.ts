/// <reference path="../typings/tsd.d.ts" />

import {
Module,
} from 'src/decorators';

describe('#Module', () => {

  it('should define module with Module decorator', () => {

    @Module('module2#Module')
    class Module2 {
      constructor (
        module: ng.IModule
      ) {
        expect(module).toBeDefined();
        expect(module).toBe(angular.module('module2#Module'));
      }
    }
  });

  it('should access module defined with Module decorator', () => {
    angular.module('module2#Module');
  });

});
