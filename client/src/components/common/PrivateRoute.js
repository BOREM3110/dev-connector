import React from 'react';
import  {Outlet, Navigate} from 'react-router-dom';
import { connect } from "react-redux";

 function PrivateRoute(props) {
  const {isAuthenticated} = props.auth;
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" /> 
  
};

const mapStateToProps = state => ({
  auth: state.auth
})



export default connect(mapStateToProps)(PrivateRoute);
