import axios from "axios";
import {GET_PROFILE, GET_PROFILES, PROFILE_LOADING, GET_ERRORS, CLEAR_CURRENT_PROFILE, SET_CURRENT_USER} from "./types";

const setProfileLoading = () => {
  return {
    type: PROFILE_LOADING
   }
}

export const getCurrentProfile = () => dispatch => {
dispatch(setProfileLoading());
 axios.get('/api/profile')
 .then(res => dispatch({
  type: GET_PROFILE,
  payload: res.data
 }))
 .catch(err => dispatch({
  type: GET_PROFILE,
  payload: {}
 }))
};

// Clear current profile
export const clearCurrentProfile = () => dispatch => {
  dispatch({
    type: CLEAR_CURRENT_PROFILE
  })
}

// Create profile 
export const createProfile = (profileData, navigate) => dispatch => {
   axios.post("/api/profile", profileData)
   .then(res => navigate('/dashboard')
   )
   .catch(err => dispatch ({type: GET_ERRORS,
    payload: err.response.data
   })
  
   )    
}

// Add Experience to profile

export const addExperience = (experienceData, navigate) => dispatch => {
  axios.post('/api/profile/experience', experienceData)
  .then(res => navigate("/dashboard"))
  .catch(err => dispatch({
    type: GET_ERRORS,
    payload: err.response.data
  }))
};

// Add Education to profile

export const addEducation = (educationData, navigate) => dispatch => {
  axios.post('/api/profile/education', educationData)
  .then(res => navigate("/dashboard"))
  .catch(err => dispatch({
    type: GET_ERRORS,
    payload: err.response.data
  }))
}

// Delete account & profile
export const deleteAccount = () => dispatch => {
   if(window.confirm('Are you sure ? This can NOT be undone!')) {
    axios.delete('/api/profile')
    .then(res => dispatch({
      type: SET_CURRENT_USER,
      payload: {}
    })).catch(err => dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    }))
   }
}

// Delete experience

export const deleteExperience = expId => dispatch => {
  axios.delete(`/api/profile/experience/${expId}`)
  .then(res => dispatch({
    type: GET_PROFILE,
    payload: res.data
  })).catch(err => dispatch({
    type: GET_ERRORS,
    payload: err.response.data
  }))
};

// Get all profiles

export const getProfiles = () => dispatch => {
 dispatch(setProfileLoading())
  axios.get('/api/profile/all')
  .then(res => dispatch({
    type: GET_PROFILES,
    payload: res.data
  })).catch(err => dispatch({
    type: GET_PROFILES,
    payload: null
  }))
};

// Get profile by handle

export const getProfileByHandle = handle => dispatch => {
  dispatch(setProfileLoading());
  axios.get(`/api/profile/handle/${handle}`)
  .then(res => dispatch({
    type: GET_PROFILE,
    payload: res.data
  })).catch(err => dispatch({
    type: GET_PROFILE,
    payload: {}
  }))
};

// Delete education by id

export const deleteEducation = educId => dispatch => {
  axios.delete(`/api/profile/education/${educId}`)
  .then(res => dispatch({
    type: GET_PROFILE,
    payload: res.data
  })).catch(err => dispatch({
    type: GET_ERRORS,
    payload: err.response.data
  }))
};