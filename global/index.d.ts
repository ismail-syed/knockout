// Type definitions for Knockout v3.4.0
// Project: http://knockoutjs.com
// Definitions by: Boris Yankov <https://github.com/borisyankov/>,
//                 Igor Oleinikov <https://github.com/Igorbek/>, 
//                 Clément Bourgeois <https://github.com/moonpyk/>,
//                 Maxime LUCE <https://github.com/SomaticIT/>
// Definitions: https://github.com/typed-contrib/knockout

declare module ko {    
    //#region subscribables/subscribable.js
    
    export type SubscriptionCallback<T> = (val: T) => void;
    export type MaybeSubscribable<T> = T | Subscribable<T>;
    
    export class subscription<T> {
        constructor(target: Subscribable<T>, callback: SubscriptionCallback<T>, disposeCallback: () => void);
        
        dispose(): void;
    }
    
    export interface Subscribable<T> extends Function {
	    notifySubscribers(): void;
	    notifySubscribers(valueToWrite: T): void;
	    notifySubscribers(valueToWrite: T, event: string): void;
        
        subscribe(callback: SubscriptionCallback<T>): subscription<T>;
        subscribe(callback: SubscriptionCallback<T>, callbackTarget: any): subscription<T>;
        subscribe(callback: SubscriptionCallback<T>, callbackTarget: any, event: string): subscription<T>;
        
        extend(requestedExtenders: Object): this;
        extend<T extends Subscribable<any>>(requestedExtenders: Object): T;
        
        getSubscriptionsCount(): number;
        getSubscriptionsCount(event: string): number;
    }    
    
    export class subscribable<T> implements Subscribable<T> {
        notifySubscribers(): void;
	    notifySubscribers(valueToWrite: T): void;
	    notifySubscribers(valueToWrite: T, event: string): void;
        
        subscribe(callback: SubscriptionCallback<T>): subscription<T>;
        subscribe(callback: SubscriptionCallback<T>, callbackTarget: any): subscription<T>;
        subscribe(callback: SubscriptionCallback<T>, callbackTarget: any, event: string): subscription<T>;
        
        extend(requestedExtenders: Object): this;
        extend<T extends Subscribable<any>>(requestedExtenders: Object): T;
        
        getSubscriptionsCount(): number;
        getSubscriptionsCount(event: string): number;
        
        static fn: Subscribable<any>;
        
        // Function methods
        apply(thisArg: any, argArray?: any): any;
        call(thisArg: any, ...argArray: any[]): any;
        bind(thisArg: any, ...argArray: any[]): any;
        length: number;
        arguments: any;
        caller: Function;
        prototype: any;
    }
    
    export function isSubscribable(instance: any): instance is Subscribable<any>;
    export function isSubscribable<T>(instance: any): instance is Subscribable<T>;
    
    //#endregion
    
    //#region subscribables/observable.js
    
    export type MaybeObservable<T> = T | Observable<T>;
    
    export interface ObservableFunctions<T> extends Subscribable<T> {
        equalityComparer(a: T, b: T): boolean;
        peek(): T;
        valueHasMutated(): void;
        valueWillMutate(): void;
    }
    
    export interface Observable<T> extends ObservableFunctions<T> {
        (): T;
        (value: T): this;
    }
    
    export function observable(): Observable<any>;
    export function observable<T>(): Observable<T>;
    export function observable<T>(initialValue: T): Observable<T>;
    export module observable {
        export const fn: ObservableFunctions<any>;
    }
    
    export function isObservable(instance: any): instance is Observable<any>;
    export function isObservable<T>(instance: any): instance is Observable<T>;
    
    export function isWriteableObservable(instance: any): instance is Observable<any>;
    export function isWriteableObservable<T>(instance: any): instance is Observable<T>;
    
    export function isWritableObservable(instance: any): instance is Observable<any>;
    export function isWritableObservable<T>(instance: any): instance is Observable<T>;
    
    //#endregion
    
    //#region subscribables/observableArray.js
    
    export type MaybeObservableArray<T> = T[] | ObservableArray<T>;
    
    export interface ObservableArrayFunctions<T> extends ObservableFunctions<T[]> {
        // General Array functions
        indexOf(searchElement: T, fromIndex?: number): number;
        
        slice(start: number): T[];
        slice(start: number, end?: number): T[];
        
        splice(start: number): T[];
        splice(start: number, deleteCount: number, ...items: T[]): T[];
        
        pop(): T;
        push(...items: T[]): void;
        
        shift(): T;
        unshift(...items: T[]): number;
        
        reverse(): T[];
        
