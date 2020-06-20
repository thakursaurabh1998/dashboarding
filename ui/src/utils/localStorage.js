export function setAuthorizationToken(token) {
  window.localStorage.setItem('Authorization', token);
}

export function getAuthorizationToken() {
  return window.localStorage.getItem('Authorization');
}

export function deleteAuthorizationToken() {
  return window.localStorage.removeItem('Authorization');
}
