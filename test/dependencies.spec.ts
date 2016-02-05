/// <reference path="../typings/tsd.d.ts" />

import {
Depencencies,
Module
} from 'src/decorators';

describe('#Depencencies', () => {

  it('should define dependencies', () => {
    @Depencencies('dep1', 'dep2')
    class Modude3 {

    }

    expect(Modude3.$inject).toBeDefined();
    expect(Modude3.$inject.length).toBe(2);
  });

  it('should inject module requires', () => {

    angular.module('module5#Depencencies', [])
      .constant('const5_Depencencies_Const', 'const5_Depencencies_Value');

    @Module('module4#Depencencies')
    @Depencencies('module5#Depencencies')
    class Modude4 {

    }

    expect(Modude4.$inject).toBeDefined();
    expect(Modude4.$inject.length).toBe(1);

    expect(angular.module('module4#Depencencies').requires).toBeDefined();
    expect(angular.module('module4#Depencencies').requires.length).toBe(1);

    expect(angular.module('module4#Depencencies').requires[0]).toBe('module5#Depencencies');
  });


  it('should access provider defined in required module', () => {
    expect(angular.injector(['module4#Depencencies']).get('const5_Depencencies_Const')).toBe('const5_Depencencies_Value');
  });

});
