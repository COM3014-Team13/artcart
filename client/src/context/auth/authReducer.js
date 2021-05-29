import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  ADD_ADDRESS,
  GET_PUBLIC_SELLER
} from '../types';

const authReducer = (state, action) => {
  switch (action.type) {
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        currentUser: action.payload,
        authLoading: false
      };
    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      localStorage.setItem('token', action.payload.token);
      return {
        ...state,
        currentUser: action.payload.user,
        isAuthenticated: true,
        authLoading: false
      };
    case REGISTER_FAIL:
    case LOGIN_FAIL:
    case LOGOUT:
    case AUTH_ERROR:
      localStorage.removeItem('token');
      return {
        ...state,
        currentUser: null,
        isAuthenticated: false,
        authLoading: false
      };
    case ADD_ADDRESS:
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          addresses: [action.payload.address, ...state.currentUser.addresses]
        }
      };
    case GET_PUBLIC_SELLER:
      return {
        ...state,
        publicSeller: action.payload,
        authLoading: false
      };
    default:
      return state;
  }
};

export default authReducer;
