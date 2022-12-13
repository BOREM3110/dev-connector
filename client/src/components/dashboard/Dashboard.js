import React, {useEffect} from 'react';
import { connect, useDispatch } from "react-redux";
import PropTypes from 'prop-types';
import {getCurrentProfile, deleteAccount} from "../../actions/profileActions";
import Spinner from '../common/Spinner';
import isEmpty from '../../utils/validation';
import { Link } from 'react-router-dom';
import ProfileActions from './ProfileActions';
import Experience from './Experience';
import Education from './Education';


function Dashboard(props) {
    const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCurrentProfile())
  }, [dispatch]);
  const {user} = props.auth;
  const {profile, loading} = props.profile;
  
  const onDeleteClick = e => {
   dispatch(deleteAccount())  
  }

  let dashboardContent;
  if(profile === null || loading === true) {
     dashboardContent = <Spinner />
  } else {
  // Check for authenticated user has profile data
    if( !isEmpty(profile)) {
      dashboardContent = (
        <div>
          <p className="lead text-muted" >Welcome <Link to={`/profile/${profile.handle}`} >{user.name}</Link> </p>
          <ProfileActions />
          <Experience experience={profile.experience} />
          <Education education={profile.education} />

          <div style={{marginBottom: '60px' }} />
          <button onClick={onDeleteClick} className="btn btn-danger" >Delete My Account</button>
        </div>
      )
    } else {
      // User is authenticated but has no profile.
      dashboardContent = (
        <div>
          <p className="lead text-muted" > {user.name} </p>
          <p> You have not yet set up a profile, please add some info</p>
          <Link to='/create-profile' className="btn btn-lg btn-info" > Create profile</Link>
        </div>
      )
    }
  }
  return (
    <div className="dashboard" >
      <div className="container">
        <div className="row" >
          <div className="col-md-12" >
            <h1 className="display-4" >Dashboard</h1>
            {dashboardContent}
          </div>
        </div>
        </div>
    </div>
  )
};

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth
});

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  deleteAccount: PropTypes.func.isRequired,
   profile: PropTypes.object.isRequired,
  auth:PropTypes.object.isRequired,
}
export default connect(mapStateToProps, {getCurrentProfile, deleteAccount})(Dashboard);
