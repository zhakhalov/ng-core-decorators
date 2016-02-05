/// <reference path="../typings/tsd.d.ts" />

import {
ngApp,
} from 'src/decorators';

describe('#ngApp', () => {

  it('should define module with ngApp decorator', () => {

    @ngApp(document, 'app')
    class App {
      constructor(
        module: ng.IModule
        ) {
        expect(module).toBeDefined();
        expect(module).toBe(angular.module('app'));
      }
    }
  });
});
