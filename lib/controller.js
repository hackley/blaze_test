Template.main.helpers({
  newestUser: function () {
    return User.get()[User.get().length-1];
  }
});

Template.directory.order = new Blaze.Var('asc');

Template.directory.helpers({
  users: function () {
    var order = Template.directory.order.get();
    return User.get(order);
  },
  currentOrder: function () {
    return Template.directory.order.get();
  }
});

Template.directory.events({
  'click .toggle-order': function (e) {
    e.preventDefault();
    var oldOrder = Template.directory.order.get();
    var newOrder = (oldOrder == 'desc') ? 'asc' : 'desc';
    Template.directory.order.set(newOrder);
  }
})

Template.form.events({
  'submit form': function (e) {
    e.preventDefault();
    $input = $('#new_user_name');
    var user = $input.val();
    User.add(user);
    $input.val('');
  }
});

var User = {
  dep: new Deps.Dependency,
  list: ['johhny', 'sue', 'david'],
  get: function (order) {
    this.dep.depend();
    // clone array
    var clone = this.list.slice(0);
    if (order !== undefined) clone.sort();
    if (order === 'desc') clone.reverse();
    return clone;
  },
  add: function (forecast) {
    this.list.push(forecast);
    this.dep.changed();
    return this.list;
  }
}
