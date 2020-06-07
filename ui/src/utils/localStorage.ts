export function setAuthorizationToken(token: string) {
  window.localStorage.setItem('Authorization', token);
}

export function getAuthorizationToken() {
  return window.localStorage.getItem('Authorization');
}
