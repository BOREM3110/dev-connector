import React, { Component } from 'react';
import {Link} from "react-router-dom";
import {withRouter} from '../../utils/WithNavigate';
import TextFieldGroup from '../common/TextFieldGroup';
import TextAreaFieldGroup from '../common/TextFieldGroup';
import {connect} from "react-redux";
import PropTypes from 'prop-types';
import {addEducation} from "../../actions/profileActions";


 class AddEducation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      school: "",
      degree: "",
      fieldofstudy: "",
      from: "",
      to: "",
      description: '',
      errors: {},
      current: false,
      disabled: false
    }
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onCheck = this.onCheck.bind(this);

  }

  
  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({errors: nextProps.errors});
    }
  }
  onChange=(e)=> {
    const {name, value} = e.target; 
    this.setState({
      [name]: value
    })
  }
  onSubmit = (e) => {
    e.preventDefault();
    const eduData = {
      school: this.state.school,
      degree: this.state.degree,
      fieldofstudy: this.state.fieldofstudy,
      from: this.state.from,
      location: "fahs",
      to: this.state.to,
      current: this.state.current,
      description: this.state.description
    };
    console.log(this.state)
    this.props.addEducation(eduData, this.props.navigate);
  }

  onCheck = (e) => {
    this.setState({
      disabled: !this.state.disabled,
      current: !this.state.current

    })
  }
  render() {
    const {errors} = this.state;
    return (
      <div className="add-education" >
        <div className="container" >
          <div className="row" >
            <div className="col-md-8 m-auto" >
              <Link to="/dashboard" className="btn btn-light" >Go Back</Link>
              <h1 className="display-4 text-center" >Add Education</h1>
              <p className="lead text-center" >Add any school that you have attended</p>
              <small className="d-block pb-3" >* = required fields</small>
              <form onSubmit={this.onSubmit} >
                <TextFieldGroup
                placeholder="* School"
                name="school"
                value={this.state.school}
                onChange={this.onChange}
                error={errors.school}
                />
                 <TextFieldGroup
                placeholder="* Degree or Certification"
                name="degree"
                value={this.state.degree}
                onChange={this.onChange}
                error={errors.degree}
                />
                 <TextFieldGroup
                 placeholder="Field of study"
                name="fieldofstudy"
                value={this.state.fieldofstudy}
                onChange={this.onChange}
                error={errors.fieldofstudy}
                />
                <h6>From Date</h6>
                <TextFieldGroup
               name="from"
                type="date"
                value={this.state.from}
                onChange={this.onChange}
                error={errors.from}
                />
                <h6>To Date</h6>
                <TextFieldGroup
               name="to"
                type="date"
                value={this.state.to}
                onChange={this.onChange}
                error={errors.to}
                disabled={this.state.disabled ? 'disabled' : ''}
                />
                <div className="form-check mb-4" >
                  <input 
                  type="checkbox"
                  className="form-check-input"
                  name="current"
                  value={this.state.current}
                  onChange={this.onCheck}
                  id="current"
                  />
                  <label htmlFor="current" className="form-check-label" >
                    Current Job
                  </label>
                </div>
                <TextAreaFieldGroup
                placeholder="Add education details"
               name="description"
                value={this.state.description}
                onChange={this.onChange}
                error={errors.description}
                info="Tell us about the program you were in"
                />
                <input type="submit" value="submit" className="btn btn-info btn-block mt-4" />
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }
};

AddEducation.propTypes = {
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  addEducation: PropTypes.func
}
const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
})

export default connect(mapStateToProps, {addEducation})(withRouter(AddEducation));