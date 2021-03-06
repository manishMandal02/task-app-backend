const jwt = require('jsonwebtoken');

module.exports = (id, time = '30d') => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: time,
  });
};
