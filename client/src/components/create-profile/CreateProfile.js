import React, {useEffect, useState} from 'react';
import PropTypes from "prop-types";
import TextFieldGroup from '../common/TextFieldGroup';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import SelectListGroup from '../common/SelectListGroup';
import InputGroup from '../common/InputGroup';
import {connect, useDispatch} from "react-redux";
import {createProfile} from "../../actions/profileActions";
import {withRouter} from '../../utils/WithNavigate';






 function CreateProfile(props) {
  const dispatch = useDispatch();
  const [displaySocialInputs, setDisplaySocialInputs] = useState(false);
  const [profile, setProfile] = useState({ 
    handle: "", 
    status: "",
    company: "",
    website: "",
    location: "",
    skills: "",
    bio: "",
    twitter: "",
    facebook: "",
    linkedin: "",
    youtube: "",
    instagram: "",
    
  });

  const [errors, setErrors] = useState({});

  const onChange = e => {
    const {name, value} = e.target;
    setProfile({
      ...profile,
      [name]: value
    })
  }
  
 console.log(errors);
  useEffect(()=> {
    if(props.errors) {
      setErrors( props.errors)
    }
  }, [props.errors])
  
let socialInputs;
if(displaySocialInputs) {
 socialInputs = (
  <div>
    <InputGroup 
      placeholder="Facebook Profile Url"
      name="facebook"
      icon="fab fa-facebook"
      value={profile.facebook}
      onChange={onChange}
      error={errors.facebook}
     
    />
    <InputGroup placeholder="Twitter Profile Url"
      name="twitter"
      icon="fab fa-twitter"
      value={profile.twitter}
      onChange={onChange}
      error={errors.twitter}
      
    />
    <InputGroup placeholder="Youtube Url"
      name="youtube"
      icon="fab fa-youtube"
      value={profile.youtube}
      onChange={onChange}
      error={errors.youtube}
    />
    <InputGroup placeholder="Instagram Url"
      name="instagram"
      icon="fab fa-instagram"
      value={profile.instagram}
      onChange={onChange}
      error={errors.instagram}
    /> 
    <InputGroup placeholder="linkedin Url"
      name="linkedin"
      icon="fab fa-linkedin"
      value={profile.linkedin}
      onChange={onChange}
      error={errors.linkedin}
    />
  </div>
 )


}
const onSubmit = e => {
  e.preventDefault();
  dispatch(createProfile(profile, props.navigate));
}
console.log(profile)
// Select options for status
const options = [
  {
    label: "* Select professional status", value: 0
  },
  {
    label: "* Developer", value: "Developer"
  },
  {
    label: "* Junior Developer", value: "Junior Developer"
  },
  {
    label: "* Senior Developer", value: "Senior Developer"
  },
  {
    label: "* Manager", value: "Manager"
  },
  {
    label: "* Student or Learning", value: "Student or learning"
  },
  {
    label: "* Instructor or teacher", value: "Instructor or teacher"
  },
  {
    label: "* Intern", value: "Intern"
  },
  {
    label: "* Other", value: "Other"
  }
]

  return (
    <div className="create-profile" >
       <div className="container">
          <div className="row" >
            <div className="col-md-8 m-auto" >
                <h1 className="display-4 text-center" >Create your profile</h1>
                <p className="lead text-center" >
                  Let's make some information to make your profile stand out
                </p>
                <small className="d-block pb-3" >* = required fields</small>
                <form onSubmit={onSubmit} >
                  <TextFieldGroup 
                   placeholder="* Profile handle"
                   name="handle"
                   value={profile.handle}
                   onChange={onChange}
                   error={errors.handle}
                   info="A unique handle for your profile URL.Your full name, company name, nickname."
                  />
                  <SelectListGroup placeholder="* Status"
                  name="status"
                  value={profile.status}
                  onChange={onChange}
                  error={errors.status}
                  options={options}
                  info="Give us an idea of where you are at in your career."
                  />
                   <TextFieldGroup 
                   placeholder="Company"
                   name="company"
                   value={profile.company}
                   onChange={onChange}
                   error={errors.company}
                   info="Could be your own company or one you work for"
                  />
                   <TextFieldGroup 
                   placeholder="Website"
                   name="website"
                   value={profile.website}
                   onChange={onChange}
                   error={errors.website}
                   info="Could be your own website or company one"
                  />
                   <TextFieldGroup 
                   placeholder="Location"
                   name="location"
                   value={profile.location}
                   onChange={onChange}
                   error={errors.location }
                   info="City or city & state suggested (eg. Tunis, Tn)"
                  />
                   <TextFieldGroup 
                   placeholder="* Skills"
                   name="skills"
                   value={profile.skills}
                   onChange={onChange}
                   error={errors.skills }
                   info="Please use comma separated values (eg. HTML,CSS,JAVASCRIPT,PYTHON)"
                  />
                   <TextAreaFieldGroup 
                   placeholder="Short bio"
                   name="bio"
                   value={profile.bio}
                   onChange={onChange}
                   error={errors.bio }
                   info="Tell us something about yourself"
                  />
                  <div className="mb-3" >
                      <button
                      type="button"
                     onClick={(e)=> {
                       
                        setDisplaySocialInputs((prevState) => !prevState

                      )}} className="btn btn-light" >Social Networks links</button>
                      <span className="text-muted" >Optional</span>
                  </div>
                  {socialInputs}
                  <input type="submit" value="submit" className="btn btn-info btn-block mt-4" />
                </form>
            </div>
          </div>
       </div>
    </div>
  )
};

CreateProfile.propTypes = {
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  handle: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  company: PropTypes.string.isRequired,
  website: PropTypes.string,
  skills: PropTypes.string.isRequired,
  location: PropTypes.string,
  bio: PropTypes.string,
};
const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
})

export default connect(mapStateToProps, {createProfile})(withRouter(CreateProfile));
