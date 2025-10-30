import { ActionType } from './action';

function threadsReducer(threads = [], action = {}) {
  switch (action.type) {
  case ActionType.RECEIVE_THREADS:
    return action.payload.threads;
  case ActionType.ADD_THREAD:
    return [action.payload.thread, ...threads];
  case ActionType.TOGGLE_VOTE_THREAD:
    return threads.map((thread) => {
      if (thread.id === action.payload.threadId) {
        let { upVotesBy, downVotesBy } = thread;
        const { userId, voteType } = action.payload;

        // Hapus vote sebelumnya (jika ada)
        upVotesBy = upVotesBy.filter((id) => id !== userId);
        downVotesBy = downVotesBy.filter((id) => id !== userId);

        // Tambahkan vote baru
        if (voteType === 1) {
          upVotesBy.push(userId);
        } else if (voteType === -1) {
          downVotesBy.push(userId);
        }
        // Jika voteType === 0 (neutral), kita tidak perlu push apa-apa

        return { ...thread, upVotesBy, downVotesBy };
      }
      return thread;
    });
  default:
    return threads;
  }
}

export default threadsReducer;