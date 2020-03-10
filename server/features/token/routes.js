const { wrap } = require('async-middleware');

const checkToken = require('./commands/check-token');

module.exports = router => {
  router.post('/token', wrap(checkToken))

  return router;
};
