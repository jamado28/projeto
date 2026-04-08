let users = [];

module.exports = {
  create: (user) => {
    user.id = users.length + 1;
    users.push(user);
    return user;
  },

  findByEmail: (email) => {
    return users.find(u => u.email === email);
  },

  getAll: () => users
};