// ***Instagram Verifying URL***
// https://www.instagram.com/_n/confirm_email_deeplink?nc=yE0ZrS4P
// &ec=cmt0aDEyM0BuYXZlci5jb20&target_user_id=28241538475
// &utm_campaign=introduction_full_email&utm_source=instagram
// &utm_medium=email&ndid=HMTU3OTQ4MTg2NjE0ODcwNTpya3RoMTIzQG5hdmVyLmNvbTo4NTk


const registerRepo = require('../repository');
const redis = require('redis');
const redisClient = redis.createClient({
    port: 6379,
    host: '52.79.166.26',
    no_ready_check: true,
    auth_pass: 'shinychan95', 
  }); // default setting.



async function updateEmailVerified(req, res) {
    let value, result;
    if((req.protocol+"://"+req.get('host')) === ("http://localhost:8000")) {
        let value;
        let decodedMail = new Buffer(req.query.mail, 'base64').toString('ascii');
        console.log("decodedMail: ", decodedMail)
        try {
            value = redisClient.get(decodedMail)
        } catch (error) {
            return res.send("Redis Error");
        }
        console.log("value: ", value)
        if(value === null) {
            return res.send("Invalid email address");
        }

        if(value) {     
            try {
                result = await registerRepo.updateEmailVerified(req.query.id);
              } catch (error) {
                console.log("error: ", error);
                return(res.send({error: error}));
            }

        }

    }
    res.send({succes: "Email is verified"})
};


module.exports = updateEmailVerified;