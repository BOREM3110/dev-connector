const validator = require('validator');
const isEmpty = require('./is-empty.js');

const  validateLoginInput = input => {
  const errors = {};
 
  input.email = !isEmpty(input.email) ? input.email : "";
  input.password = !isEmpty(input.password) ? input.password : "";

  if (validator.isEmpty(input.email)) {
    errors.email = "The email's field is required!"
  }
  if (!validator.isEmail(input.email)) {
    errors.email = "The email is invalid!"
  }
  if (validator.isEmpty(input.password)) {
    errors.password = "The password field is required!"
  }
  if (!validator.isLength(input.password, {min: 4, max: 30 })) {
    errors.password = "Password must be at least 4 characters!"
  }
 
 
  return {
    errors,
    isValid: isEmpty(errors)
  }

}
module.exports = validateLoginInput;