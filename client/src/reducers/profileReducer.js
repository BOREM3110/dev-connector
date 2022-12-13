import {PROFILE_LOADING, GET_PROFILE, GET_PROFILES, CLEAR_CURRENT_PROFILE } from "../actions/types";
import isEmpty from "../utils/validation";

const initialState = {
  profile: null,
  profiles: null,
  loading: false
};

export const profileReducer=(state = initialState, action) => {
  switch(action.type) {
    case PROFILE_LOADING:
      return {
        ...state,
        loading: true
      }
      case GET_PROFILE:
        return {
          ...state,
          profile: action.payload,
          loading: false
        }
        case GET_PROFILES:
          return {
            ...state,
            profiles: action.payload,
            loading: false
          }
        case CLEAR_CURRENT_PROFILE:
          return {
            ...state,
            profile: null,
            profiles: null,
            loading: false
          }
         
    default:
      return state;
  }
}