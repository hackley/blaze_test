Template.main.helpers({
  newestUser: function () {
    return User.get()[User.get().length-1];
  }
});

Template.directory.helpers({
  users: function () {
    var order = Template.directory.order();
    return User.get(order);
  },
  _order: new Blaze.Var('asc'),
  order: function () {
    return Template.directory._order.get();
  }
});

Template.directory.events({
  'click .toggle-order': function (e) {
    e.preventDefault();
    var oldOrder = Template.directory.order();
    var newOrder = (oldOrder == 'desc') ? 'asc' : 'desc';
    Template.directory._order.set(newOrder);
  }
});


Template.form.rendered = function () {
  Template.form.$input = $('#new_user_name');
};

Template.form.events({
  'submit form': function (e) {
    e.preventDefault();
    var user = Template.form.$input.val();
    User.add(user);
    Template.form.$input.val('');
  }
});

var User = {
  dep: new Deps.Dependency,
  list: ['johhny', 'sue', 'david'],
  get: function (order) {
    this.dep.depend();
    if (order !== undefined) this.list.sort();
    if (order === 'desc') this.list.reverse();
    return this.list;
  },
  add: function (newUser) {
    this.list.push(newUser);
    this.dep.changed();
    return this.list;
  }
};
