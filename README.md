# @Decorators

ECMAScript7 decorators for core Angular1.x providers

### Table of Contents
- [@Module](#module)
- [@App](#requires)
- [@Inject](#inject)
- [@Service](#service)
- [@ServiceFactory](#servicefactory)
- [@Controller](#controller)
- [@Factory](#factory)
- [@Filter](#filter)
- [@ClassFactory](#classfactory)
- [@Directive](#directive)
- [@DirectiveFactory](#directivefactory)
- [@Provider](#provider)
- [@ProviderFactory](#providerfactory)
- [@Constant](#constant)
- [@Value](#value)
- [@Config](#config)
- [@Run](#run)

### [How To](#how-to-use)

# Usage

## @Module
Declare angular module with given name.

Note:
- `@Requires` decorator has to be put next line to the `@Module`.
- `ng.IModule` instance will be passed to constructor.

##### TypeScript
``` typescript
@Module('Database')
class DatabaseModule {
  constructor(
    module: ng.IModule
  ) {}
}
```

##### ES5 Angular 1.x way
```javascript
var DatabaseModule = angular.module('Database', [])
```

---

## @Requires
Define module or provider injection requirements.

##### TypeScript / ES2016 way module requirements
``` typescript
@Module('Database')
@Requires('ngResource', 'ngStorage')
class DatabaseModule {
  constructor(
    module: ng.IModule
  ) {}
}
```

##### ES5 Angular 1.x way module requirements
``` javascript
var DatabaseModule = angular.module('Database', ['ngResource', 'ngStorage'])
```

##### TypeScript / ES2016 way provider requirements
``` typescript
@Service('DbService')
@Requires('$localStorate', '$resource')
class DbService {
  constructor(
    private $localStorate: {},
    private $resource: ng.resource.IResourceService
  ) {}
}
```

##### ES5 Angular 1.x way provider requirements
``` javascript
var DatabaseModule = angular.module('Database', ['ngResource', 'ngStorage'])
function DbService ($localStorate, $resource) {
}
DbService.$inject = ['$localStorate', '$resource'];
DatabaseModule.service('dbService', DbService)
```

---

## @App
Declare angular module with given name.

Note:
- `@Requires` decorator should be put next line to the `@App`.
- If module already defined it will be used to bootstrap aplication.
- `ng.IModule` instance will be passed to constructor.
- If `window.$bootstrap` defined waits fot it's resolving to start bootstraping.

##### TypeScript
``` typescript
@App(angular.element('body'), 'Application')
@Requires('ngResource', 'ngStorage')
class Application {
  constructor(
    module: ng.IModule
  ) {}
}
```

``` typescript
@App(angular.element('body'))
@Module('Application')
@Requires('ngResource', 'ngStorage')
class Application {
  constructor(
    module: ng.IModule
  ) {}
}
```

##### ES5 Angular 1.x way
```javascript
var Application = angular.module('Application', ['ngResource', 'ngStorage'])
angular.element(document).ready(function () {
  angular.bootstrap(angular.element('body'), ['Application'])
})
```

---

## @Inject
Define parameter injection to constructor or function.

##### TypeScript / ES2016 way
``` typescript
@Service(DatabaseModule, 'DbService')
class DbService {
  constructor(
    @Inject('$localStorate') private $localStorate: {},
    @Inject('$resource') private $resource: ng.resource.IResourceService
  ) {}
}


class DbServiceFactory {
  @ServiceFactory(DatabaseModule, 'DbService')
  public static DbServiceFactory(
    @Inject('$localStorate') $localStorate: {},
    @Inject('$resource') $resource: ng.resource.IResourceService
  ) {}
}

```

##### ES5 Angular 1.x way
``` javascript
function DbService ($localStorate, $resource) {
}
DbService.$inject = ['$localStorate', '$resource'];
DatabaseModule.service('dbService', DbService)
```

---

## @Service
Declare angular service with decorated class.
New instance of service decorated class will be instantiated once.

##### TypeScript / ES2016 way
``` typescript
@Service(DatabaseModule, 'DbService')
class DbService {
  constructor(
    @Inject('$localStorate') private $localStorate: {},
    @Inject('$resource') private $resource: ng.resource.IResourceService
  ) {}
}

```

##### ES5 Angular 1.x way
``` javascript
function DbService ($localStorate, $resource) {
}
DbService.$inject = ['$localStorate', '$resource'];
DatabaseModule.service('dbService', DbService)
```

---

## @ServiceFactory
Declare angular service with decorated factory method.

##### TypeScript / ES2016 way
``` typescript
class DbServiceFactory {
  @ServiceFactory(DatabaseModule, 'DbService')
  public static DbServiceFactory(
    @Inject('$localStorate') $localStorate: {},
    @Inject('$resource') $resource: ng.resource.IResourceService
  ) {}
}

```

##### ES5 Angular 1.x way
``` javascript
function DbService ($localStorate, $resource) {
}
DbService.$inject = ['$localStorate', '$resource'];
DatabaseModule.service('dbService', DbService)
```

---

## @Controller
Declare angular with decorated class.

##### TypeScript / ES2016 way
``` typescript
@Controller(Application, 'AppController')
class AppController {
  constructor(
    @Inject('$localStorate') private $localStorate: {},
    @Inject('$resource') private $resource: ng.resource.IResourceService
  ) {}
}

```

##### ES5 Angular 1.x way
``` javascript
function AppController ($localStorate, $resource) {
}
AppController.$inject = ['$localStorate', '$resource'];
Application.service('AppController', AppController)
```

---

## @Factory
Declare angular factory as factory method.

##### TypeScript / ES2016 way
``` typescript
class ConnectionFactory {
  @Factory(Application, 'Connection')
  public static ConnectionFactory(
    @Inject('$localStorate') $localStorate: {},
    @Inject('$resource') $resource: ng.resource.IResourceService
  ) {}
}

```
##### ES5 Angular 1.x way
``` javascript
function ConnectionFactory ($localStorate, $resource) {
}
ConnectionFactory.$inject = ['$localStorate', '$resource'];
Application.factory('Connection', ConnectionFactory)
```

---

## @Filter
Declare angular filter factory with decorated factory method.

##### TypeScript / ES2016 way
``` typescript
class TimeFilterFactory {
  @Filter(Application, 'TimeFilter')
  public static TimeFilter(
    @Inject('$window') $window: ng.IWindow
  ) {}
}

```

##### ES5 Angular 1.x way
``` javascript
function TimeFilter ($window) {
}
TimeFilter.$inject = ['$window'];
Application.filter('TimeFilter', TimeFilter)
```

---

## @ClassFactory
Declare angular factory with decorated class.
New instance of factory decorated class will be instantiated for each injection.

##### TypeScript / ES2016 way
``` typescript
@ClassFactory(Application, 'Connection')
class Connection {
  constructor(
    @Inject('$localStorate') private $localStorate: {},
    @Inject('$resource') private $resource: ng.resource.IResourceService
  ) {}
}

```

##### ES5 Angular 1.x way
``` javascript
function ConnectionFactory ($localStorate, $resource) {
}
ConnectionFactory.$inject = ['$localStorate', '$resource'];
Application.factory('Connection', ConnectionFactory)
```

---

## @Directive
Declare angular directive with decorated class as controller.

##### TypeScript / ES2016 way
``` typescript
@Directive(Application, 'appComponent', {
  restrict: 'E',
  contollerAs: 'ctrl'
  template: '<div>Hello, {{ctrl.who}}!</div>'
})
class AppComponentController {
  constructor(
    @Inject('$scope') private $scope: ng.IScope
  ) {}
}

```

##### ES5 Angular 1.x way
``` javascript
function AppComponentController ($scope) {
}
AppComponentController.$inject = ['$scope'];
Application.controller('AppComponentController', ConnectionFactory)
Application.directive('appComponent', function () {
  return {
    restrict: 'E',
    controller: AppComponentController,
    contollerAs: 'ctrl'
    template: '<div>Hello, {{ctrl.who}}!</div>'
  }
})
```

---

## @DirectiveFactory
Declare angular directive with decorated factory method.

##### TypeScript / ES2016 way
``` typescript
class AppComponentFactory {

  @DirectiveFactory(Application, 'appComponent', {
    restrict: 'E',
    contollerAs: 'ctrl'
    template: '<div>Hello, {{ctrl.who}}!</div>'
  })
  public static AppComponentFactory(
    @Inject('$scope') $scope: ng.IScope
  ) {
    return {
      restrict: 'E',
      template: '<div>Hello, World!</div>'
    }
  }
}

```

##### ES5 Angular 1.x way
``` javascript
Application.directive('appComponent', function () {
  return {
    restrict: 'E',
    template: '<div>Hello, World!</div>'
  }
})
```

---

## @Provider
Declare angular service provider with decorated class.
New instance of provider decorated class will be instantiated once.

##### TypeScript / ES2016 way
``` typescript
@Provider(DatabaseModule, 'DbProvider')
class DbProvider implements ng.IServiceProviderFactory {
  constructor(
    @Inject('$locationProvider') private $locationProvider: ng.ILocationProvider
  ) {}

  public $get() {
    return this; // or anything else
  }
}

```
##### ES5 Angular 1.x way
``` javascript
function DbProvider ($locationProvider) {

}
DbProvider.prototype.$get = function () {
  return this;
}
DbProvider.$inject = ['$localStorate', '$resource'];
DatabaseModule.provider('DbProvider', DbProvider)
```

---

## @ProviderFactory
Declare angular service provider with decorated factory method.

##### TypeScript / ES2016 way
``` typescript

class DbProvider implements ng.IServiceProviderFactory {
  @ProviderFactory(DatabaseModule, 'DbProvider')
  public static DbProviderFactory(
    @Inject('$locationProvider') $locationProvider: ng.ILocationProvider
  ) {
    return  {
      $get: function () {
        return 0; // or anything else
      }
    }
  }
}

```
##### ES5 Angular 1.x way
``` javascript
function DbProvider ($locationProvider) {

}
DbProvider.prototype.$get = function () {
  return this;
}
DbProvider.$inject = ['$localStorate', '$resource'];
DatabaseModule.provider('DbProvider', DbProvider)
```

---

## @Constant
Declare angular constant provider with decorated class.
Injections are unavailable for this type of providers.

##### TypeScript / ES2016 way
``` typescript

@Constant(DatabaseModule, 'DbCredentilas')
class DbCredentilas  {
  public connectionString = 'mongodb://...';
}

```
##### ES5 Angular 1.x way
``` javascript
function DbCredentilas () {
  this.connectionString = 'mongodb://...'
}
DatabaseModule.constant('DbCredentilas', new DbCredentilas())
```

---

## @Value
Declare angular value provider with decorated class.
Injections are unavailable for this type of providers.

##### TypeScript / ES2016 way
``` typescript

@Value(DatabaseModule, 'DbCredentilas')
class DbCredentilas  {
  public connectionString = 'mongodb://...';
}

```
##### ES5 Angular 1.x way
``` javascript
function DbCredentilas () {
  this.connectionString = 'mongodb://...'
}
DatabaseModule.value('DbCredentilas', new DbCredentilas())
```

---

## @Config
Declare angular config clause with decorated class. New instance of decorated class will be instantiated inside config clause.

##### TypeScript / ES2016 way
``` typescript

@Config(DatabaseModule)
class DbConfig  {
  constructor(
    @Inject('DbCredentilas') private credentials: any
  ) {
    this.credentials; // this.constrctor === DbConfig
  }
}

```
##### ES5 Angular 1.x way
``` javascript
DatabaseModule.config(function (DbCredentilas) {

})
```

---

## @Run
Declare angular run clause with decorated class. New instance of decorated class will be instantiated inside run clause.

##### TypeScript / ES2016 way
``` typescript

@Run(DatabaseModule)
class DbConfig  {
  constructor(
    @Inject('DbCredentilas') private credentials: any
  ) {
    this.credentials; // this.constrctor === DbConfig
  }
}

```
##### ES5 Angular 1.x way
``` javascript
DatabaseModule.run(function (DbCredentilas) {

})
```

---

# How to use

`/dist/decorators.js` file oplimized for usage with SystemJS modularizer.
I use following trick to load all registered modules.

```html
<script src="build/app.vendor.js"></script> <!-- can contains system.js and decorators.js -->
<script src="bower_components/system.js/dist/system.js"></script> <!-- can be included to concatenation of 3-p libs -->
<script src="bower_components/ng-decorators/dist/system/decorators.js"></script> <!-- can be included to concatenation of 3-p libs -->
<script src="build/app.bundle.js"></script>
<script src="entry.js"></script>
```

and this small js to start application

##### entry.js
```javascript
// or any other Promise
var $injector = angular.injector(['ng']);
var $q = $injector.get('$q');

var imports = [];
for (var defined in System.defined) {
  imports.push(System.import(defined));
}

// used to ensure all modules are loaded before call angular.bootstrap(...)
window.$bootstrap = $q.all(imports)
.catch(function (err) {
  console.error(err);
  throw err;
});
```

---

# License

The MIT License (MIT)

Copyright (c) <year> <copyright holders>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.