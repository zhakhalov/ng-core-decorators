export declare function Inject(dependency: string): ParameterDecorator;
export declare function Depencencies(...dependencies: string[]): ClassDecorator;
export declare function Service(module: ng.IModule | string, name: string): ClassDecorator;
export declare function ServiceFactory(module: ng.IModule | string, name: string): MethodDecorator;
export declare function Controller(module: ng.IModule | string, name: string): ClassDecorator;
export declare function Factory(module: ng.IModule | string, name: string): ClassDecorator;
export declare function Directive(module: ng.IModule | string, name: string, directive: ng.IDirective): ClassDecorator;
export declare function Provider(module: ng.IModule | string, name: string): ClassDecorator;
export declare function Constant(module: ng.IModule | string, name: string): ClassDecorator;
export declare function Value(module: ng.IModule | string, name: string): ClassDecorator;
export declare function Config(module: ng.IModule | string): ClassDecorator;
export declare function Run(module: ng.IModule | string): ClassDecorator;
/**
 * Use @ngDepencencies to declare dependencies
 */
export declare function Module(name: string): ClassDecorator;
/**
 * If name specified new module will be registered.
 * Use @ngDepencencies to declare dependencies
 */
export declare function App(element: string | Element | JQuery | Document, name?: string): ClassDecorator;