        sort(): void;
        sort(compareFunction: (left: T, right: T) => number): void;

        // Ko specific
        replace(oldItem: T, newItem: T): void;

        remove(item: T): T[];
        remove(removeFunction: (item: T) => boolean): T[];
        
        removeAll(): T[];
        removeAll(items: T[]): T[];

        destroy(item: T): void;
        destroy(destroyFunction: (item: T) => boolean): void;
        
        destroyAll(): void;
        destroyAll(items: T[]): void;
    }
    
    export interface ObservableArray<T> extends Observable<T[]>, ObservableArrayFunctions<T> {}
    
    export function observableArray(): ObservableArray<any>;
    export function observableArray<T>(): ObservableArray<T>;
    export function observableArray<T>(initialValue: T[]): ObservableArray<T>;
    export module observableArray {
        export const fn: ObservableArrayFunctions<any>;
    }
    
    //#endregion
    
    //#region subscribables/dependendObservable.js
    
    export type ComputedReadFunction<T> = Subscribable<T> | Observable<T> | Computed<T> | (() => T);
    export type ComputedWriteFunction<T> = (val: T) => void;
    export type MaybeComputed<T> = T | Computed<T>;
    
    export interface ComputedFunctions<T> extends Subscribable<T> {
        equalityComparer(a: T, b: T): boolean;
        peek(): T;
        dispose(): void;                
        isActive(): boolean;
        getDependenciesCount(): number;
    }
    
    export interface Computed<T> extends ComputedFunctions<T> {
        (): T;
        (value: T): this;
    }
    
    export interface PureComputed<T> extends Computed<T> { }
    
    export interface ComputedOptions<T> {
        read?: ComputedReadFunction<T>,
        write?: ComputedWriteFunction<T>,
        owner?: any;
        pure?: boolean;
        deferEvaluation?: boolean;
        disposeWhenNodeIsRemoved?: boolean;
        disposeWhen?: () => boolean;
    }
    
    export function computed<T>(options: ComputedOptions<T>): Computed<T>;
    export function computed<T>(evaluator: ComputedReadFunction<T>): Computed<T>;
    export function computed<T>(evaluator: ComputedReadFunction<T>, evaluatorTarget: any): Computed<T>;
    export function computed<T>(evaluator: ComputedReadFunction<T>, evaluatorTarget: any, options: ComputedOptions<T>): Computed<T>;
    export module computed {
        export const fn: ComputedFunctions<any>;
    }
    
    export function pureComputed<T>(options: ComputedOptions<T>): PureComputed<T>;
    export function pureComputed<T>(evaluator: ComputedReadFunction<T>): PureComputed<T>;
    export function pureComputed<T>(evaluator: ComputedReadFunction<T>, evaluatorTarget: any): PureComputed<T>;
    export function pureComputed<T>(evaluator: ComputedReadFunction<T>, evaluatorTarget: any, options: ComputedOptions<T>): PureComputed<T>;
    
    export function dependentObservable<T>(options: ComputedOptions<T>): Computed<T>;
    export function dependentObservable<T>(evaluator: ComputedReadFunction<T>): Computed<T>;
    export function dependentObservable<T>(evaluator: ComputedReadFunction<T>, evaluatorTarget: any): Computed<T>;
    export function dependentObservable<T>(evaluator: ComputedReadFunction<T>, evaluatorTarget: any, options: ComputedOptions<T>): Computed<T>;
    export module dependentObservable {
        export const fn: ComputedFunctions<any>;
    }
    
    export function isComputed(instance: any): instance is Computed<any>;
    export function isComputed<T>(instance: any): instance is Computed<T>;
    
    export function isPureComputed(instance: any): instance is PureComputed<any>;
    export function isPureComputed<T>(instance: any): instance is PureComputed<T>;
    
    //#endregion
    
    //#region subscribables/dependencyDetection.js
    
    export interface ComputedContext {
        getDependenciesCount(): number;
        isInitial(): boolean;
    }
    
    export const computedContext: ComputedContext;
    export const dependencyDetection: ComputedContext;
    
    export function ignoreDependencies(callback: Function): void;
    export function ignoreDependencies(callback: Function, callbackTarget: any): void;
    export function ignoreDependencies(callback: Function, callbackTarget: any, callbackArgs: any[]): void;
    
    //#endregion
    
    //#region subscribables/extenders.js
    
    export interface Extender<T extends Subscribable<any>> {
        (target: T, options?: any): T;
    }
    
    export interface Extenders {
        [name: string]: Extender<any>;
        
