import * as HttpUtility from '../../utils/HttpUtility';
import environment from '../../environments';
import { getAuthorizationToken } from '../../utils/LocalStorage';

export async function getUserData() {
  const endpoint = environment.api.getUser;
  return await HttpUtility.get(endpoint);
}

export async function checkUserAuth() {
  return !!getAuthorizationToken();
}

export async function setUserAuth(value) {
  return value;
}
