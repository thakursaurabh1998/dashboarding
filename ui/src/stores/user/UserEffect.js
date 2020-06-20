import * as HttpUtility from '../../utils/HttpUtility';
import environment from '../../environments';

export async function getUserData() {
  const endpoint = environment.api.getUser;
  return await HttpUtility.get(endpoint);
}
