import { describe, it, expect } from 'vitest';
import threadsReducer from './reducer';
import { ActionType } from './action';

/**
 * Skenario Pengujian untuk threadsReducer:
 *
 * 1. should return the threads with the new up-voted thread when given by TOGGLE_VOTE_THREAD action (up-vote)
 * - (Skenario Up-vote) harus mengembalikan state threads di mana thread yang dituju
 * memiliki userId di dalam array upVotesBy.
 *
 * 2. should return the threads with the neutralized vote thread when given by TOGGLE_VOTE_THREAD action (neutralize vote)
 * - (Skenario Netral) harus mengembalikan state threads di mana userId
 * dihapus dari array upVotesBy (jika sebelumnya sudah up-vote).
 */

describe('threadsReducer function', () => {
  const userId = 'user-123';
  const threadId = 'thread-1';

  // State awal palsu (satu thread)
  const fakeInitialState = [
    {
      id: threadId,
      title: 'Test Thread',
      upVotesBy: [],
      downVotesBy: [],
    },
  ];

  // Test Case 1: Memberi Up-vote
  it('should return threads with the new up-voted thread when given by TOGGLE_VOTE_THREAD action (up-vote)', () => {
    // Arrange
    const action = {
      type: ActionType.TOGGLE_VOTE_THREAD,
      payload: { threadId, userId, voteType: 1 }, // 1 = up-vote
    };

    // Act
    const nextState = threadsReducer(fakeInitialState, action);

    // Assert
    // Pastikan thread-nya ada di state
    expect(nextState[0].id).toBe(threadId);
    // Pastikan userId ada di dalam array upVotesBy
    expect(nextState[0].upVotesBy).toContain(userId);
    // Pastikan userId tidak ada di downVotesBy
    expect(nextState[0].downVotesBy).not.toContain(userId);
  });

  // Test Case 2: Menetralkan Up-vote
  it('should return threads with the neutralized vote thread when given by TOGGLE_VOTE_THREAD action (neutralize vote)', () => {
    // Arrange
    // Buat state seolah-olah user SUDAH up-vote
    const votedState = [
      {
        ...fakeInitialState[0],
        upVotesBy: [userId],
      },
    ];
    const action = {
      type: ActionType.TOGGLE_VOTE_THREAD,
      payload: { threadId, userId, voteType: 0 }, // 0 = netral
    };

    // Act
    const nextState = threadsReducer(votedState, action);

    // Assert
    // Pastikan userId HILANG dari array upVotesBy
    expect(nextState[0].upVotesBy).not.toContain(userId);
    expect(nextState[0].downVotesBy).not.toContain(userId);
  });
});