Template.main.helpers({
  newestUser: function () {
    return User.list()[User.list().length-1];
  }
});

Template.directory.helpers({
  users: function () {
    var order = Template.directory.order();
    return User.list(order);
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
    var name = Template.form.$input.val();
    var user = new User({
      name: name
    });
    user.save(function(){
      Template.form.$input.val('');
    });
  }
});
