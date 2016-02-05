/// <reference path="../typings/angularjs/angular.d.ts" />
export function Inject(dependency) {
    return function (target, key, index) {
        target = key ? target[key] : target;
        target.$inject = target.$inject || [];
        target.$inject[index] = dependency;
    };
}
export function Depencencies(...dependencies) {
    return function (target) {
        target.$inject = dependencies || [];
    };
}
export function Service(module, name) {
    return function (target) {
        module = getModule(module);
        module.service(name, target);
    };
}
export function ServiceFactory(module, name) {
    return function (target, key) {
        module = getModule(module);
        module.service(name, target[key]);
    };
}
export function Controller(module, name) {
    return function (target) {
        module = getModule(module);
        module.controller(name, target);
    };
}
export function Factory(module, name) {
    return function (target) {
        function factory() {
            const context = Object.create(target.prototype);
            return target.apply(context, arguments);
        }
        factory.$inject = target.$inject || [];
        module = getModule(module);
        module.factory(name, factory);
    };
}
export function Directive(module, name, directive) {
    return function (target) {
        module = getModule(module);
        module.directive(name, function () {
            return angular.extend(directive || {}, { controller: target });
        });
    };
}
export function Provider(module, name) {
    return function (target) {
        module = getModule(module);
        module.provider(name, target);
    };
}
export function Constant(module, name) {
    return function (target) {
        module = getModule(module);
        module.constant(name, new target());
    };
}
export function Value(module, name) {
    return function (target) {
        module = getModule(module);
        module.value(name, new target());
    };
}
export function Config(module) {
    return function (target) {
        function config() {
            const context = Object.create(target.prototype);
            target.apply(context, arguments);
        }
        config.$inject = target.$inject || [];
        module = getModule(module);
        module.config(config);
    };
}
export function Run(module) {
    return function (target) {
        function run() {
            const context = Object.create(target.prototype);
            target.apply(context, arguments);
        }
        run.$inject = target.$inject || [];
        module = getModule(module);
        module.run(run);
    };
}
/**
 * Use @ngDepencencies to declare dependencies
 */
export function Module(name) {
    return function (target) {
        target.$name = name;
        new target(angular.module(name, target.$inject || []));
    };
}
/**
 * If name specified new module will be registered.
 * Use @ngDepencencies to declare dependencies
 */
export function App(element, name) {
    return function (target) {
        if (name) {
            target.$name = name;
            new target(angular.module(name, target.$inject || []));
        }
        function bootstrap() {
            document.addEventListener("DOMContentLoaded", () => {
                angular.bootstrap(element, [target.$name]);
            });
        }
        if (window.$importPromise) {
            window.$importPromise.then(bootstrap);
        }
        else {
            bootstrap();
        }
    };
}
function getModule(module) {
    return (angular.isString(module)
        ? angular.module(module)
        : module);
}
