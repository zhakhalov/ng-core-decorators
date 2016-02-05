/// <reference path="../typings/tsd.d.ts" />

import {
App,
} from 'src/decorators';

describe('#ngApp', () => {

  it('should define module with ngApp decorator', () => {

    @App(document, 'app')
    class Application {
      constructor(
        module: ng.IModule
        ) {
        expect(module).toBeDefined();
        expect(module).toBe(angular.module('app'));
      }
    }
  });
});
