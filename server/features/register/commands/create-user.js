const registerRepo = require('../repository');
const nodemailer = require("nodemailer");

const redis = require('redis');
const redisClient = redis.createClient({
  port: 6379,
  host: '52.79.166.26',
  no_ready_check: true,
  auth_pass: 'shinychan95', 
}); // default setting.

const smtpTransport = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "shinychan95",
        pass: "devcody9426"
    }
});


async function createUser(req, res) {
  console.log(req.body);
  
  let user = {};
  const registerSuccessMessage = 'You have successfully registered';
  try {
    user = await registerRepo.createUser(req.body);
  } catch (error) {
    return(res.send({error: error}))
  }

  let encodedMail = new Buffer(req.body.email).toString('base64');
  let link="http://"+req.get('host')+"/verify?mail="+encodedMail+"&id="+user;
  let mailOptions={
    from: 'shinychan95@gmail.com',
    // Comma separated list of recipients
    to: req.body.email,
    subject : "Please confirm your Email account",
    html : "Hello,<br> Please Click on the link to verify your email.<br><a href="+link+">Click here to verify</a>"	
  }

  // Sending email using Mandrill.
  smtpTransport.sendMail(mailOptions, function(error, response) { 
      if(error){
      console.log(error);
      res.send({ error: "Error in sending email" });
    }
    console.log("Message sent: " + JSON.stringify(response));
    // Adding hash key.
    redisClient.set(req.body.email, encodedMail);
    redisClient.expire(req.body.email, 600); // setting expiry for 10 minutes.

    res.send({ success: registerSuccessMessage })
  })
    
}


// http://localhost:8000/verify?mail=c2hpbnljaGFuOTVAcG9zdGVjaC5hYy5rcg==&id=49

module.exports = createUser;
