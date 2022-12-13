const validator = require('validator'); 
const isEmpty = require('./is-empty.js');

const  validatePostInput = input => {
  const errors = {};
 
  input.text = !isEmpty(input.text) ? input.text : "";
  
  if (!validator.isLength(input.text, { min:10, max: 300})) {
    errors.text = "The text must be between 10 and 300 characters!"
  }

  if (validator.isEmpty(input.text)) {
    errors.text = "The text field is required!"
  }
 

 
  
 
 
  return {
    errors,
    isValid: isEmpty(errors)
  }

}
module.exports = validatePostInput;