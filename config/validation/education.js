const validator = require('validator');
const isEmpty = require('./is-empty.js');

const validateEducationInput = input => {

  const errors = {};
  input.school = !isEmpty(input.school) ? input.school : "";
  input.degree = !isEmpty(input.degree) ? input.degree : "";
  input.fieldofstudy = !isEmpty(input.fieldofstudy) ? input.fieldofstudy : "";
  input.location = !isEmpty(input.location) ? input.location : "";
  input.school = !isEmpty(input.school) ? input.school : "";
  input.fieldofstudy = !isEmpty(input.fieldofstudy) ? input.fieldofstudy : "";
  input.from = !isEmpty(input.from) ? input.from : "";

  if(validator.isEmpty(input.school)) {
    errors.school = "Field school is required!"
  }

  if(validator.isEmpty(input.degree)) {
    errors.degree = "Field degree is required!"
  }
  if(validator.isEmpty(input.location)) {
    errors.location = "Field location is required!"
  }
  if(validator.isEmpty(input.fieldofstudy)) {
    errors.fieldofstudy = "Field of study is required!"
  }

  if(validator.isEmpty(input.from)) {
    errors.from = "From date is required!"
  }
 

  return {
    errors,
    isValid: isEmpty(errors)
  }
};

module.exports = validateEducationInput;