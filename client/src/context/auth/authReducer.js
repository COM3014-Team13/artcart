import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  CLEAR_ERRORS,
  ADD_ADDRESS
} from '../types';

const authReducer = (state, action) => {
  switch (action.type) {
    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      localStorage.setItem('token', action.payload.token);
      return {
        ...state,
        currentUser: action.payload.user,
        isAuthenticated: true
      };
    case REGISTER_FAIL:
    case LOGIN_FAIL:
    case LOGOUT:
    case AUTH_ERROR:
      localStorage.removeItem('token');
      return {
        ...state,
        currentUser: null,
        isAuthenticated: false
      };
    case ADD_ADDRESS:
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          addresses: [action.payload.address, ...state.currentUser.addresses]
        }
      };
    default:
      return state;
  }
};

export default authReducer;