        trackArrayChanges: Extender<ObservableArray<any>>;
        throttle: Extender<Observable<any>>;
        rateLimit: Extender<Subscribable<any>>;
        deferred: Extender<Subscribable<any>>;
        notify: Extender<Subscribable<any>>;
    }
    
    export const extenders: Extenders;
    
    //#endregion
    
    //#region subscribables/mappingHelpers.js
    
    export function toJS(rootObject: any): any;
    export function toJSON(rootObject: any): any;
    export function toJSON(rootObject: any, replacer: Function): any;
    export function toJSON(rootObject: any, replacer: Function, space: number): any;
    
    //#endregion
    
    //#region binding/bindingAttributeSyntax.js
            
    interface AllBindingsAccessor {
        (): any;
        
        get(name: string): any;
        get<T>(name: string): T;
        
        has(name: string): boolean;
    }
    export type BindingHandlerControlsDescendant = { controlsDescendantBindings: boolean; }
    export type BindingHandlerAddBinding = (name: string, value: any) => void;
    export interface BindingHandler {
        after?: string[];
        init?: (element: any, valueAccessor: () => any, allBindingsAccessor: AllBindingsAccessor, viewModel: any, bindingContext: BindingContext<any>) => void | BindingHandlerControlsDescendant;
        update?: (element: any, valueAccessor: () => any, allBindingsAccessor: AllBindingsAccessor, viewModel: any, bindingContext: BindingContext<any>) => void;
        options?: any;
        preprocess?: (value: any, name: string, addBinding?: BindingHandlerAddBinding) => void;
    }
    
    export interface BindingHandlers {
        [name: string]: BindingHandler;
    }
        
    export interface BindingContext<T> {
        ko: typeof ko;
        
        [name: string]: any;
        
        $parent: any;
        $parents: any[];
        $root: any;
        $data: T;
        $rawData: T | Observable<T>;
        $index?: Observable<number>;
        $parentContext?: BindingContext<any>;
        
        $component?: any;

        extend(properties: any): any;
        
        createChildContext<T>(dataItem: T): BindingContext<T>;
        createChildContext<T>(dataItem: T, dataItemAlias: string): BindingContext<T>;
        createChildContext<T>(dataItem: T, dataItemAlias: string, extendCallback: Function): BindingContext<T>;
        
        createChildContext<T>(accessor: () => T): BindingContext<T>;
        createChildContext<T>(dataItem: () => T, dataItemAlias: string): BindingContext<T>;
        createChildContext<T>(dataItem: () => T, dataItemAlias: string, extendCallback: Function): BindingContext<T>;
    }
    
    export function applyBindings(viewModel: any): void;
    export function applyBindings(viewModel: any, rootNode: Node): void;
    export function applyBindings(bindingContext: BindingContext<any>): void;
    export function applyBindings(bindingContext: BindingContext<any>, rootNode: Node): void;
    
    export function applyBindingsToDescendants(viewModel: any): void;
    export function applyBindingsToDescendants(viewModel: any, rootNode: Node): void;
    export function applyBindingsToDescendants(bindingContext: BindingContext<any>): void;
    export function applyBindingsToDescendants(bindingContext: BindingContext<any>, rootNode: Node): void;
    
    export function applyBindingsToNode(node: Node, bindings: Object, viewModel: any): void;
    export function applyBindingsToNode(node: Node, bindings: () => Object, viewModel: any): void;
    export function applyBindingsToNode(node: Node, bindings: Object, bindingContext: BindingContext<any>): void;
    export function applyBindingsToNode(node: Node, bindings: () => Object, bindingContext: BindingContext<any>): void;
    
    export function applyBindingAccessorsToNode(node: Node, bindings: Object, viewModel: any): void;
    export function applyBindingAccessorsToNode(node: Node, bindings: () => Object, viewModel: any): void;
    export function applyBindingAccessorsToNode(node: Node, bindings: Object, bindingContext: BindingContext<any>): void;
    export function applyBindingAccessorsToNode(node: Node, bindings: () => Object, bindingContext: BindingContext<any>): void;
    
    export function dataFor(node: Node): any;
    export function dataFor<T>(node: Node): T;

    export function contextFor(node: Node): BindingContext<any>;
    export function contextFor<T>(node: Node): BindingContext<T>;
    
    export const bindingHandlers: BindingHandlers;
    export function getBindingHandler(handler: string): BindingHandler;
    
    //#endregion
    
    //#region binding/bindingProvider.js
    
    export type BindingAccessors = { [name: string]: Function; };
    
    export interface BindingOptions {
        valueAccessors?: boolean;
        bindingParams?: boolean;
    }
    
