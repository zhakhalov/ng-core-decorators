declare module "decorators" {
    /**
     * Define parameter injection to constructor or function
     * @param {string} dependency - name of provider to include as
     * @returns {ParameterDecorator}
     */
    export function Inject(dependency: string): ParameterDecorator;
    /**
     * Define module or service injection requirements.
     * @param {string} requires - 1 or more names of modules to require for module injection or providers to inject to constructor.
     * @returns {ClassDecorator}
     */
    export function Requires(...requires: string[]): ClassDecorator;
    /**
     * Declare angular service as class
     * Use @Requires to declare class requirements or @Inject in case of parameter based requirement declaration.
     * @param {ng.IModule | string} module - name or instance of angular module in which service should be defined.
     * @param {string} name - name of defined service
     * @returns {ClassDecorator}
     */
    export function Service(module: ng.IModule | string, name: string): ClassDecorator;
    /**
     * Declare angular service with decorated factory method.
     * Use @Requires to declare class requirements or @Inject in case of parameter based requirement declaration.
     * @param {ng.IModule | string} module - name or instance of angular module in which service should be defined.
     * @param {string} name - name of defined service
     * @returns {MethodDecorator}
     */
    export function ServiceFactory(module: ng.IModule | string, name: string): MethodDecorator;
    /**
     * Declare angular controller as class.
     * Use @Requires to declare requirements or @Inject in case of parameter based requirement declaration.
     * @param {ng.IModule | string} module - name or instance of angular module in which service should be defined.
     * @param {string} name - name of defined controller
     * @returns {ClassDecorator}
     */
    export function Controller(module: ng.IModule | string, name: string): ClassDecorator;
    /**
     * Declare angular factory as factory method.
     * Use @Requires to declare requirements or @Inject in case of parameter based requirement declaration
     * @param {ng.IModule | string} module - name or instance of angular module in which service should be defined.
     * @param {string} name - name of defined factory
     * @returns {MethodDecorator}
     */
    export function Factory(module: ng.IModule | string, name: string): MethodDecorator;
    /**
     * Declare angular factory with decorated factory method.
     * Use @Requires to declare requirements or @Inject in case of parameter based requirement declaration.
     * @param {ng.IModule | string} module - name or instance of angular module in which service should be defined.
     * @param {string} name - name of defined filter
     * @returns {MethodDecorator}
     */
    export function Filter(module: ng.IModule | string, name: string): MethodDecorator;
    /**
     * Declare angular factory as class.
     * New instance of factory decorated class will be instantiated for each injection.
     * Use @Requires to declare requirements or @Inject in case of parameter based requirement declaration.
     * @param {ng.IModule | string} module - name or instance of angular module in which service should be defined.
     * @param {string} name - name of defined factory
     * @returns {ClassDecorator}
     */
    export function ClassFactory(module: ng.IModule | string, name: string): ClassDecorator;
    /**
     * Declare angular directive with decorated class as controller.
     * Use @Requires to declare requirements or @Inject in case of parameter based requirement declaration.
     * @param {ng.IModule | string} module - name or instance of angular module in which directive should be defined.
     * @param {string} name - name of defined directive.
     * @param {ng.IDirective} [directive] = {} - directive params.
     * @returns {ClassDecorator}
     */
    export function Directive(module: ng.IModule | string, name: string, directive?: ng.IDirective): ClassDecorator;
    /**
     * Declare angular component with decorated class as controller.
     * Use @Requires to declare requirements or @Inject in case of parameter based requirement declaration.
     * @param {ng.IModule | string} module - name or instance of angular module in which directive should be defined.
     * @param {string} name - name of defined directive.
     * @param {ng.IDirective} [directive] = {} - directive params.
     * @returns {ClassDecorator}
     */
    export function Component(module: ng.IModule | string, name: string, component?: ng.IComponentOptions): ClassDecorator;
    /**
     * Declare angular directive with decorated factory method.
     * Use @Requires to declare requirements or @Inject in case of parameter based requirement declaration.
     * @param {ng.IModule | string} module - name or instance of angular module in which directive should be defined.
     * @param {string} name - name of defined directive.
     * @param {ng.IDirective} [directive] = {} - directive params.
     * @returns {ClassDecorator}
     */
    export function DirectiveFactory(module: ng.IModule | string, name: string): MethodDecorator;
    /**
     * Declare angular service provider with decorated class.
     * Use @Requires to declare requirements or @Inject in case of parameter based requirement declaration.
     * New instance of provider decorated class will be instantiated once.
     * @param {ng.IModule | string} module - name or instance of angular module in which provider should be defined.
     * @param {string} name - name of defined provider.
     * @returns {ClassDecorator}
     */
    export function Provider(module: ng.IModule | string, name: string): ClassDecorator;
    /**
     * Declare angular service provider with decorated factory method.
     * Use @Requires to declare requirements or @Inject in case of parameter based requirement declaration.
     * @param {ng.IModule | string} module - name or instance of angular module in which provider should be defined.
     * @param {string} name - name of defined directive.
     * @returns {MethodDecorator}
     */
    export function ProviderFactory(module: ng.IModule | string, name: string): MethodDecorator;
    /**
     * Declare angular constant provider with decorated class.
     * Injections are unavailable for this type of providers.
     * @param {ng.IModule | string} module - name or instance of angular module in which constant should be defined.
     * @param {string} name - name of defined constant.
     * @returns {MethodDecorator}
     */
    export function Constant(module: ng.IModule | string, name: string): ClassDecorator;
    /**
     * Declare angular value provider with decorated class.
     * Injections are unavailable for this type of providers.
     * @param {ng.IModule | string} module - name or instance of angular module in which value should be defined.
     * @param {string} name - name of defined value.
     * @returns {MethodDecorator}
     */
    export function Value(module: ng.IModule | string, name: string): ClassDecorator;
    /**
     * Declare angular config clause with decorated class. New instance of decorated class will be instantiated inside config clause.
     * Use @Requires to declare requirements or @Inject in case of parameter based requirement declaration.
     * Only providers as constants able to be injected at config stage.
     * @param {ng.IModule | string} module - name or instance of angular module in which config clause should be defined.
     * @returns {ClassDecorator}
     */
    export function Config(module: ng.IModule | string): ClassDecorator;
    /**
     * Declare angular run clause with decorated class. New instance of decorated class will be instantiated inside run clause.
     * Use @Requires to declare requirements or @Inject in case of parameter based requirement declaration.
     * @param {ng.IModule | string} module - name or instance of angular module in which run clause should be defined.
     * @returns {ClassDecorator}
     */
    export function Run(module: ng.IModule | string): ClassDecorator;
    /**
     * Declare angular module with given name.
     * Use @Requires to declare requirements.
     * Note: @Requires decorator should be put next line to the @Module.
     * Note: angular module instance will be passed to constructor.
     * @param {string} name - name of module.
     * @returns {ClassDecorator}
     */
    export function Module(name: string): ClassDecorator;
    /**
     * Declare angular module with given name.
     * Use @Requires to declare requirements.
     * Note: @Requires decorator should be put next line to the @App.
     * Note: If module already defined it will be used to bootstrap aplication.
     * Note: angular module instance will be passed to constructor.
     * @param {string} name - name of module.
     * @returns {ClassDecorator}
     */
    export function App(element?: (string | Element | JQuery | Document), name?: string): ClassDecorator;
    /**
     *
     */
    export function Resource(module: string | ng.IModule, name: string, url: string, paramsDefault?: {
        [key: string]: string | number | boolean | (() => any);
    }, actions?: {
        [key: string]: ng.resource.IActionDescriptor;
    }, options?: {}): ClassDecorator;
    /**
     * Declare UIRouter state with decorated class as controller.
     * @link https://angular-ui.github.io/ui-router/site/#/api/ui.router
     * Note: controllerAs: $ctrl - User $ctrl for binding to controller in templates
     * @param {ng.IModule | string} module - name or instance of angular module in which config clause should be defined.
     * @param {string} stateName - name of UIRouter state state.
     * @param {ng.ui.IState} [config = {}] - state config params.
     * @returns {ClassDecorator}
     */
    export function Page(module: ng.IModule | string, stateName: string, config?: ng.ui.IState): ClassDecorator;
}
