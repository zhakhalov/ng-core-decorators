/// <reference path="../typings/tsd.d.ts" />

import {
ngModule,
} from 'src/decorators';

describe('#ngModule', () => {

  it('should fail defines module es5 way', () => {
    expect(() => angular.module('module1')).toThrow();
  });

  it('should success defines module es5 way', () => {
    angular.module('module1', []);
  });

  it('should access module es5 way', () => {
    angular.module('module1');
  });

  it('should define module with ngModule decorator', () => {

    @ngModule('module2')
    class Module2 {
      constructor (
        module: ng.IModule
      ) {
        expect(module).toBeDefined();
        expect(module).toBe(angular.module('module2'));
      }
    }
  });

  it('should access module defined with ngModule decorator', () => {
    angular.module('module2');
  });

});