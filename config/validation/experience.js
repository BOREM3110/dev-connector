const validator = require('validator');
const isEmpty = require('./is-empty.js');

const  validateExperienceInput = input => {
const errors = {};
 
  input.title = !isEmpty(input.title) ? input.title : "";
  input.company = !isEmpty(input.company) ? input.company : "";
  input.location = !isEmpty(input.location) ? input.location : "";
  input.from = !isEmpty(input.from) ? input.from : "";
 

  if (validator.isEmpty(input.title)) {
    errors.title = "The job title field is required!"
  }
  if (validator.isEmpty(input.company)) {
    errors.company = "The job company field is required!"
  }
  if (validator.isEmpty(input.location)) {
    errors.location = "The job location field is required!"
  }
  if (validator.isEmpty(input.from)) {
    errors.from = "From date field is required!"
  }
  
 return {
    errors,
    isValid: isEmpty(errors)
  }

}
module.exports = validateExperienceInput;