const validator = require('validator');
const isEmpty = require('./is-empty.js');


const  validateProfileInput = input => {
  const errors = {};
 
  input.handle = !isEmpty(input.handle) ? input.handle : "";
  input.skills = !isEmpty(input.skills) ? input.skills : "";
  input.status = !isEmpty(input.status) ? input.status : "";

  if(!validator.isLength(input.handle, {min: 2, max: 40})) {
    errors.handle = "Handle must be between 2 and 40 characters!"
   }
   if(validator.isEmpty(input.handle)) {
    errors.handle = "Profile handle field is required!"
   }
   if(validator.isEmpty(input.status)) {
    errors.status = "Profile status field is required!"
   }
   if(isEmpty(input.skills)) {
    errors.skills = "Profile skills field is required!"
   }

   if(!isEmpty(input.website)) {
     if(!validator.isURL(input.website)) {
      errors.website = "Not a valid url!"
     }
    }
     if(!isEmpty(input.youtube)) {
      if(!validator.isURL(input.youtube)) {
       errors.youtube = "Not a valid url!"
      }
    }
      if(!isEmpty(input.facebook)) {
        if(!validator.isURL(input.facebook)) {
         errors.facebook = "Not a valid url!"
        }
      }
        if(!isEmpty(input.instagram)) {
          if(!validator.isURL(input.instagram)) {
           errors.instagram = "Not a valid url!"
          }
        }
          if(!isEmpty(input.linkedin)) {
            if(!validator.isURL(input.linkedin)) {
             errors.linkedin = "Not a valid url!"
            }
          }
   

  
  return {
    errors,
    isValid: isEmpty(errors)
  }

}
module.exports = validateProfileInput;