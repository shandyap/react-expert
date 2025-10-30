/* eslint-disable no-undef */
// src/states/shared/action.test.js

import {
  describe, it, expect, vi, beforeEach, afterEach,
} from 'vitest';
import { showLoading, hideLoading } from '@dimasmds/react-redux-loading-bar';
import * as api from '../../utils/api';
import { asyncPopulateUsersAndThreads } from './action';
import { receiveUsersActionCreator } from '../users/action';
import { receiveThreadsActionCreator } from '../threads/action';

/**
 * Skenario Pengujian untuk asyncPopulateUsersAndThreads thunk:
 *
 * 1. should dispatch actions correctly when data fetching success
 * - (Skenario Sukses) harus men-dispatch action (showLoading, receiveUsers,
 * receiveThreads, hideLoading) dengan benar ketika pengambilan data berhasil.
 *
 * 2. should dispatch actions and call alert correctly when data fetching failed
 * - (Skenario Gagal) harus men-dispatch action (showLoading, hideLoading) dan
 * memanggil alert() dengan pesan error ketika pengambilan data gagal.
 */

// Siapkan data palsu
const fakeUsersResponse = [
  { id: 'user-1', name: 'User Satu', avatar: 'avatar1.jpg' },
];
const fakeThreadsResponse = [
  { id: 'thread-1', title: 'Thread Satu', body: 'Ini thread' },
];
const fakeErrorResponse = new Error('Ups! Gagal mengambil data');

// Mock 'alert'
global.alert = vi.fn();

describe('asyncPopulateUsersAndThreads thunk', () => {
  const dispatch = vi.fn();

  beforeEach(() => {
    dispatch.mockClear();
    global.alert.mockClear();
  });

  afterEach(() => {
    // vi.restoreAllMocks() akan mengembalikan semua fungsi
    // yang di-spy ke kondisi aslinya.
    // Ini PENGGANTI dari 'api.getAllUsers = api._getAllUsers'
    vi.restoreAllMocks();
  });

  // Test Case 1: Skenario Sukses
  it('should dispatch actions correctly when data fetching success', async () => {
    // Arrange
    // Gunakan vi.spyOn untuk "menimpa" fungsi sementara
    vi.spyOn(api, 'getAllUsers').mockResolvedValue(fakeUsersResponse);
    vi.spyOn(api, 'getAllThreads').mockResolvedValue(fakeThreadsResponse);

    // Act
    await asyncPopulateUsersAndThreads()(dispatch);

    // Assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(receiveUsersActionCreator(fakeUsersResponse));
    expect(dispatch).toHaveBeenCalledWith(receiveThreadsActionCreator(fakeThreadsResponse));
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
    expect(global.alert).not.toHaveBeenCalled();
  });

  // Test Case 2: Skenario Gagal
  it('should dispatch actions and call alert correctly when data fetching failed', async () => {
    // Arrange
    // "Menimpa" fungsi agar melempar error
    vi.spyOn(api, 'getAllUsers').mockRejectedValue(fakeErrorResponse);
    vi.spyOn(api, 'getAllThreads').mockRejectedValue(fakeErrorResponse);

    // Act
    await asyncPopulateUsersAndThreads()(dispatch);

    // Assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
    expect(global.alert).toHaveBeenCalledWith(fakeErrorResponse.message);
    expect(dispatch).not.toHaveBeenCalledWith(receiveUsersActionCreator(fakeUsersResponse));
  });
});