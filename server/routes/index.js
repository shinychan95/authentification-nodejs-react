const express = require('express');
const router = express.Router();
const tokenConfig = require('../features/login/config')

const mountRegisterRoutes = require('../features/register/routes');
const mountLoginRoutes = require('../features/login/routes');
const mountTokenRoutes = require('../features/token/routes')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

mountRegisterRoutes(router);
mountLoginRoutes(router);
mountTokenRoutes(router);

module.exports = router;
