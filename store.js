const Store = require('electron-store');

class DataStore extends Store {
    constructor(settings) {
        super(settings)
        this.todos = this.get('todos') || []
    }

    saveTodos() {
        this.set('todos', this.todos)
        return this
    }

    getTodos() {
        this.todos = this.get('todos') || []
    }

    addTodo(todo) {
        this.todo = [...this.todos, todo]
        return this.saveTodos()
    }

    deleteTodo(todo) {
        this.todo = this.todos.filter(t => t !== todo)
        return this.saveTodos()
    }
}

module.exports = DataStore