    export interface IBindingProvider {
        nodeHasBindings(node: Node): boolean;
        getBindings(node: Node): Object;
        getBindingAccessors(node: Node): BindingAccessors;
    }
    
    export class bindingProvider {
        nodeHasBindings(node: Node): boolean;
        getBindings(node: Node): Object;
        getBindingAccessors(node: Node): BindingAccessors;
        
        getBindingsString(node: Node): string;
        getBindingsString(node: Node, bindingContext: BindingContext<any>): string;
        
        parseBindingsString(bindingsString: string, bindingContext: BindingContext<any>, node: Node): Object;
        parseBindingsString(bindingsString: string, bindingContext: BindingContext<any>, node: Node, options: BindingOptions): Object | BindingAccessors;
        
        static instance: bindingProvider;
    }
    
    //#endregion
    
    //#region binding/expressionRewriting.js

    export module expressionRewriting {
        export interface KeyValue {
            key?: string;
            value?: string;
            unknown?: string;
        }
        
        export const bindingRewriteValidators: any[];
        
        export function parseObjectLiteral(objectLiteralString: string): KeyValue[];
        
        export function preProcessBindings(bindingsString: string): string;
        export function preProcessBindings(bindingsString: string, bindingOptions: BindingOptions): string;
        export function preProcessBindings(keyValueArray: KeyValue[]): string;
        export function preProcessBindings(keyValueArray: KeyValue[], bindingOptions: BindingOptions): string;
        
        export const _twoWayBindings: Object;
    }
    
    export module jsonExpressionRewriting {
        export interface KeyValue {
            key?: string;
            value?: string;
            unknown?: string;
        }
        
        export function insertPropertyAccessorsIntoJson(bindingsString: string): string;
        export function insertPropertyAccessorsIntoJson(bindingsString: string, bindingOptions: BindingOptions): string;
        export function insertPropertyAccessorsIntoJson(keyValueArray: KeyValue[]): string;
        export function insertPropertyAccessorsIntoJson(keyValueArray: KeyValue[], bindingOptions: BindingOptions): string;
    }
    
    //#endregion
    
    //#region binding/selectExtensions.js
    
    export module selectExtensions {
        export function readValue(element: HTMLElement): any;
        
        export function writeValue(element: HTMLElement): void;
        export function writeValue(element: HTMLElement, value: any): void;
        export function writeValue(element: HTMLElement, value: any, allowUnset: boolean): void;
    }
      
    //#endregion
    
    //#region binding/defaultBindings/
        
    export interface BindingHandlers {
        // Controlling text and appearance
        visible: { 
            update(element: HTMLElement, valueAccessor: () => MaybeSubscribable<any>): void; 
        };
        text: {
            init(): BindingHandlerControlsDescendant;
            update(element: Node, valueAccessor: () => MaybeSubscribable<string>): void;
        };
        html: {
            init(): BindingHandlerControlsDescendant;
            update(element: Node, valueAccessor: () => MaybeSubscribable<string>): void;
        };
        class: {
            update(element: HTMLElement, valueAccessor: () => MaybeSubscribable<string>): void; 
        };
        css: {
            update(element: HTMLElement, valueAccessor: () => MaybeSubscribable<string | Object>): void; 
        };
        style: {
            update(element: HTMLElement, valueAccessor: () => MaybeSubscribable<Object>): void; 
        };
        attr: {
            update(element: HTMLElement, valueAccessor: () => MaybeSubscribable<Object>): void; 
        };

        // Control Flow
        foreach: {
            init(element: Node, valueAccessor: () => MaybeSubscribable<any[] | Object>): BindingHandlerControlsDescendant;
            update(element: Node, valueAccessor: () => MaybeSubscribable<any[] | Object>, allBindingsAccessor: AllBindingsAccessor, viewModel: any, bindingContext: BindingContext<any>): void;
        };
        if: {
            init(element: Node, valueAccessor: () => MaybeSubscribable<any>): BindingHandlerControlsDescendant;
            update(element: Node, valueAccessor: () => MaybeSubscribable<any>, allBindingsAccessor: AllBindingsAccessor, viewModel: any, bindingContext: BindingContext<any>): void;
        };
        ifnot: {
            init(element: Node, valueAccessor: () => MaybeSubscribable<any>): BindingHandlerControlsDescendant;
            update(element: Node, valueAccessor: () => MaybeSubscribable<any>, allBindingsAccessor: AllBindingsAccessor, viewModel: any, bindingContext: BindingContext<any>): void;
        };
        with: {
            init(element: Node, valueAccessor: () => MaybeSubscribable<any>): BindingHandlerControlsDescendant;
            update(element: Node, valueAccessor: () => MaybeSubscribable<any>, allBindingsAccessor: AllBindingsAccessor, viewModel: any, bindingContext: BindingContext<any>): void;
        };

