Meteor.publish("todos", function () {
  // Simulate slow network response
  Meteor._sleepForMs(500)
  return Todos.find({})
})