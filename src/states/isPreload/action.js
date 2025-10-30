/* eslint-disable no-unused-vars */
import * as api from '../../utils/api';
import { showLoading, hideLoading } from '@dimasmds/react-redux-loading-bar';
import { setAuthUserActionCreator, unsetAuthUserActionCreator } from '../authUser/action';

// Action Type
const ActionType = {
  SET_IS_PRELOAD: 'SET_IS_PRELOAD',
};

// Action Creator
function setIsPreloadActionCreator(isPreload) {
  return {
    type: ActionType.SET_IS_PRELOAD,
    payload: { isPreload },
  };
}

// Thunk Function - untuk Preload/Check Status saat App load
function asyncPreloadProcess() {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      // Dapatkan profil user
      const authUser = await api.getOwnProfile();
      // Jika berhasil, dispatch action SET_AUTH_USER
      dispatch(setAuthUserActionCreator(authUser));
    } catch (error) {
      // Jika gagal, dispatch action UNSET_AUTH_USER
      dispatch(unsetAuthUserActionCreator());
    } finally {
      // Apapun hasilnya, set isPreload menjadi false
      dispatch(setIsPreloadActionCreator(false));
    }
    dispatch(hideLoading());
  };
}

export {
  ActionType,
  setIsPreloadActionCreator,
  asyncPreloadProcess,
};