        // Working with form fields
        event: {
            init(element: HTMLElement, valueAccessor: () => Object, allBindingsAccessor: AllBindingsAccessor, viewModel: any, bindingContext: BindingContext<any>): void;
        };
        click: {
            init(element: HTMLElement, valueAccessor: () => Function, allBindingsAccessor: AllBindingsAccessor, viewModel: any, bindingContext: BindingContext<any>): void;
        };
        submit: {
            init(element: HTMLElement, valueAccessor: () => Function, allBindingsAccessor: AllBindingsAccessor, viewModel: any, bindingContext: BindingContext<any>): void;
        };
        enable: {
            update(element: HTMLElement, valueAccessor: () => MaybeSubscribable<any>): void; 
        };
        disable: {
            update(element: HTMLElement, valueAccessor: () => MaybeSubscribable<any>): void; 
        };
        value: {
            after: string[];
            init(element: HTMLElement, valueAccessor: () => MaybeSubscribable<any>, allBindingsAccessor: AllBindingsAccessor): void;
            update(...args: any[]): void; // Keep for backwards compatibility with code that may have wrapped value binding
        };
        textInput: {
            init(element: HTMLElement, valueAccessor: () => MaybeSubscribable<string>, allBindingsAccessor: AllBindingsAccessor): void;
        };
        textinput: {
            preprocess(value: any, name: string, addBinding: BindingHandlerAddBinding): void;
        };
        hasfocus: {
            init(element: HTMLElement, valueAccessor: () => MaybeSubscribable<any>, allBindingsAccessor: AllBindingsAccessor): void;
            update(element: HTMLElement, valueAccessor: () => MaybeSubscribable<any>): void; 
        };
        hasFocus: {
            init(element: HTMLElement, valueAccessor: () => MaybeSubscribable<any>, allBindingsAccessor: AllBindingsAccessor): void;
            update(element: HTMLElement, valueAccessor: () => MaybeSubscribable<any>): void; 
        };
        checked: {
            after: string[];
            init(element: HTMLElement, valueAccessor: () => MaybeSubscribable<any>, allBindingsAccessor: AllBindingsAccessor): void;
        };
        checkedValue: {
            update(element: HTMLElement, valueAccessor: () => MaybeSubscribable<any>): void; 
        };
        options: {
            init(element: HTMLElement): BindingHandlerControlsDescendant; 
            update(element: HTMLElement, valueAccessor: () => MaybeSubscribable<any>, allBindingsAccessor: AllBindingsAccessor): void;
        };
        selectedOptions: {
            after: string[];
            init(element: HTMLElement, valueAccessor: () => MaybeSubscribable<any>, allBindingsAccessor: AllBindingsAccessor): void;
            update(element: HTMLElement, valueAccessor: () => MaybeSubscribable<any>): void; 
        };
        uniqueName: {
            init(element: HTMLElement, valueAccessor: () => boolean): void; 
        };
        
        let: {
            init(element: Node, valueAccessor: () => MaybeSubscribable<any>, allBindingsAccessor: AllBindingsAccessor, viewModel: any, bindingContext: BindingContext<any>): BindingHandlerControlsDescendant;            
        };
    }

    export interface VirtualElementsAllowedBindings {
        foreach: boolean;
        if: boolean;
        ifnot: boolean;
        with: boolean;
        let: boolean;
    }
    
    //#endregion
    
    //#region binding/editDetection/compareArrays.js
    
    export module utils {
        export interface ArrayChange<T> {
            status: string;
            value: T;
            index: number;
            moved?: number;
        }

        export interface CompareArraysOptions {
            dontLimitMoves?: boolean;
            sparse?: boolean;
        }

        export function compareArrays<T>(a: T[], b: T[]): Array<ArrayChange<T>>;
        export function compareArrays<T>(a: T[], b: T[], dontLimitMoves: boolean): Array<ArrayChange<T>>;
        export function compareArrays<T>(a: T[], b: T[], options: CompareArraysOptions): Array<ArrayChange<T>>;
    }
    
    //#endregion
    
    //#region binding/editDetection/arrayToDomNodeChildren.js
    
    export module utils {
        export type MappingFunction<T> = (valueToMap: T, index: number, nodes: Node[]) => Node[];
        export type MappingAfterAddFunction<T> = (arrayEntry: T, nodes: Node[], index: Observable<number>) => Node[];
        
