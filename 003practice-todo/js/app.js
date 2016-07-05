/**
 * Created by Heiliu on 2016/4/28.
 */
(function (exports) {

    var filters = {
        all: function (todos) {
            return todos
        },
        active: function (todos) {
            return todos.filter(function (todo) {
                return !todo.completed
            })
        },
        completed: function (todos) {
            return todos.filter(function (todo) {
                return todo.completed
            })
        }
    }
    exports.app = new Vue({
        el: ".todoapp",
        data: {
            todos: todoStorage.fetch(),
            newTodo: "",
            editedTodo: null,
            visibility: 'all'
        },
        watch: {
            todos: {
                deep: true,
                handler: todoStorage.save
            }
        },
        computed: {
            remaining: function () {
                return filters.active(this.todos).length
            },
            allDone: {
                get: function () {
                    return this.remaining == 0
                },
                set: function (value) {
                    this.todos.forEach(function (todo) {
                        todo.completed = value
                    })
                }
            },
            doneMsg:function () {
                return filters.completed(this.todos).length+"/"+this.todos.length
            },
            filtedTodos:function () {
                return filters[this.visibility](this.todos)
            }
        },
        methods: {
            addTodo: function () {
                var val = this.newTodo && this.newTodo.trim()
                if (val == "") {
                    return
                }
                this.todos.unshift({title: val, completed: false})
                this.newTodo = ""
            },
            removeTodo: function (todo) {
                this.todos.$remove(todo)
            },
            editTodo: function (todo) {
                if (!todo.completed) {
                    this.beforeEditCache = todo.title
                    this.editedTodo = todo
                }
            },
            doneEdit: function (todo) {
                if (!this.editedTodo) {
                    return
                }
                this.editedTodo = null
                todo.title = todo.title.trim()
                if (!todo.title) {
                    this.removeTodo(todo)
                }
            },
            cancelEdit: function (todo) {
                this.editedTodo = null
                todo.title = this.beforeEditCache
            }
        },
        directives: {
            "todo-focus": function (value) {
                if (value) {
                    return;
                }
                var el = this.el
                Vue.nextTick(function () {
                    el.focus()
                })

            }
        }
    })
})(window)