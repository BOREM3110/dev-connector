import './App.css';
import React from 'react';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Landing from './components/layout/Landing';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import {Provider} from "react-redux";
import store from './store';
import jwt_decode from 'jwt-decode';
import {setAuthToken} from './utils/setAuthToken';
import {logOutUser, setCurrentUser} from './actions/authActions';
import Dashboard from './components/dashboard/Dashboard';
import CreateProfile from './components/create-profile/CreateProfile';
import EditProfile from './components/create-profile/EditProfile';
import AddExperience from './components/add-credentials/AddExperience';
import AddEducation from './components/add-credentials/AddEducation';
import Profiles from './components/profiles/Profiles';
import PrivateRoute from './components/common/PrivateRoute';
import Profile from './components/profile/Profile';
import Posts from './components/posts/Posts';
import Post from './components/post/Post';
import { connect, useDispatch, useSelector} from "react-redux";
import { clearCurrentProfile, createProfile } from './actions/profileActions';
import { profileReducer } from './reducers/profileReducer';


// Check for token
if(localStorage.token) {
  // Save the token on the auth header
   setAuthToken(localStorage.token);
   // decode the token
   const decoded = jwt_decode(localStorage.token);

   //Dispatch the setCurrentUser

   store.dispatch(setCurrentUser(decoded));
    store.dispatch(createProfile())
   //Date now
   const currentTime = Date.now() / 1000;

   //if time expired logOut
   if(decoded.exp < currentTime) {
     // logOut user
     store.dispatch(logOutUser());
     // Clear current profile
     store.dispatch(clearCurrentProfile()); 

  }

}
function App(props) {

 
  
  return (
    <Provider store={store} >
       
        <Router>
          <div className="App">
            <Navbar />
            <Routes>
              <Route exact path="/" element={<Landing />} />
              <Route exact path="/register" element={<Register />} />
              <Route exact path="/login" element={<Login />} />
              <Route exact path="/profiles" element={<Profiles/>} />
              <Route exact path="/profile/:handle" element={<Profile/>} />

              <Route element={<PrivateRoute />} >
              <Route exact path="/dashboard" element={<Dashboard />} />
              <Route exact path="/create-profile" element={<CreateProfile/>} />
              
              <Route exact path="/edit-profile" element={<EditProfile/>} />
              <Route exact path="/add-experience" element={<AddExperience/>} />
              <Route exact path="/add-education" element={<AddEducation/>} />
              <Route exact path="/feed" element={<Posts/>} />
              <Route exact path="/post/:id" element={<Post/>} />

              </Route>
            </Routes>
            <Footer />
          </div>
        </Router>
      
    </Provider>
  );
}



export default App;
