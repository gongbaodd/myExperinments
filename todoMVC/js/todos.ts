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
    defaults() {
        return {
            content:"empty todo ...",
            done:false
        }
    }

    initialize() {
        if(!this.get("content")) {
            this.set({"content":this.defaults().content});
        }
    }

    toggle() {
        this.save({done:!this.get("done")});
    }

    clear() {
        this.destroy();
    }
}

class TodoList extends Backbone.Collection<Todo> {
    model = Todo;
    localStorage = new Store("todos-backbone");

    done() {
        return this.filter(todo => todo.get('done'));
    }

    remaining() {
        return this.without.apply(this.this.done());
    }

    nextOrder() {
        if (!this.length) return 1;
        return this.last().get('order') + 1;
    }

    comparator(todo: Todo) {
        return todo.get('order');
    }
}

var Todos = new TodoList();

class TodoView extends Backbone.View {
    template: (data: any) => string;

    model: Todo;
    input: JQuery;

    constructor (options?) {
        this.tagName = "li";

        this.events = {
                    "click .check":"toggleDone",
                    "dblclick label.todo-content":"edit",
                    "click span.todo-destory":"clear",
                    "keypress .todo-input":"updateOnEnter",
                    "blur .todo-input":"close"
                 };

        super(options);

        this.template = _.template($('#item-template').html());
        _.bindAll(this,'render','close','remove');
        this.model.bind('change',this.render);
        this.model.bind('destory',this.remove);
    }

    render() {
        this.$el.html(this.template(this.model.toJSON()));
        this.input = this.$('.todo-input');
        return this;
    }

    toggleDone() {
        this.model.toggle();
    }

    edit() {
        this.$el.addClass('editing');
        this.input.focus();
    }

    close() {
        this.model.save({content:this.input.val()});
        this.$el.removeClass('editing');
    }

    updateOnEnter(e) {
        if (e.keyCode == 13) close();
    }

    clear() {
        this.model.clear();
    }
}

class AppView extends Backbone.View {
    events = {
        "keypress #new-todo":"createOnEnter",
        "keyup #new-todo":"showTooltip",
        "click .todo-clear a":"clearCompleted",
        "click .mark-all-done":"toggleAllComplete"
    };

    input: JQuery;
    allCheckbox: HTMLInputElement;
    statsTemplate: (params:any) => string;

    constructor () {
        super();

        this.setElement($("#todoapp"),true);
        _.bindAll(this, 'addOne', 'addAll', 'render', 'toggleAllComplete');

        this.input = this.$("#new-todo");
        this.allCheckbox = this.$(".mark-all-done")[0];
        this.statsTemplate = _.template($('#stats-template').html());

        Todos.bind('add', this.addOne);
        Todos.bind('reset', this.addAll);
        Todos.bind('all', this.render);

        Todos.fetch();
    }


    render() {
        var done = Todos.done().length;
        var remaining = Todos.remaining().length;

        this.$('#todo-stats').html(this.statsTemplate({
            total: Todos.length,
            done: done,
            remaining: remaining
        }));

        this.allCheckbox.checked = !remaining;
    }

    // Add a single todo item to the list by creating a view for it, and
    // appending its element to the `<ul>`.
    addOne(todo) {
        var view = new TodoView({ model: todo });
        this.$("#todo-list").append(view.render().el);
    }

    // Add all items in the **Todos** collection at once.
    addAll() {
        Todos.each(this.addOne);
    }

    // Generate the attributes for a new Todo item.
    newAttributes() {
        return {
            content: this.input.val(),
            order: Todos.nextOrder(),
            done: false
        };
    }

    // If you hit return in the main input field, create new **Todo** model,
    // persisting it to *localStorage*.
    createOnEnter(e) {
        if (e.keyCode != 13) return;
        Todos.create(this.newAttributes());
        this.input.val('');
    }

    // Clear all done todo items, destroying their models.
    clearCompleted() {
        _.each(Todos.done(), todo => todo.clear());
        return false;
    }

    tooltipTimeout: number = null;
    // Lazily show the tooltip that tells you to press `enter` to save
    // a new todo item, after one second.
    showTooltip(e) {
        var tooltip = $(".ui-tooltip-top");
        var val = this.input.val();
        tooltip.fadeOut();
        if (this.tooltipTimeout) clearTimeout(this.tooltipTimeout);
        if (val == '' || val == this.input.attr('placeholder')) return;
        this.tooltipTimeout = _.delay(() => tooltip.show().fadeIn(), 1000);
    }

    toggleAllComplete() {
        var done = this.allCheckbox.checked;
        Todos.each(todo => todo.save({ 'done': done }));
    }
}


$(() => {
    // Finally, we kick things off by creating the **App**.
    new AppView();
});

