const { wrap } = require('async-middleware');

const createUser = require('./commands/create-user');
const checkEmailExisting = require('./commands/check-email-existing')
const updateEmailVerified = require('./commands/update-email-verified')


module.exports = router => {
  router.post('/register', wrap(createUser));

  router.post('/checkemail', wrap(checkEmailExisting));

  router.get('/verify', wrap(updateEmailVerified))

  return router;
};
