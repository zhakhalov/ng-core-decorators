/// <reference path="../typings/tsd.d.ts" />

import {
Requires,
Module
} from 'src/decorators';

describe('#Requires', () => {

  it('should define dependencies', () => {
    @Requires('dep1', 'dep2')
    class Modude3 {

    }

    expect(Modude3.$inject).toBeDefined();
    expect(Modude3.$inject.length).toBe(2);
  });

  it('should inject module requires', () => {

    angular.module('module5#Requires', [])
      .constant('const5_Requires_Const', 'const5_Requires_Value');

    @Module('module4#Requires')
    @Requires('module5#Requires')
    class Modude4 {

    }

    expect(Modude4.$inject).toBeDefined();
    expect(Modude4.$inject.length).toBe(1);

    expect(angular.module('module4#Requires').requires).toBeDefined();
    expect(angular.module('module4#Requires').requires.length).toBe(1);

    expect(angular.module('module4#Requires').requires[0]).toBe('module5#Requires');
  });


  it('should access provider defined in required module', () => {
    expect(angular.injector(['module4#Requires']).get('const5_Depencencies_Const')).toBe('const5_Depencencies_Value');
  });

});
