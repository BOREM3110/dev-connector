import React, {useState, useEffect} from 'react';
import {connect, useDispatch} from 'react-redux';
import {registerUser} from '../../actions/authActions';
import {withRouter} from '../../utils/WithNavigate';
import PropTypes from 'prop-types';
import {useNavigate} from 'react-router-dom';
import TextFieldGroup from '../common/TextFieldGroup';

 function Register(props) {
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
    errors: {}
  })
  const onChange = e => {
    const {name, value} = e.target;
    setNewUser({
      ...newUser,
      [name]: value
    })
  }
  useEffect(()=> {
    if(props.auth.isAuthenticated) {
        navigate('/dashboard')
    }
   
   }, [props.auth.isAuthenticated, navigate])

  const onSubmit = e=> {
    e.preventDefault();
      dispatch(registerUser(newUser, props.navigate))
     if(props.errors) {
        setNewUser({errors: props.errors})
     }
  }
  const errors = props.errors ? props.errors : {};
  return (
    <div className="register">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Sign Up</h1>
              <p className="lead text-center">
                Create your DevConnector account
              </p>
              <form noValidate onSubmit={onSubmit} >
               
                <TextFieldGroup name="name" placeholder="Enter your name" value={newUser.name} onChange={onChange} error={errors.name} />
                <TextFieldGroup name="email" placeholder="Enter your email" value={newUser.email} onChange={onChange} error={errors.email} info="This site uses Gravatar so if you want a profile image, use
                    a Gravatar email" />
                <TextFieldGroup type="password" name="password" placeholder="Enter your password" value={newUser.password} onChange={onChange} error={errors.password}  />
                <TextFieldGroup type="password" name="password2" placeholder="Confirm your password" value={newUser.password2} onChange={onChange} error={errors.password2} />
                
                <input type="submit" className="btn btn-info btn-block mt-4" />
              </form>
            </div>
          </div>
        </div>
      </div>
  )
};

Register.propTypes = {
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  registerUser: PropTypes.func.isRequired,
 
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors
})

export default connect(mapStateToProps, {registerUser})(withRouter(Register));
