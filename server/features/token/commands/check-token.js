const redis = require('redis');
const client = redis.createClient({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
  no_ready_check: true,
  auth_pass: process.env.REDIS_PASSWORD,                                                                                                                                                           
});    
const jwt = require('jsonwebtoken');

async function accessTokenChecker(req, res, next) {
  const accessToken = req.body.accessToken || req.query.accessToken || req.headers['x-access-token']
  // decode token
  if (accessToken) {
    // verifies secret and checks exp
    jwt.verify(accessToken, tokenConfig.accessTokenSecret, function(err, decoded) {
        if (err) {
            return res.status(401).json({"error": true, "message": 'Unauthorized access.' });
        }
      req.decoded = decoded;
      return res.status(201).json({ "success": true })
    });
  } else {
    // if there is no token
    // return an error
    if (req.body.refreshToken){
      
    }
    const refreshToken = refreshTokenChecker(req, res)
    return res.status(403).send({
        "error": true,
        "message": 'No token provided.'
    });
  }
};


function refreshTokenChecker(req, res) {
  const postData = req.body
  // if refresh token exists
  if((postData.refreshToken) && (postData.refreshToken in tokenList)) {
      const user = {
          "email": postData.email,
          "name": postData.name
      }
      const token = jwt.sign(user, config.secret, { expiresIn: config.tokenLife})
      const response = {
          "token": token,
      }
      // update the token in the list
      tokenList[postData.refreshToken].token = token
      res.status(200).json(response);        
  } else {
      res.status(404).send('Invalid request')
  }
};


module.exports = accessTokenChecker;