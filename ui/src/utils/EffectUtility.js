import * as HttpUtility from './HttpUtility';

export async function getData(endpoint, data) {
  const response = await HttpUtility.get(endpoint, data);
  return response;
}
