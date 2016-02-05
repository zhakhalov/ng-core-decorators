/// <reference path="../typings/angularjs/angular.d.ts" />

interface ModuleConstructor extends FunctionConstructor {
  new (module: ng.IModule): any;
  $name: string;
}

interface IWindow extends Window {
  $importPromise: ng.IPromise<any>;
}

export function Inject(dependency: string): ParameterDecorator {
  return function(target: any, key: string, index: number) {
    target = key ? target[key] : target;
    target.$inject = target.$inject || [];
      target.$inject[index] = dependency;
  };
}

export function Depencencies(...dependencies: string[]): ClassDecorator {
  return function(target: Function) {
    target.$inject = dependencies || [];
  };
}

export function Service(module: ng.IModule | string, name: string): ClassDecorator {
  return function(target: Function) {
    module = getModule(module);
    (module as ng.IModule).service(name, target);
  };
}

export function ServiceFactory(module: ng.IModule | string, name: string): MethodDecorator {
  return function(target: any, key: string) {
    module = getModule(module);
    (module as ng.IModule).service(name, target[key]);
  };
}

export function Controller(module: ng.IModule | string, name: string): ClassDecorator {
  return function(target: Function) {
    module = getModule(module);
    (module as ng.IModule).controller(name, target);
  };
}

export function Factory(module: ng.IModule | string, name: string): ClassDecorator {
  return function(target: FunctionConstructor) {

    function factory() {
      const context = Object.create(target.prototype);
      return target.apply(context, arguments);
    }
    factory.$inject = target.$inject || [];

    module = getModule(module);
    (module as ng.IModule).factory(name, factory);
  };
}

export function Directive(module: ng.IModule | string, name: string, directive: ng.IDirective): ClassDecorator {
  return function(target: FunctionConstructor) {
    module = getModule(module);
    (module as ng.IModule).directive(name, function() {
        return angular.extend(directive || {}, { controller: target });
      });
  };
}

export function Provider(module: ng.IModule | string, name: string): ClassDecorator {
  return function(target: ng.IServiceProviderFactory) {
    module = getModule(module);
    (module as ng.IModule).provider(name, target);
  };
}

export function Constant(module: ng.IModule | string, name: string): ClassDecorator {
  return function(target: FunctionConstructor) {
    module = getModule(module);
    (module as ng.IModule).constant(name, new target());
  };
}

export function Value(module: ng.IModule | string, name: string): ClassDecorator {
  return function(target: FunctionConstructor) {
    module = getModule(module);
    (module as ng.IModule).value(name, new target());
  };
}

export function Config(module: ng.IModule | string): ClassDecorator {
  return function(target: FunctionConstructor) {

    function config() {
      const context = Object.create(target.prototype);
      target.apply(context, arguments);
    }
    config.$inject = target.$inject || [];

    module = getModule(module);
    (module as ng.IModule).config(config);
  };
}

export function Run(module: ng.IModule | string): ClassDecorator {
  return function(target: FunctionConstructor) {

    function run() {
      const context = Object.create(target.prototype);
      target.apply(context, arguments);
    }
    run.$inject = target.$inject || [];

    module = getModule(module);
    (module as ng.IModule).run(run);
  };
}

/**
 * Use @ngDepencencies to declare dependencies
 */
export function Module(name: string): ClassDecorator {
  return function(target: ModuleConstructor) {
    target.$name = name;
    new target(angular.module(name, target.$inject || []));
  };
}

/**
 * If name specified new module will be registered.
 * Use @ngDepencencies to declare dependencies
 */
export function App(element: string | Element | JQuery | Document, name?: string): ClassDecorator {
  return function(target: ModuleConstructor) {
    if (name) {
      target.$name = name;
      new target(angular.module(name, target.$inject || []));
    }

    function bootstrap() {
      document.addEventListener("DOMContentLoaded", () => {
        angular.bootstrap(element, [target.$name]);
      });
    }

    if ((window as IWindow).$importPromise) {
      (window as IWindow).$importPromise.then(bootstrap);
    } else {
      bootstrap();
    }
  };
}


function getModule(module: ng.IModule | string) {
  return (angular.isString(module)
    ? angular.module(module as string)
    : (module as ng.IModule));
}
