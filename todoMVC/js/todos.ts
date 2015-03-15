declare module Backbone {
    export class Model {
        constructor (attr? , opts? );
        get(name: string): any;
        set(name: string,val: any):void;
        set(obj: any): void;
        save(atte?,opts?):void;
        destroy(): void;
        bind(ev: string,f: Function,ctx?: any): void;
        toJSON(): any;
    }
    export class Collection<T> {
        constructor (models? ,opts?);
        bind(ev: string,f: Function,ctx?: any):void;
        lenght:number;
        create(attrs,opts? ): any;
        each(f: (elem: T) => void):void;
        fetch(opts?:any):void;
        last():T;
        last(n:number):T[];
        filter(f:(elem:T)=>boolean):T[];
        without(...values:T[]):T[];
    }
    export class View {
        constructor (options?);
        $(selector: string) :jQuery;
        el:HTMLElement;
        $el:JQuery;
        model:Model;
        remove():void;
        delegateEvents:any;
        make(tagName:string,attrs? ,opts?):View;
        setElement(element:HTMLElement,delegate?:boolean):void;
        setElement(element:JQuery,delegate?:boolean):void;
        tagName:string;
        event:any;

        static extend : any;
    }
}
interface JQuery {
    fadeIn():jQuery;
    fadeOut():jQuery;
    focus():JQuery;
    html():JQuery;
    html(val:string):JQUery;
    show():JQuery;
    addClass(className string):JQuery;
    removeClass(className:string)JQuery;
    append(el:HTMLElement):JQuery;
    val():string;
    val(value: string):JQuery;
    attr(attrName: string):string;
}

declare var $:{
    (el:HTMLElement):JQuery;
    (selector:string):JQuery;
    (readyCallback:()=>void):JQuery;
};
declare var _:{
    each<T,U>(arr:T[],f:(elem:T)=>U):U[];
    delay(f:Function,wit:number,...arguments:any[]):number;
    template(template:string):(model:any)=>string;
    bindAll(object:any,...methdNames:string[]):void;
};
declare var Store:any;

class Todo extends Backbone.Model {

}




