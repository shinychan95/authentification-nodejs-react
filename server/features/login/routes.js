const { wrap } = require('async-middleware');

const login = require('./commands/login');

module.exports = router => {
  router.post('/login', wrap(login));

  return router;
};
