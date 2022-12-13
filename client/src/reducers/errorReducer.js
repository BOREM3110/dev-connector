import { GET_ERRORS, GET_PROFILE, CLEAR_ERRORS } from '../actions/types';

const initialState = {};

 const errorReducer =( state= initialState, {type, payload}) => {
  switch(type) {
    case GET_ERRORS:
      return payload
      case CLEAR_ERRORS:
        return {};
      case GET_PROFILE:
        return {}
        
    default:
      return state;
  }
};

export default errorReducer;  