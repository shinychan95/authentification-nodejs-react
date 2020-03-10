// DB 관련된 query 함수 repo

const bcrypt = require('bcrypt');
const knex = require('../../db');

async function createUser({ name, email, password }) {
  console.log("password: ", password);
  const hashedPass = await bcrypt.hash(password, 5);
  console.log("hashedPass: ", hashedPass)
  const hashedPass2 = await bcrypt.hash(password, 5);
  console.log("hashedPass2: ", hashedPass2)
  const [user] = await knex('users')
    .insert({
      name,
      email,
      password: hashedPass,
      created_at: new Date(),
      updated_at: new Date(),
      email_verified_at: false,
    })
  return user;
};

async function updateEmailVerified( id ) {
  const user = await knex('users')
    .where({id: id})
    .update({ email_verified_at: true })

  return user;
};

async function checkEmailExisting({ email }) {
  console.log(email)
  const user = await knex('users')
    .select(knex.raw('count(*) as cnt'))
    .where('email', email)

  return user;
};

module.exports = {
  createUser,
  checkEmailExisting,
  updateEmailVerified,
};
