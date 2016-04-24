interface ModuleConstructor extends FunctionConstructor {
  new (module: ng.IModule): any;
  $name: string;
}

interface IWindow extends Window {
  $bootstrap: ng.IPromise<any>;
}

/**
 * Define parameter injection to constructor or function
 * @param {string} dependency - name of provider to include as
 * @returns {ParameterDecorator}
 */
export function Inject(dependency: string): ParameterDecorator {
  return function(target: any, key: string, index: number) {
    target = key ? target[key] : target;
    target.$inject = target.$inject || [];
    target.$inject[index] = dependency;
  };
}

/**
 * Define module or service injection requirements.
 * @param {string} requires - 1 or more names of modules to require for module injection or providers to inject to constructor.
 * @returns {ClassDecorator}
 */
export function Requires(...requires: string[]): ClassDecorator {
  return function(target: Function) {
    target.$inject = requires || [];
  };
}

/**
 * Declare angular service as class
 * Use @Requires to declare class requirements or @Inject in case of parameter based requirement declaration.
 * @param {ng.IModule | string} module - name or instance of angular module in which service should be defined.
 * @param {string} name - name of defined service
 * @returns {ClassDecorator}
 */
export function Service(module: ng.IModule | string, name: string): ClassDecorator {
  return function(target: Function) {
    module = resolveModule(module);
    (module as ng.IModule).service(name, target);
  };
}

/**
 * Declare angular service with decorated factory method.
 * Use @Requires to declare class requirements or @Inject in case of parameter based requirement declaration.
 * @param {ng.IModule | string} module - name or instance of angular module in which service should be defined.
 * @param {string} name - name of defined service
 * @returns {MethodDecorator}
 */
export function ServiceFactory(module: ng.IModule | string, name: string): MethodDecorator {
  return function(target: any, key: string) {
    module = resolveModule(module);
    (module as ng.IModule).service(name, target[key]);
  };
}

/**
 * Declare angular controller as class.
 * Use @Requires to declare requirements or @Inject in case of parameter based requirement declaration.
 * @param {ng.IModule | string} module - name or instance of angular module in which service should be defined.
 * @param {string} name - name of defined controller
 * @returns {ClassDecorator}
 */
export function Controller(module: ng.IModule | string, name: string): ClassDecorator {
  return function(target: Function) {
    module = resolveModule(module);
    (module as ng.IModule).controller(name, target);
  };
}


/**
 * Declare angular factory as factory method.
 * Use @Requires to declare requirements or @Inject in case of parameter based requirement declaration
 * @param {ng.IModule | string} module - name or instance of angular module in which service should be defined.
 * @param {string} name - name of defined factory
 * @returns {MethodDecorator}
 */
export function Factory(module: ng.IModule | string, name: string): MethodDecorator {
  return function(target: any, key: string) {
    module = resolveModule(module);
    (module as ng.IModule).factory(name, target[key]);
  };
}

/**
 * Declare angular factory with decorated factory method.
 * Use @Requires to declare requirements or @Inject in case of parameter based requirement declaration.
 * @param {ng.IModule | string} module - name or instance of angular module in which service should be defined.
 * @param {string} name - name of defined filter
 * @returns {MethodDecorator}
 */
export function Filter(module: ng.IModule | string, name: string): MethodDecorator {
  return function(target: any, key: string) {
    module = resolveModule(module);
    (module as ng.IModule).filter(name, target[key]);
  };
}

/**
 * Declare angular factory as class.
 * New instance of factory decorated class will be instantiated for each injection.
 * Use @Requires to declare requirements or @Inject in case of parameter based requirement declaration.
 * @param {ng.IModule | string} module - name or instance of angular module in which service should be defined.
 * @param {string} name - name of defined factory
 * @returns {ClassDecorator}
 */
export function ClassFactory(module: ng.IModule | string, name: string): ClassDecorator {
  return function(target: FunctionConstructor) {

    function factory() {
      const context = Object.create(target.prototype);
      return target.apply(context, arguments);
    }
    factory.$inject = target.$inject || [];

    module = resolveModule(module);
    (module as ng.IModule).factory(name, factory);
  };
}

/**
 * Declare angular directive with decorated class as controller.
 * Use @Requires to declare requirements or @Inject in case of parameter based requirement declaration.
 * @param {ng.IModule | string} module - name or instance of angular module in which directive should be defined.
 * @param {string} name - name of defined directive.
 * @param {ng.IDirective} [directive] = {} - directive params.
 * @returns {ClassDecorator}
 */
