/* eslint-disable no-undef */
import {
  describe, it, expect, vi, beforeEach, afterEach,
} from 'vitest';
import { showLoading, hideLoading } from '@dimasmds/react-redux-loading-bar';
import * as api from '../../utils/api';
import { asyncLoginUser, setAuthUserActionCreator } from './action';

/**
 * Skenario Pengujian untuk asyncLoginUser thunk:
 *
 * 1. should dispatch actions and call API correctly when login success
 * - (Skenario Sukses) harus men-dispatch action (showLoading, setAuthUser, hideLoading)
 * dan memanggil API (login, putAccessToken, getOwnProfile) dengan benar.
 *
 * 2. should dispatch actions and call alert correctly when login failed
 * - (Skenario Gagal) harus men-dispatch action (showLoading, hideLoading) dan
 * memanggil alert() dengan pesan error ketika login gagal.
 */

// Mock 'alert'
global.alert = vi.fn();

describe('asyncLoginUser thunk', () => {
  const fakeDispatch = vi.fn();
  const fakeEmail = 'test@example.com';
  const fakePassword = 'password123';
  const fakeToken = 'fake-token-123';
  const fakeProfile = { id: 'user-1', name: 'Test User', avatar: 'avatar.jpg' };
  const fakeError = new Error('Email atau password salah');

  beforeEach(() => {
    fakeDispatch.mockClear();
    global.alert.mockClear();
  });

  afterEach(() => {
    // 2. Gunakan vi.restoreAllMocks() untuk membersihkan 'spy'
    vi.restoreAllMocks();
  });

  // Test Case 1: Skenario Sukses
  it('should dispatch actions and call API correctly when login success', async () => {
    // Arrange
    // 3. Ganti mock properti dengan vi.spyOn
    vi.spyOn(api, 'login').mockResolvedValue(fakeToken);
    vi.spyOn(api, 'getOwnProfile').mockResolvedValue(fakeProfile);
    vi.spyOn(api, 'putAccessToken').mockImplementation(() => {});

    // Act
    await asyncLoginUser({ email: fakeEmail, password: fakePassword })(fakeDispatch);

    // Assert
    expect(api.login).toHaveBeenCalledWith({ email: fakeEmail, password: fakePassword });
    expect(api.putAccessToken).toHaveBeenCalledWith(fakeToken);
    expect(api.getOwnProfile).toHaveBeenCalled();
    expect(fakeDispatch).toHaveBeenCalledWith(showLoading());
    expect(fakeDispatch).toHaveBeenCalledWith(setAuthUserActionCreator(fakeProfile));
    expect(fakeDispatch).toHaveBeenCalledWith(hideLoading());
    expect(global.alert).not.toHaveBeenCalled();
  });

  // Test Case 2: Skenario Gagal
  it('should dispatch actions and call alert correctly when login failed', async () => {
    // Arrange
    vi.spyOn(api, 'login').mockRejectedValue(fakeError); // Simulasikan login gagal
    vi.spyOn(api, 'putAccessToken');
    vi.spyOn(api, 'getOwnProfile');

    // Act
    await asyncLoginUser({ email: fakeEmail, password: fakePassword })(fakeDispatch);

    // Assert
    expect(api.login).toHaveBeenCalledWith({ email: fakeEmail, password: fakePassword });
    expect(api.putAccessToken).not.toHaveBeenCalled();
    expect(api.getOwnProfile).not.toHaveBeenCalled();
    expect(fakeDispatch).toHaveBeenCalledWith(showLoading());
    expect(fakeDispatch).toHaveBeenCalledWith(hideLoading());
    expect(global.alert).toHaveBeenCalledWith(fakeError.message);
    expect(fakeDispatch).not.toHaveBeenCalledWith(setAuthUserActionCreator(fakeProfile));
  });
});