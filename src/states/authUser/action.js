import * as api from '../../utils/api';
import { hideLoading, showLoading } from '@dimasmds/react-redux-loading-bar';

// Action Type
const ActionType = {
  SET_AUTH_USER: 'SET_AUTH_USER',
  UNSET_AUTH_USER: 'UNSET_AUTH_USER',
};

// Action Creator
function setAuthUserActionCreator(authUser) {
  return {
    type: ActionType.SET_AUTH_USER,
    payload: { authUser },
  };
}

function unsetAuthUserActionCreator() {
  return {
    type: ActionType.UNSET_AUTH_USER,
    payload: { authUser: null },
  };
}

// Thunk Function - untuk Login
function asyncLoginUser({ email, password }) {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      const token = await api.login({ email, password });
      api.putAccessToken(token);
      const authUser = await api.getOwnProfile();
      dispatch(setAuthUserActionCreator(authUser));
    } catch (error) {
      alert(error.message);
    }
    dispatch(hideLoading());
  };
}


// Thunk Function - untuk Logout
function asyncLogoutUser() {
  return (dispatch) => {
    // 1. Dispatch action untuk hapus user dari state
    dispatch(unsetAuthUserActionCreator());
    // 2. Hapus token dari localStorage
    api.putAccessToken(''); // Mengosongkan token
  };
}


export {
  ActionType,
  setAuthUserActionCreator,
  unsetAuthUserActionCreator,
  asyncLoginUser,
  asyncLogoutUser,
};