export function Directive(module: ng.IModule | string, name: string, directive?: ng.IDirective): ClassDecorator {
  return function(target: FunctionConstructor) {
    module = resolveModule(module);
    (module as ng.IModule).directive(name, function() {
      return angular.extend(directive || {}, { controller: target });
    });
  };
}

/**
 * Declare angular component with decorated class as controller.
 * Use @Requires to declare requirements or @Inject in case of parameter based requirement declaration.
 * @param {ng.IModule | string} module - name or instance of angular module in which directive should be defined.
 * @param {string} name - name of defined directive.
 * @param {ng.IDirective} [directive] = {} - directive params.
 * @returns {ClassDecorator}
 */
export function Component(module: ng.IModule | string, name: string, component?: ng.IComponentOptions): ClassDecorator {
  return function(target: FunctionConstructor) {
    module = resolveModule(module);
    (module as ng.IModule).component(name, angular.extend(component || {}, { controller: target }));
  };
}

/**
 * Declare angular directive with decorated factory method.
 * Use @Requires to declare requirements or @Inject in case of parameter based requirement declaration.
 * @param {ng.IModule | string} module - name or instance of angular module in which directive should be defined.
 * @param {string} name - name of defined directive.
 * @param {ng.IDirective} [directive] = {} - directive params.
 * @returns {ClassDecorator}
 */
export function DirectiveFactory(module: ng.IModule | string, name: string): MethodDecorator {
  return function(target: any, key: string) {
    module = resolveModule(module);
    (module as ng.IModule).directive(name, target[key]);
  };
}

/**
 * Declare angular service provider with decorated class.
 * Use @Requires to declare requirements or @Inject in case of parameter based requirement declaration.
 * New instance of provider decorated class will be instantiated once.
 * @param {ng.IModule | string} module - name or instance of angular module in which provider should be defined.
 * @param {string} name - name of defined provider.
 * @returns {ClassDecorator}
 */
export function Provider(module: ng.IModule | string, name: string): ClassDecorator {
  return function(target: ng.IServiceProviderFactory) {
    module = resolveModule(module);
    (module as ng.IModule).provider(name, target);
  };
}

/**
 * Declare angular service provider with decorated factory method.
 * Use @Requires to declare requirements or @Inject in case of parameter based requirement declaration.
 * @param {ng.IModule | string} module - name or instance of angular module in which provider should be defined.
 * @param {string} name - name of defined directive.
 * @returns {MethodDecorator}
 */
export function ProviderFactory(module: ng.IModule | string, name: string): MethodDecorator {
  return function(target: any, key: string) {
    module = resolveModule(module);
    (module as ng.IModule).provider(name, target[key]);
  };
}

/**
 * Declare angular constant provider with decorated class.
 * Injections are unavailable for this type of providers.
 * @param {ng.IModule | string} module - name or instance of angular module in which constant should be defined.
 * @param {string} name - name of defined constant.
 * @returns {MethodDecorator}
 */
export function Constant(module: ng.IModule | string, name: string): ClassDecorator {
  return function(target: FunctionConstructor) {
    module = resolveModule(module);
    (module as ng.IModule).constant(name, new target());
  };
}

/**
 * Declare angular value provider with decorated class.
 * Injections are unavailable for this type of providers.
 * @param {ng.IModule | string} module - name or instance of angular module in which value should be defined.
 * @param {string} name - name of defined value.
 * @returns {MethodDecorator}
 */
export function Value(module: ng.IModule | string, name: string): ClassDecorator {
  return function(target: FunctionConstructor) {
    module = resolveModule(module);
    (module as ng.IModule).value(name, new target());
  };
}

/**
 * Declare angular config clause with decorated class. New instance of decorated class will be instantiated inside config clause.
 * Use @Requires to declare requirements or @Inject in case of parameter based requirement declaration.
 * Only providers as constants able to be injected at config stage.
 * @param {ng.IModule | string} module - name or instance of angular module in which config clause should be defined.
 * @returns {ClassDecorator}
 */
export function Config(module: ng.IModule | string): ClassDecorator {
  return function(target: FunctionConstructor) {

    function config() {
      const context = Object.create(target.prototype);
      target.apply(context, arguments);
    }
    config.$inject = target.$inject || [];

    module = resolveModule(module);
    (module as ng.IModule).config(config);
  };
}