        export interface MappingOptions {
            dontLimitMoves?: boolean;
            beforeMove?: (nodes: Node[]) => void;
            beforeRemove?: (nodes: Node[]) => void;
            afterAdd?: (nodes: Node[]) => void;
            afterMove?: (nodes: Node[]) => void;
            afterRemove?: (nodes: Node[]) => void;
        }
        
        export function setDomNodeChildrenFromArrayMapping<T>(domNode: Node, array: T[], mapping: MappingFunction<T>): void;
        export function setDomNodeChildrenFromArrayMapping<T>(domNode: Node, array: T[], mapping: MappingFunction<T>, options: MappingOptions): void;
        export function setDomNodeChildrenFromArrayMapping<T>(domNode: Node, array: T[], mapping: MappingFunction<T>, options: MappingOptions, callbackAfterAddingNodes: MappingAfterAddFunction<T>): void;
    }
    
    //#endregion
    
    //#region templating/templating.js
    
    export interface TemplateOptions {
        name?: string | ((val: any) => string);
        nodes?: Node[];
        
        data?: any;
        foreach?: any[];
        if?: boolean;
        
        as?: string;
        includeDestroyed?: boolean;
        
        afterRender?: (elements: Node[]) => void;
        afterAdd?: (elements: Node[]) => void;
        beforeRemove?: (elements: Node[]) => void;
    }
    
    export interface BindingHandlers {
        template: {
            init(element: Node, valueAccessor: () => MaybeSubscribable<string | TemplateOptions>): BindingHandlerControlsDescendant;
            update(element: Node, valueAccessor: () => MaybeSubscribable<string | TemplateOptions>, allBindingsAccessor: AllBindingsAccessor, viewModel: any, bindingContext: BindingContext<any>): void;
        };
    }
    export interface VirtualElementsAllowedBindings {
        template: boolean;
    }
    
    export function renderTemplate(template: string | Node | (() => string | Node), dataOrBindingContext: any | BindingContext<any>, options: TemplateOptions, targetNodeOrNodeArray: Node | Node[]): Computed<void>;
    export function renderTemplate(template: string | Node | (() => string | Node), dataOrBindingContext: any | BindingContext<any>, options: TemplateOptions, targetNodeOrNodeArray: Node | Node[], renderMode: string): Computed<void>;
    export function renderTemplate(template: string | Node | (() => string | Node), dataOrBindingContext: any | BindingContext<any>, options: TemplateOptions, targetNodeOrNodeArray: Node | Node[], renderMode: "replaceChildren"): Computed<void>;
    export function renderTemplate(template: string | Node | (() => string | Node), dataOrBindingContext: any | BindingContext<any>, options: TemplateOptions, targetNodeOrNodeArray: Node | Node[], renderMode: "replaceNode"): Computed<void>;
    export function renderTemplate(template: string | Node | (() => string | Node), dataOrBindingContext: any | BindingContext<any>, options: TemplateOptions, targetNodeOrNodeArray: Node | Node[], renderMode: "ignoreTargetNode"): Computed<void>;
    
    export function setTemplateEngine(templateEngine: templateEngine): void;
    
    //#endregion
    
    //#region templating/templateEngine.js
    
    export abstract class templateEngine {
        allowTemplateRewriting: boolean;
        
        abstract renderTemplateSource(templateSource: TemplateSource, bindingContext: BindingContext<any>, options: TemplateOptions, templateDocument?: Document): Node[];
        createJavaScriptEvaluatorBlock(script: string): string;
        
        makeTemplateSource(template: string, templateDocument?: Document): templateSources.domElement;
        makeTemplateSource(template: Node, templateDocument?: Document): templateSources.anonymousTemplate;
        
        renderTemplate(template: string | Node, bindingContext: BindingContext<any>, options: TemplateOptions, templateDocument?: Document): Node[];
        
        isTemplateRewritten(template: string | Node, templateDocument?: Document): boolean;
        rewriteTemplate(template: string | Node, rewriterCallback: (val: string) => string, templateDocument?: Document): void;
    }
    
    //#endregion
    
    //#region templating/templateSources.js
    
    export interface TemplateSource {
        text(): string;
        text(valueToWrite: string): void;
        
        data(key: string): any;
        data<T>(key: string): T;
        data<T>(key: string, valueToWrite: T): void;
        
        nodes?: {
            (): Node[];
            (valueToWrite: Node[]): void;
        };
    }
    
    export module templateSources {
        export class domElement implements TemplateSource {
            domElement: Node;
            
            constructor(element: Node);
            
            text(): string;
            text(valueToWrite: string): void;
            
