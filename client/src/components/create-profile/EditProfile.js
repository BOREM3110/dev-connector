import React, {Component} from 'react';
import PropTypes from "prop-types";
import TextFieldGroup from '../common/TextFieldGroup';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import SelectListGroup from '../common/SelectListGroup';
import InputGroup from '../common/InputGroup';
import {connect, useDispatch} from "react-redux";
import { Link } from "react-router-dom";
import {createProfile, getCurrentProfile} from "../../actions/profileActions";
import {withRouter} from '../../utils/WithNavigate';
import isEmpty from '../../utils/validation';




 class  EditProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      handle: "",
      status: "",
      company: "",
      website: "",
      location: "",
      skills: "",
      bio: "",
      facebook: "",
      twitter: "",
      instagram: "",
      linkedin: "",
      youtube: "",
      errors: {}
    }
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this)

  }
  onChange = e => {
    const {name, value} = e.target;
    this.setState({
      ...this.state,
      [name]: value
    })
  }
  onSubmit = e => {
    e.preventDefault();
    this.props.createProfile(this.state, this.props.navigate);
  }
  componentDidMount () {
    this.props.getCurrentProfile()
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.errors) {
      this.setState({errors: nextProps.errors});
    }

    // Check for the profile 
    if(nextProps.profile.profile) {
const profile = nextProps.profile.profile;

 // Bring skills array to CSV
 const skills = profile.skills.join(',');
  // If profile doesn't exist make it empty string;
      profile.company = !isEmpty(profile.company) ? profile.company : "";
      profile.website = !isEmpty(profile.website) ? profile.website : "";
      profile.company = !isEmpty(profile.company) ? profile.company : "";
      profile.location = !isEmpty(profile.location) ? profile.location : "";
      profile.bio = !isEmpty(profile.bio) ? profile.bio : "";
      profile.facebook = isEmpty(profile.facebook) ? profile.facebook : "";
      profile.twitter = !isEmpty(profile.twitter) ? profile.twitter : "";
      profile.instagram = !isEmpty(profile.instagram) ? profile.instagram : "";
      profile.youtube = !isEmpty(profile.youtube) ? profile.youtube : "";
      profile.linkedin = !isEmpty(profile.linkedin) ? profile.linkedin : "";


      this.setState({
        handle: profile.handle,
        website: profile.website,
        company: profile.company,
        location: profile.location,
        bio: profile.bio,
        facebook: profile.facebook,
          youtube: profile.youtube,
          twitter: profile.twitter,
          instagram: profile.instagram,
        linkedin: profile.linkedin
      });

    }
    
  }
render() { 
  const {displaySocialInputs, errors} = this.state;

  let socialInputs;
if(displaySocialInputs) {
 socialInputs = (
  <div>
    <InputGroup 
      placeholder="Facebook Profile Url"
      name="facebook"
      icon="fab fa-facebook"
      value={this.state.facebook}
      onChange={this.onChange}
      error={errors.facebook}
     
    />
    <InputGroup placeholder="Twitter Profile Url"
      name="twitter"
      icon="fab fa-twitter"
      value={this.state.twitter}
      onChange={this.onChange}
      error={errors.twitter}
      
    />
    <InputGroup placeholder="Youtube Url"
      name="youtube"
      icon="fab fa-youtube"
      value={this.state.youtube}
      onChange={this.onChange}
      error={errors.youtube}
    />
    <InputGroup placeholder="Instagram Url"
      name="instagram"
      icon="fab fa-instagram"
      value={this.state.instagram}
      onChange={this.onChange}
      error={errors.instagram}
    /> 
    <InputGroup placeholder="linkedin Url"
      name="linkedin"
      icon="fab fa-linkedin"
      value={this.state.linkedin}
      onChange={this.onChange}
      error={errors.linkedin}
    />
  </div>
 )


}







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
            <Link to="/dashboard" className="btn btn-light" >Go Back</Link>

                <h1 className="display-4 text-center" >Edit your profile</h1>
                <p className="lead text-center" >
                  Let's make some information to make your profile stand out
                </p>
                <small className="d-block pb-3" >* = required fields</small>
                <form onSubmit={this.onSubmit} >
                  <TextFieldGroup 
                   placeholder="* Profile handle"
                   name="handle"
                   value={this.state.handle}
                   onChange={this.onChange}
                   error={errors.handle}
                   info="A unique handle for your profile URL.Your full name, company name, nickname."
                  />
                  <SelectListGroup placeholder="* Status"
                  name="status"
                  value={this.state.status}
                  onChange={this.onChange}
                  error={errors.status}
                  options={options}
                  info="Give us an idea of where you are at in your career."
                  />
                   <TextFieldGroup 
                   placeholder="Company"
                   name="company"
                   value={this.state.company}
                   onChange={this.onChange}
                   error={errors.company}
                   info="Could be your own company or one you work for"
                  />
                   <TextFieldGroup 
                   placeholder="Website"
                   name="website"
                   value={this.state.website}
                   onChange={this.onChange}
                   error={errors.website}
                   info="Could be your own website or company one"
                  />
                   <TextFieldGroup 
                   placeholder="Location"
                   name="location"
                   value={this.state.location}
                   onChange={this.onChange}
                   error={errors.location }
                   info="City or city & state suggested (eg. Tunis, Tn)"
                  />
                   <TextFieldGroup 
                   placeholder="* Skills"
                   name="skills"
                   value={this.state.skills}
                   onChange={this.onChange}
                   error={errors.skills }
                   info="Please use comma separated values (eg. HTML,CSS,JAVASCRIPT,PYTHON)"
                  />
                   <TextAreaFieldGroup 
                   placeholder="Short bio"
                   name="bio"
                   value={this.state.bio}
                   onChange={this.onChange}
                   error={errors.bio }
                   info="Tell us something about yourself"
                  />
                  <div className="mb-3" >
                      <button
                      type="button"
                     onClick={(e)=> {
                       
                        this.setState((prevState) => ({
                          displaySocialInputs: !prevState.displaySocialInputs
                        })

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
}
 };

EditProfile.propTypes = {
  createProfile: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
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

export default connect(mapStateToProps, {createProfile, getCurrentProfile})(withRouter(EditProfile));