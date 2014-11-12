var User = function (params) {
  for (var key in params) {
    this[key] = params[key];
  }
};

User.dep = new Deps.Dependency;
User.store = [];

User.list = function (order) {
  this.dep.depend();
  if (order !== 'asc' && order !== 'desc') return this.store;
  var sorted = _.sortBy(this.store, function(i){
    return i.name;
  });
  if (order === 'desc') sorted.reverse();
  return sorted;
};

User.add = function (newUser) {
  this.store.push(newUser);
  this.dep.changed();
  return this.store;
};

User.prototype.save = function (callback) {
  User.add(this);
  if (typeof callback === 'function') callback(this);
};
