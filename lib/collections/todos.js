Todos = new Mongo.Collection('todos');

Meteor.methods({
  addTodo: function (text) {
    Todos.insert({ 
      text,
      createdAt: new Date(),
      checked: false
    })
  },
  removeTodo: function (id) {
    Todos.remove(id)
  },
  updateTodo: function (todo) {
    Todos.update({ _id: todo._id}, {$set: todo})
  }
})