            data(key: string): any;
            data<T>(key: string): T;
            data<T>(key: string, valueToWrite: T): void;
            
            nodes(): Node[];
            nodes(valueToWrite: Node[]): void;
        }
        
        export class anonymousTemplate extends domElement {
            constructor(element: Node);
        }
    }
    
    //#endregion
    
    //#region templating/native/nativeTemplateEngine.js
    
    export class nativeTemplateEngine extends templateEngine {
        renderTemplateSource(templateSource: TemplateSource, bindingContext: BindingContext<any>, options: TemplateOptions, templateDocument?: Document): Node[];
        
        static instance: nativeTemplateEngine;
    }
    
    //#endregion
    
    //#region templating/jquery.tmpl/jqueryTmplTemplateEngine.js
    
    export class jqueryTmplTemplateEngine extends templateEngine {
        jQueryTmplVersion: number;
        
        renderTemplateSource(templateSource: TemplateSource, bindingContext: BindingContext<any>, options: TemplateOptions, templateDocument?: Document): Node[];
        addTemplate(templateName: string, templateMarkup: string): void;
        
        static instance: nativeTemplateEngine;
    }
    
    //#endregion
    
    //#region components/componentBinding.js
    
    export interface BindingHandlers {
        component: {
            init(element: Node, valueAccessor: () => MaybeSubscribable<{ name: any; params: any; }>, allBindingsAccessor: AllBindingsAccessor, viewModel: any, bindingContext: BindingContext<any>): BindingHandlerControlsDescendant;
        };
    }
    export interface VirtualElementsAllowedBindings {
        component: boolean;
    }
    
    //#endregion
    
    //#region components/customElements.js
    
    export module components {
        export function getComponentNameForNode(node: Node): string;
    }
    
    //#endregion
    
    //#region components/defaultLoader.js
    
    export module components {
        export interface ViewModelParams {
            [name: string]: any;
        }
        
        export interface ComponentInfo {
            element: Node;
            templateNodes: Node[];
        }
        
        export interface Component {
            viewModel: any;
            template: Node[];
        }
        
        export interface ViewModelStatic {
            instance: any;
        }
        export interface ViewModelConstructor {
            new (params?: ViewModelParams): any;
        }
        export interface ViewModelFactory {
            createViewModel(params: ViewModelParams, componentInfo: ComponentInfo): any;
        }
        export interface TemplateElement {
            element: string | Node;
        }
        
        export type ViewModelConfig = ViewModelStatic | ViewModelParams | ViewModelFactory;
        export type TemplateConfig = string | Node[] | DocumentFragment | TemplateElement;
        export interface RequireConfig {
            require: string;
        }
        export interface Config {
            require?: string;
            viewModel?: RequireConfig | ViewModelConfig;
            template?: RequireConfig | TemplateConfig; 
            synchronous?: boolean;
        }
        
        export function register(componentName: string, config: Config): void;
        export function unregister(componentName: string): void;
        export function isRegistered(componentName: string): boolean;
        
        export interface Loader {
            getConfig(componentName: string, callback: (config: Config) => void): void;
            loadComponent(componentName: string, config: Config, callback: (component: Component) => void): void;
            loadTemplate(componentName: string, config: ViewModelConfig, callback: (template: Node[]) => void): void;
            loadViewModel(componentName: string, config: TemplateConfig, callback: (viewModel: any) => void): void;
        }
        
        export const defaultLoader: Loader;
        export const loaders: Loader[];
    }
    
    //#endregion
    
    //#region components/loaderRegistry.js
    
    export module components {
        export function get(componentName: string, callback: (definition: Component, config: Config) => void): string;
        export function clearCachedDefinition(componentName: string): void;
    }
    
    //#endregion
    
    //#region virtualElements.js
    
    export interface VirtualElementsAllowedBindings {
        [name: string]: boolean;
    }
    
    export module virtualElements {
        export const allowedBindings: VirtualElementsAllowedBindings;
        
        export function childNodes(node: Node): Node[];
        export function emptyNode(node: Node): void;
        export function firstChild(node: Node): Node;
        export function insertAfter(node: Node, nodeToInsert: Node, insertAfterNode: Node): void;
        export function nextSibling(node: Node): Node;
        export function prepend(node: Node, nodeToPrepend: Node): void;
        export function setDomNodeChildren(node: Node, childNodes: Node[]): void;
    }

    //#endregion
    
    //#region memoization.js
    
    export module memoization {
        export function memoize(callback: (val: any) => void): Node[];
        export function unmemoize(memoId: string, callbackParams: any[]): void;
        export function unmemoizeDomNodeAndDescendants(domNode: Node, extraCallbackParamsArray: any[]): void;
        export function parseMemoText(memoText: string): string;
    }

