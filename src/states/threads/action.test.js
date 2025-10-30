/* eslint-disable no-undef */

import {
  describe, it, expect, vi, beforeEach, afterEach,
} from 'vitest';
import { showLoading, hideLoading } from '@dimasmds/react-redux-loading-bar';
import * as api from '../../utils/api';
import { asyncAddThread, addThreadActionCreator } from './action';

/**
 * Skenario Pengujian untuk asyncAddThread thunk:
 *
 * 1. should dispatch actions correctly when data fetching success
 * - (Skenario Sukses) harus memanggil API, menggunakan getState, dan men-dispatch
 * action (showLoading, addThreadActionCreator, hideLoading) dengan data gabungan.
 *
 * 2. should dispatch actions and call alert correctly when data fetching failed
 * - (Skenario Gagal) harus men-dispatch action (showLoading, hideLoading) dan
 * memanggil alert() ketika API gagal.
 */

// Mock 'api'
vi.mock('../../api');
// Mock 'alert'
global.alert = vi.fn();

describe('asyncAddThread thunk', () => {
  // Siapkan data palsu
  const fakeAuthUser = { id: 'user-123', name: 'Test User', avatar: 'avatar.jpg' };
  const fakeNewThreadData = { title: 'Judul Baru', body: 'Isi baru', category: 'tes' };
  const fakeApiResponse = { id: 'thread-new', ...fakeNewThreadData, ownerId: 'user-123' };
  const fakeError = new Error('Gagal membuat thread');

  // Siapkan 'dispatch' dan 'getState' palsu
  const dispatch = vi.fn();
  const getState = vi.fn(() => ({
    authUser: fakeAuthUser,
  }));

  beforeEach(() => {
    dispatch.mockClear();
    global.alert.mockClear();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  // Test Case 1: Skenario Sukses
  it('should dispatch actions correctly when data fetching success', async () => {
    // Arrange
    vi.spyOn(api, 'createThread').mockResolvedValue(fakeApiResponse);

    // Data gabungan (API response + data owner dari getState)
    const expectedCombinedData = { ...fakeApiResponse, owner: fakeAuthUser };

    // Act
    await asyncAddThread(fakeNewThreadData)(dispatch, getState);

    // Assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(api.createThread).toHaveBeenCalledWith(fakeNewThreadData);
    expect(getState).toHaveBeenCalled();
    expect(dispatch).toHaveBeenCalledWith(addThreadActionCreator(expectedCombinedData)); // Penting: cek data gabungan
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
    expect(global.alert).not.toHaveBeenCalled();
  });

  // Test Case 2: Skenario Gagal
  it('should dispatch actions and call alert correctly when data fetching failed', async () => {
    // Arrange
    vi.spyOn(api, 'createThread').mockRejectedValue(fakeError);

    // Act
    await asyncAddThread(fakeNewThreadData)(dispatch, getState);

    // Assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(api.createThread).toHaveBeenCalledWith(fakeNewThreadData);
    expect(global.alert).toHaveBeenCalledWith(fakeError.message);
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
    // Pastikan addThreadActionCreator tidak dipanggil jika gagal
    expect(dispatch).not.toHaveBeenCalledWith(addThreadActionCreator(expect.anything()));
  });
});