import { ActionType } from './action';

function threadDetailReducer(threadDetail = null, action = {}) {
  switch (action.type) {
  case ActionType.RECEIVE_THREAD_DETAIL:
    return action.payload.threadDetail;
  case ActionType.CLEAR_THREAD_DETAIL:
    return null;
  case ActionType.ADD_COMMENT:
    return {
      ...threadDetail,
      comments: [action.payload.comment, ...threadDetail.comments],
    };
  case ActionType.TOGGLE_VOTE_THREAD_DETAIL: {
    let { upVotesBy, downVotesBy } = threadDetail;
    const { userId, voteType } = action.payload;

    upVotesBy = upVotesBy.filter((id) => id !== userId);
    downVotesBy = downVotesBy.filter((id) => id !== userId);

    if (voteType === 1) upVotesBy.push(userId);
    if (voteType === -1) downVotesBy.push(userId);

    return { ...threadDetail, upVotesBy, downVotesBy };
  }
  case ActionType.TOGGLE_VOTE_COMMENT:
    return {
      ...threadDetail,
      comments: threadDetail.comments.map((comment) => {
        if (comment.id === action.payload.commentId) {
          let { upVotesBy, downVotesBy } = comment;
          const { userId, voteType } = action.payload;

          upVotesBy = upVotesBy.filter((id) => id !== userId);
          downVotesBy = downVotesBy.filter((id) => id !== userId);

          if (voteType === 1) upVotesBy.push(userId);
          if (voteType === -1) downVotesBy.push(userId);

          return { ...comment, upVotesBy, downVotesBy };
        }
        return comment;
      }),
    };
  default:
    return threadDetail;
  }
}

export default threadDetailReducer;