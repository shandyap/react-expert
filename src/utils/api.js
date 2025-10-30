

const BASE_URL = 'https://forum-api.dicoding.dev/v1';

export function putAccessToken(token) {
  localStorage.setItem('accessToken', token);
}

export function getAccessToken() {
  return localStorage.getItem('accessToken');
}

async function fetchWithAuth(url, options = {}) {
  return fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      Authorization: `Bearer ${getAccessToken()}`,
    },
  });
}

async function handleResponse(responsePromise) {
  const response = await responsePromise;
  const responseJson = await response.json();

  if (responseJson.status !== 'success') {
    throw new Error(responseJson.message);
  }

  return responseJson.data;
}


// ===============================================================================================
// User Endpoints
// ===============================================================================================

export async function register({ name, email, password }) {
  const response = fetch(`${BASE_URL}/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, password }),
  });
  const { user } = await handleResponse(response);
  return user;
}

export async function login({ email, password }) {
  const response = fetch(`${BASE_URL}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  const { token } = await handleResponse(response);
  return token;
}

export async function getOwnProfile() {
  const response = fetchWithAuth(`${BASE_URL}/users/me`);
  const { user } = await handleResponse(response);
  return user;
}

export async function getAllUsers() {
  const response = fetch(`${BASE_URL}/users`);
  const { users } = await handleResponse(response);
  return users;
}


// ===============================================================================================
// Thread Endpoints
// ===============================================================================================

export async function createThread({ title, body, category = '' }) {
  const response = fetchWithAuth(`${BASE_URL}/threads`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title, body, category }),
  });
  const { thread } = await handleResponse(response);
  return thread;
}

export async function getAllThreads() {
  const response = fetch(`${BASE_URL}/threads`);
  const { threads } = await handleResponse(response);
  return threads;
}

export async function getThreadDetail(threadId) {
  const response = fetch(`${BASE_URL}/threads/${threadId}`);
  const { detailThread } = await handleResponse(response);
  return detailThread;
}


// ===============================================================================================
// Comment Endpoints
// ===============================================================================================

export async function createComment({ threadId, content }) {
  const response = fetchWithAuth(`${BASE_URL}/threads/${threadId}/comments`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ content }),
  });
  const { comment } = await handleResponse(response);
  return comment;
}


// ===============================================================================================
// Vote Endpoints
// ===============================================================================================

export async function upVoteThread(threadId) {
  const response = fetchWithAuth(`${BASE_URL}/threads/${threadId}/up-vote`, { method: 'POST' });
  const { vote } = await handleResponse(response);
  return vote;
}

export async function downVoteThread(threadId) {
  const response = fetchWithAuth(`${BASE_URL}/threads/${threadId}/down-vote`, { method: 'POST' });
  const { vote } = await handleResponse(response);
  return vote;
}

export async function neutralizeThreadVote(threadId) {
  const response = fetchWithAuth(`${BASE_URL}/threads/${threadId}/neutral-vote`, { method: 'POST' });
  const { vote } = await handleResponse(response);
  return vote;
}

export async function upVoteComment({ threadId, commentId }) {
  const response = fetchWithAuth(`${BASE_URL}/threads/${threadId}/comments/${commentId}/up-vote`, { method: 'POST' });
  const { vote } = await handleResponse(response);
  return vote;
}

export async function downVoteComment({ threadId, commentId }) {
  const response = fetchWithAuth(`${BASE_URL}/threads/${threadId}/comments/${commentId}/down-vote`, { method: 'POST' });
  const { vote } = await handleResponse(response);
  return vote;
}

export async function neutralizeCommentVote({ threadId, commentId }) {
  const response = fetchWithAuth(`${BASE_URL}/threads/${threadId}/comments/${commentId}/neutral-vote`, { method: 'POST' });
  const { vote } = await handleResponse(response);
  return vote;
}


// ===============================================================================================
// Leaderboard Endpoints
// ===============================================================================================

export async function getLeaderboards() {
  const response = fetch(`${BASE_URL}/leaderboards`);
  const { leaderboards } = await handleResponse(response);
  return leaderboards;
}