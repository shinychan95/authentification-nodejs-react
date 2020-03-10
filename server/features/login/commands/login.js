const jwt = require('jsonwebtoken')
const config = require('../config')
const registerRepo = require('../repository');
const redis = require('redis');
const redisClient = redis.createClient({
  port: 6379,
  host: '52.79.166.26',
  no_ready_check: true,
  auth_pass: 'shinychan95', 
}); // default setting.


const {
  USERNAME_PASSWORD_COMBINATION_ERROR,
  INTERNAL_SERVER_ERROR,
  SUCCESSFULLY_LOGGED_IN,
} = require('../constants');



async function login(req, res) {
  let user;
  try {
    user = await registerRepo.getUserForLoginData(req.body);
  } catch (error) {
    console.log("User DB Error: ", error);
    return res.send(error);
  }

  const accessToken = jwt.sign(user, config.accessTokenSecret, { expiresIn: config.tokenLife});
  const refreshToken = jwt.sign(user, config.refreshTokenSecret, { expiresIn: config.refreshTokenLife});

  redisClient.set(req.body.email, refreshToken);
  redisClient.expire(req.body.email, 600);

  const response = {
    "status": "Logged in",
    "token": accessToken,
    "refreshToken": refreshToken,
  }

  res.status(200).json(response);



  // ***Legacy***
  // debug('login');
  // return passport.authenticate('local', (error, user) => {
  //   if (error || !user) {
  //     req.session.messages = {
  //       errors: { invalidEmailOrPassword: USERNAME_PASSWORD_COMBINATION_ERROR },
  //     };
  //     return res.status(401).redirect('/login');
  //   }

  //   return req.logIn(user, loginError => {
  //     if (loginError) {
  //       req.session.messages = {
  //         errors: { internalServerError: INTERNAL_SERVER_ERROR },
  //       };
  //       return res.status(500).redirect('/login');
  //     }
  //     req.session.messages = { loggedIn: SUCCESSFULLY_LOGGED_IN };
  //     return next();
  //   });
  // })(req, res, next);
}

module.exports = login;
