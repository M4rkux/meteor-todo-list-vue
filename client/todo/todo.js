Template.todo.onCreated(function() {
  var template = this;

  template.todos = function() {
    return Todos.find({});
  };

});


Template.todo.onRendered(function() {
  var template = this;
  Vue.use(window['vue-validator']);
  var vm = new Vue({
    el: '#demo',
    data: {
      title: 'todos',
      todos: [],
      hideCompleted: false,
      newTodo: '',
      todosSubscription: null,
      subscriptionsReady: false,
      filter: null
    },
    methods: {
      addTodo: function (e) {
        e.preventDefault();
        if (this.newTodo.trim()) {
          Meteor.call('addTodo', this.newTodo);
          this.newTodo = '';
        }
      },
      removeTodo: function (id) {
        Meteor.call('removeTodo', id);
      },
      toggleChecked(todo) {
        todo.checked = !todo.checked;
        Meteor.call('updateTodo', todo);
      },
      toggleHideCompleted() {
        this.filter = this.hideCompleted ? {checked: true} : null;
        this.todos = Todos.find({});
      }
    },
    sync: {
      'todos': function() {
        return Todos.find({});
      },
      'todosSubscription': function() {
        var subscription = template.subscribe('todos');

        if (subscription.ready()) {
          return subscription;
        }
      },

      subscriptionsReady: function() {
        return template.subscriptionsReady();
      }
    },
    watch: {
      hideCompleted: function () {
        this.toggleHideCompleted();
      }
    },
    destroyed: function () {
      this.subscription.stop();
    }
  });

});
