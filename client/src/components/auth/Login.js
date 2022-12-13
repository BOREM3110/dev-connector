import React, {useState, useEffect} from 'react';
import { loginUser } from '../../actions/authActions';
import { useDispatch, connect } from 'react-redux';
import { useNavigate } from "react-router-dom";
import TextFieldGroup from '../common/TextFieldGroup';


function Login(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const {isAuthenticated} = props.auth;
  const [user, setUser] = useState({email: '', password: '', errors: {}});

   useEffect(()=> {
    if(isAuthenticated) {
        navigate('/dashboard')
    }
    if(props.errors) {
      setUser({errors: props.errors});
    }
   }, [isAuthenticated, props.errors])
  const onChange = e => {
    const {name, value} = e.target;
    setUser({
      ...user,
      [name]: value
    })
  }
  const onSubmit = e => {
    e.preventDefault();
    dispatch(loginUser(user));
    
  }; 
  return (
    <div className="login">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Log In</h1>
              <p className="lead text-center">
                Sign in to your DevConnector account
              </p>
              <form noValidate onSubmit={onSubmit} >
                <TextFieldGroup type="email" placeholder="Email Address" name="email" value={user.email} onChange={onChange} error={user.errors.email}  />
                <TextFieldGroup type="password" placeholder="Enter your password" name="password" value={user.password} onChange={onChange} error={user.errors.password}  />
                
                <input type="submit" className="btn btn-info btn-block mt-4" />
              </form>
            </div>
          </div>
        </div>
      </div>
  )
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});
export default connect(mapStateToProps, {loginUser})(Login);
