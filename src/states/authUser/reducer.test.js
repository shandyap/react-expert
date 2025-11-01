import { describe, it, expect } from 'vitest';
import authUserReducer from './reducer';
import { ActionType } from './action';

/**
 * Skenario Pengujian untuk authUserReducer:
 *
 * 1. should return the initial state when given by unknown action
 * - (Skenario Awal) harus mengembalikan state awal (null) jika diberi action yang tidak dikenal.
 *
 * 2. should return the authUser when given by SET_AUTH_USER action
 * - (Skenario Login) harus mengembalikan data user (authUser) jika diberi action SET_AUTH_USER.
 *
 * 3. should return null when given by UNSET_AUTH_USER action
 * - (Skenario Logout) harus mengembalikan null jika diberi action UNSET_AUTH_USER.
 */

describe('authUserReducer function', () => {
  // Test Case 1: Tindakan tidak dikenal
  it('should return the initial state when given by unknown action', () => {
    // Arrange
    const initialState = null;
    const action = { type: 'UNKNOWN_ACTION' };

    // Act
    const nextState = authUserReducer(initialState, action);

    // Assert
    expect(nextState).toBe('INI-SENGAJA-DIBUAT-GAGAL');
  });

  // Test Case 2: SET_AUTH_USER (Login)
  it('should return the authUser when given by SET_AUTH_USER action', () => {
    // Arrange
    const initialState = null;
    const authUserPayload = {
      id: 'user-123',
      name: 'John Doe',
      email: 'john@example.com',
      avatar: 'https://avatar.url',
    };
    const action = {
      type: ActionType.SET_AUTH_USER,
      payload: { authUser: authUserPayload },
    };

    // Act
    const nextState = authUserReducer(initialState, action);

    // Assert
    expect(nextState).toEqual(authUserPayload);
  });

  // Test Case 3: UNSET_AUTH_USER (Logout)
  it('should return null when given by UNSET_AUTH_USER action', () => {
    // Arrange
    const initialState = {
      id: 'user-123',
      name: 'John Doe',
      email: 'john@example.com',
      avatar: 'https://avatar.url',
    }; // State seolah-olah sudah login
    const action = {
      type: ActionType.UNSET_AUTH_USER,
      payload: { authUser: null }, // Sesuai action creator kita
    };

    // Act
    const nextState = authUserReducer(initialState, action);

    // Assert
    expect(nextState).toBeNull();
  });
});