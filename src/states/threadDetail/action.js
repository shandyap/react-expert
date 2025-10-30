import * as api from '../../utils/api';
import { showLoading, hideLoading } from '@dimasmds/react-redux-loading-bar';

// Action Type
const ActionType = {
  RECEIVE_THREAD_DETAIL: 'RECEIVE_THREAD_DETAIL',
  CLEAR_THREAD_DETAIL: 'CLEAR_THREAD_DETAIL',
  ADD_COMMENT: 'ADD_COMMENT',
  TOGGLE_VOTE_THREAD_DETAIL: 'TOGGLE_VOTE_THREAD_DETAIL',
  TOGGLE_VOTE_COMMENT: 'TOGGLE_VOTE_COMMENT',
};

// Action Creator
function receiveThreadDetailActionCreator(threadDetail) {
  return {
    type: ActionType.RECEIVE_THREAD_DETAIL,
    payload: { threadDetail },
  };
}

// Action creator untuk membersihkan detail saat keluar dari halaman
function clearThreadDetailActionCreator() {
  return {
    type: ActionType.CLEAR_THREAD_DETAIL,
  };
}

function addCommentActionCreator(comment) {
  return {
    type: ActionType.ADD_COMMENT,
    payload: { comment },
  };
}

// Action untuk vote thread (di halaman detail)
function toggleVoteThreadDetailActionCreator({ userId, voteType }) {
  return {
    type: ActionType.TOGGLE_VOTE_THREAD_DETAIL,
    payload: { userId, voteType },
  };
}

// Action untuk vote komentar
function toggleVoteCommentActionCreator({ commentId, userId, voteType }) {
  return {
    type: ActionType.TOGGLE_VOTE_COMMENT,
    payload: { commentId, userId, voteType },
  };
}

// Thunk Function - untuk mengambil detail thread
function asyncReceiveThreadDetail(threadId) {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      // API ini sudah mengembalikan thread lengkap dengan owner dan comments
      const threadDetail = await api.getThreadDetail(threadId);
      dispatch(receiveThreadDetailActionCreator(threadDetail));
    } catch (error) {
      alert(error.message);
    }
    dispatch(hideLoading());
  };
}

// Thunk Function - untuk membuat komentar baru
function asyncAddComment({ threadId, content }) {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      const comment = await api.createComment({ threadId, content });
      dispatch(addCommentActionCreator(comment));
    } catch (error) {
      alert(error.message);
    }
    dispatch(hideLoading());
  };
}

// Thunk Function - untuk voting thread (di halaman detail)
function asyncToggleVoteThreadDetail(voteType) {
  return async (dispatch, getState) => {
    const { authUser, threadDetail } = getState();
    dispatch(showLoading());
    try {
      if (voteType === 1) {
        await api.upVoteThread(threadDetail.id);
      } else if (voteType === -1) {
        await api.downVoteThread(threadDetail.id);
      } else {
        await api.neutralizeThreadVote(threadDetail.id);
      }
      dispatch(toggleVoteThreadDetailActionCreator({ userId: authUser.id, voteType }));
    } catch (error) {
      alert(error.message);
    }
    dispatch(hideLoading());
  };
}

// Thunk Function - untuk voting komentar
function asyncToggleVoteComment(commentId, voteType) {
  return async (dispatch, getState) => {
    const { authUser, threadDetail } = getState();
    dispatch(showLoading());
    try {
      if (voteType === 1) {
        await api.upVoteComment({ threadId: threadDetail.id, commentId });
      } else if (voteType === -1) {
        await api.downVoteComment({ threadId: threadDetail.id, commentId });
      } else {
        await api.neutralizeCommentVote({ threadId: threadDetail.id, commentId });
      }
      dispatch(toggleVoteCommentActionCreator({ commentId, userId: authUser.id, voteType }));
    } catch (error) {
      alert(error.message);
    }
    dispatch(hideLoading());
  };
}

export {
  ActionType,
  receiveThreadDetailActionCreator,
  clearThreadDetailActionCreator,
  addCommentActionCreator,
  toggleVoteThreadDetailActionCreator,
  toggleVoteCommentActionCreator,
  asyncReceiveThreadDetail,
  asyncAddComment,
  asyncToggleVoteThreadDetail,
  asyncToggleVoteComment,
};