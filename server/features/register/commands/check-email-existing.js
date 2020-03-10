const registerRepo = require('../repository');

async function checkEmailExisting(req, res) {
  let user;
  const verifySuccessMessage = 'You can successfully register';
  try {
    user = await registerRepo.checkEmailExisting(req.body);
  } catch (error) {
    console.log("DB error: ", error)
    user = error;
  }

  res.send(user);
}


module.exports = checkEmailExisting;