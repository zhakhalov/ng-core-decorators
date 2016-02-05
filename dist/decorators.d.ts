export declare function ngInject(dependency: string): ParameterDecorator;
export declare function ngDepencencies(...dependencies: string[]): ClassDecorator;
export declare function ngService(module: ng.IModule | string, name: string): ClassDecorator;
export declare function ngServiceFactory(module: ng.IModule | string, name: string): MethodDecorator;
export declare function ngController(module: ng.IModule | string, name: string): ClassDecorator;
export declare function ngFactory(module: ng.IModule | string, name: string): ClassDecorator;
export declare function ngDirective(module: ng.IModule | string, name: string, directive: ng.IDirective): ClassDecorator;
export declare function ngProvider(module: ng.IModule | string, name: string): ClassDecorator;
export declare function ngConstant(module: ng.IModule | string, name: string): ClassDecorator;
export declare function ngValue(module: ng.IModule | string, name: string): ClassDecorator;
export declare function ngConfig(module: ng.IModule | string): ClassDecorator;
export declare function ngRun(module: ng.IModule | string): ClassDecorator;
/**
 * Use @ngDepencencies to declare dependencies
 */
export declare function ngModule(name: string): ClassDecorator;
/**
 * If name specified new module will be registered.
 * Use @ngDepencencies to declare dependencies
 */
export declare function ngApp(element: string | Element | JQuery | Document, name?: string): ClassDecorator;
