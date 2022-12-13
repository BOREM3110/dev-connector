import React, {useEffect}from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {logOutUser} from '../../actions/authActions';
import {clearCurrentProfile} from '../../actions/profileActions';
import PropTypes from 'prop-types';
import { connect, useDispatch } from 'react-redux';


 function Navbar(props) {
  const navigate = useNavigate();
  const {isAuthenticated, user} = props.auth;
  const dispatch = useDispatch();
  const onLogOutClick = e => {
    e.preventDefault()
    dispatch(clearCurrentProfile());
    dispatch(logOutUser());
  }
  
    const authLinks = (
      <ul className="navbar-nav ml-auto">
        <li className="nav-item">
                <Link className="nav-link" to="/feed">
                  Posts Feed
                </Link>
              </li>
        <li className="nav-item">
                <Link className="nav-link" to="/dashboard">
                  Dashboard
                </Link>
              </li>
              <li className="nav-item">
                <a href="" className="nav-link" onClick={onLogOutClick} >
                  <img src={user.avatar} style={{width:'25px', marginnRight: '5px'}} className='rounded-circle' alt={user.name} title="You must have a Gravatar connected to your email to display an image" />{'  '}
                  Log Out</a>
              </li>
            </ul>
    );

    const guestLinks = (
      <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/register">
                  Sign Up
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/login">
                  Login
                </Link>
              </li>
            </ul>
    );

    return (
    <nav className="navbar navbar-expand-sm navbar-dark bg-dark mb-4">
        <div className="container">
          <Link className="navbar-brand" to="/">
            DevConnector
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#mobile-nav"
          >
            <span className="navbar-toggler-icon" />
          </button>

          <div className="collapse navbar-collapse" id="mobile-nav">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/profiles">
                  {' '}
                  Developers
                </Link>
              </li>
            </ul>
            {isAuthenticated ? authLinks : guestLinks}
            
          </div>
        </div>
      </nav>
  )
};

Navbar.propTypes = {
  logOutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  auth: state.auth
})

export default connect(mapStateToProps, {logOutUser, clearCurrentProfile})(Navbar);
