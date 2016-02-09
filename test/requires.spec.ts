/// <reference path="../typings/tsd.d.ts" />

import {
Requires,
Module,
Service
} from 'src/decorators';

describe('#Requires', () => {

  it('should declare module dependencies', () => {
    @Requires('dep1', 'dep2')
    @Module('Module3')
    class Modude3 {

    }

    expect(Modude3.$inject).toBeDefined();
    expect(Modude3.$inject).toContain('dep1');
    expect(Modude3.$inject).toContain('dep2');
  });

  it('should declare provider dependencies', () => {
    @Requires('dep1', 'dep2')
    @Service('Module3', 'Service3')
    class Service3 {

    }

    expect(Service3.$inject).toBeDefined();
    expect(Service3.$inject).toContain('dep1');
    expect(Service3.$inject).toContain('dep2');
  });

});