    //#endregion
    
    //#region options.js
    
    export interface Options {
        deferUpdates: boolean;
        useOnlyNativeEvents: boolean;
    }
    
    export const options: Options;
    
    //#endregion
    
    //#region tasks.js
    
    export module tasks {
        export var scheduler: (callback: () => any) => void;
        
        export function schedule(callback: () => any): number;
        export function cancel(handle: number): void;
        
        export function runEarly(): void;
    }

    //#endregion
    
    //#region utils.js
    
    export module utils {
        export interface PostJsonOptions {
            params?: Object;
            includeFields?: string[];
            submitter?: (form: HTMLFormElement) => void;
        }
        
        export function addOrRemoveItem<T>(array: MaybeObservableArray<T>, value: T, included?: boolean): T[];
        
        export function arrayForEach<T>(array: T[], action: (item: T, index: number) => void): void;
        export function arrayFirst<T>(array: T[], predicate: (item: T, index: number) => boolean): T;
        export function arrayFirst<T>(array: T[], predicate: (item: T, index: number) => boolean, predicateOwner: any): T;
        export function arrayFilter<T>(array: T[], predicate: (item: T, index: number) => boolean): T[];
        export function arrayGetDistinctValues<T>(array: T[]): T[];
        export function arrayIndexOf<T>(array: MaybeObservableArray<T>, item: T): number;
        export function arrayMap<T, U>(array: T[], mapping: (item: T, index: number) => U): U[];
        export function arrayPushAll<T>(array: MaybeObservableArray<T>, valuesToPush: T[]): T[];
        export function arrayRemoveItem<T>(array: MaybeObservableArray<T>, itemToRemove: T): void;

        export function extend<T, U>(target: T, source: U): T & U;

        export const fieldsIncludedWithJsonPost: Array<string | RegExp>;
        
        export function getFormFields(form: HTMLFormElement, fieldName: string | RegExp): any[];
        
        export function objectForEach(obj: Object, action: (key: string, value: any) => void): void;
        export function objectForEach<T>(obj: { [key: string]: T }, action: (key: string, value: T) => void): void;

        export function peekObservable<T>(value: MaybeSubscribable<T>): T;

        export function postJson(urlOrForm: string | HTMLFormElement, data: MaybeSubscribable<Object>): void;
        export function postJson(urlOrForm: string | HTMLFormElement, data: MaybeSubscribable<Object>, options: PostJsonOptions): void;
        
        export function parseJson(jsonString: string): any;
        export function parseJson<T>(jsonString: string): T;

        export function range(min: MaybeSubscribable<number>, max: MaybeSubscribable<number>): number[];

        export function registerEventHandler(element: Element, eventType: string, handler: EventListener): void;

        export function setTextContent(element: Node, textContent: MaybeSubscribable<string>): void;

        export function stringifyJson(data: MaybeSubscribable<any>): string;
        export function stringifyJson(data: MaybeSubscribable<any>, replacer: Function): string;
        export function stringifyJson(data: MaybeSubscribable<any>, replacer: Function, space: string | number): string;

        export function toggleDomNodeCssClass(node: Element, className: string, shouldHaveClass?: boolean): void;

        export function triggerEvent(element: Element, eventType: string): void;

        export function unwrapObservable<T>(value: MaybeSubscribable<T>): T;
    }
    
    export function unwrap<T>(value: MaybeSubscribable<T>): T;

    //#endregion
    
    //#region utils.domData.js
    
    export module utils {
        export module domData {
            export function get(node: Node, key: string): any;
            export function get<T>(node: Node, key: string): T;
            
            export function set<T>(node: Node, key: string, value: T): void;
            
            export function clear(node: Node): boolean;
        }
    }

    //#endregion
        
    //#region utils.domNodeDisposal.js
    
    export module utils {
        export module domNodeDisposal {
            export function addDisposeCallback(node: Node, callback: () => void): void;
            export function removeDisposeCallback (node: Node, callback: () => void): void;
            export function cleanExternalData(node: Node): void;
        }
    }
    
    export function cleanNode(node: Node): typeof node;
    export function removeNode(node: Node): void;

    //#endregion
    
    //#region utils.domManipulation.js
    
    export module utils {
        export function parseHtmlFragment(html: string, documentContext: Document): Node[];
        export function setHtml(node: Node, html: MaybeSubscribable<string>): void;
    }

    //#endregion
    
    //#region version.js
    
    export const version: string;

    //#endregion
}

declare module "knockout" {
	export = ko;
}