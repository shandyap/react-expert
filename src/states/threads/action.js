import * as api from '../../utils/api';
import { showLoading, hideLoading } from '@dimasmds/react-redux-loading-bar';

// Action Type
const ActionType = {
  RECEIVE_THREADS: 'RECEIVE_THREADS',
  ADD_THREAD: 'ADD_THREAD',
  TOGGLE_VOTE_THREAD: 'TOGGLE_VOTE_THREAD',
};

// Action Creator
function receiveThreadsActionCreator(threads) {
  return {
    type: ActionType.RECEIVE_THREADS,
    payload: { threads },
  };
}

function addThreadActionCreator(thread) {
  return {
    type: ActionType.ADD_THREAD,
    payload: { thread },
  };
}

function toggleVoteThreadActionCreator({ threadId, userId, voteType }) {
  return {
    type: ActionType.TOGGLE_VOTE_THREAD,
    payload: {
      threadId,
      userId,
      voteType, // 1 for up-vote, -1 for down-vote, 0 for neutral
    },
  };
}


// Thunk Function - untuk membuat thread baru
function asyncAddThread({ title, body, category = '' }) {
  // 1. Pastikan 'getState' ada di parameter
  return async (dispatch, getState) => {
    dispatch(showLoading());
    try {
      const thread = await api.createThread({ title, body, category });

      // 2. Ambil authUser dari state (INI YANG DIUJI TES)
      const { authUser } = getState();

      // 3. Gabungkan data owner dari state, bukan panggil API lagi
      const threadWithOwner = { ...thread, owner: authUser };

      dispatch(addThreadActionCreator(threadWithOwner));
    } catch (error) {
      alert(error.message);
    }
    dispatch(hideLoading());
  };
}

// Thunk Function - untuk voting thread
function asyncToggleVoteThread(threadId, voteType) {
  // voteType: 1 (up), -1 (down), 0 (neutral)
  return async (dispatch, getState) => {
    const { authUser } = getState();
    dispatch(showLoading());
    try {
      // Panggil API berdasarkan voteType
      if (voteType === 1) {
        await api.upVoteThread(threadId);
      } else if (voteType === -1) {
        await api.downVoteThread(threadId);
      } else {
        await api.neutralizeThreadVote(threadId);
      }

      // Dispatch action ke reducer
      dispatch(toggleVoteThreadActionCreator({ threadId, userId: authUser.id, voteType }));
    } catch (error) {
      alert(error.message);
    }
    dispatch(hideLoading());
  };
}

export {
  ActionType,
  receiveThreadsActionCreator,
  addThreadActionCreator,
  toggleVoteThreadActionCreator,
  asyncAddThread,
  asyncToggleVoteThread,
};