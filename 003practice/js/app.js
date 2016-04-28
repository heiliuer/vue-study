/**
 * Created by Heiliu on 2016/4/28.
 */
(function (exports) {
    exports.app = new Vue({
        el: ".todoapp",
        data: {
            todos: todoStorage.fetch(),
            newTodo: ""
        },
        watch: {
            todos: {
                deep: true,
                handler: todoStorage.save
            }
        },
        methods: {
            addTodo: function () {
                var val=this.newTodo&&this.newTodo.trim()
                if(val==""){
                    return
                }
                this.todos.push({title:val,completed:false})
                this.newTodo=""
            },
            removeTodo:function (todo) {
                this.todos.$remove(todo)
            }
        }
    })
})(window)