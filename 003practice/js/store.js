/**
 * Created by Administrator on 2016/4/28.
 */
(function (exports) {
    var TODO_STORAGE_KEY="TODO_STORAGE_KEY"
    exports.todoStorage={
        fetch:function () {
            return JSON.parse(window.localStorage.getItem(TODO_STORAGE_KEY)||"[]")
        },
        save:function (todos) {
            window.localStorage.setItem(TODO_STORAGE_KEY,JSON.stringify(todos))
        }
    }
})(window)