/**
 * Declare angular run clause with decorated class. New instance of decorated class will be instantiated inside run clause.
 * Use @Requires to declare requirements or @Inject in case of parameter based requirement declaration.
 * @param {ng.IModule | string} module - name or instance of angular module in which run clause should be defined.
 * @returns {ClassDecorator}
 */
export function Run(module: ng.IModule | string): ClassDecorator {
  return function(target: FunctionConstructor) {

    function run() {
      const context = Object.create(target.prototype);
      target.apply(context, arguments);
    }
    run.$inject = target.$inject || [];

    module = resolveModule(module);
    (module as ng.IModule).run(run);
  };
}

/**
 * Declare angular module with given name.
 * Use @Requires to declare requirements.
 * Note: @Requires decorator should be put next line to the @Module.
 * Note: angular module instance will be passed to constructor.
 * @param {string} name - name of module.
 * @returns {ClassDecorator}
 */
export function Module(name: string): ClassDecorator {
  return function(target: ModuleConstructor) {
    target.$name = name;
    new target(angular.module(name, target.$inject || []));
  };
}

/**
 * Declare angular module with given name.
 * Use @Requires to declare requirements.
 * Note: @Requires decorator should be put next line to the @App.
 * Note: If module already defined it will be used to bootstrap aplication.
 * Note: angular module instance will be passed to constructor.
 * @param {string} name - name of module.
 * @returns {ClassDecorator}
 */
export function App(element: (string | Element | JQuery | Document) = document, name = 'app'): ClassDecorator {
  return function(target: ModuleConstructor) {
    let module: ng.IModule;
    target.$name = name;

    try {
      module = angular.module(name);
    } catch (err) {
      module = angular.module(name, target.$inject || []);
    }
    new target(angular.module(name, target.$inject || []));

    function bootstrap() {
      angular.bootstrap(element, [target.$name]);
    }

    if ((window as IWindow).$bootstrap) {
      (window as IWindow).$bootstrap.then(bootstrap);
    } else {
      angular.element(element).ready(bootstrap);
    }
  };
}

/**
 *
 */
export function Resource(
  module: string | ng.IModule,
  name: string,
  url: string,
  paramsDefault: { [key: string]: string | number | boolean | (() => any) } = {},
  actions: { [key: string]: ng.resource.IActionDescriptor } = {},
  options: {} = {}
): ClassDecorator {
  return function (target: Function) {
    angular.element(document).ready(() => {
      module = resolveModule(module);

      (module as ng.IModule).service(`${name}__resourceClass`, target);
      (module as ng.IModule).service(name, ['$injector', `${name}__resourceClass`, function ($injector: any, resourceClass: Function) {
        const resourceProviderName = $injector.has('$pouchResource') ? '$pouchResource'
          : $injector.has('$cachedResource') ? '$cachedResource'
          : '$resource';
        const $resource = $injector.get(resourceProviderName);
        const resource = resourceProviderName === '$pouchResource' ||
          resourceProviderName === '$cachedResource'
          ? $resource(name, url, paramsDefault, actions, options)
          : $resource(url, paramsDefault, actions, options);

        angular.extend(resource, resourceClass);
        angular.extend(resource, resourceClass.constructor.prototype);

        return resource;
      }]);
    });
  };
}

/**
 * Declare UIRouter state with decorated class as controller.
 * @link https://angular-ui.github.io/ui-router/site/#/api/ui.router
 * Note: controllerAs: $ctrl - User $ctrl for binding to controller in templates
 * @param {ng.IModule | string} module - name or instance of angular module in which config clause should be defined.
 * @param {string} stateName - name of UIRouter state state.
 * @param {ng.ui.IState} [config = {}] - state config params.
 * @returns {ClassDecorator}
 */
export function Page(module: ng.IModule | string, stateName: string, config: ng.ui.IState = {}): ClassDecorator {
  return function (target: Function) {
    module = resolveModule(module);
    (module as ng.IModule).config(['$stateProvider', function ($stateProvider: ng.ui.IStateProvider) {
      $stateProvider
        .state(stateName, angular.extend({
          controller: target,
          controllerAs: '$ctrl'
        }, config));
    }]);
  };
}

function resolveModule(module: ng.IModule | string) {
  return (angular.isString(module)
    ? angular.module(module as string)
    : (module as ng.IModule));
}
