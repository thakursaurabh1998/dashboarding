import * as HttpUtility from 'utils/HttpUtility';

export async function getData(endpoint, data) {
  const response = await HttpUtility.get(endpoint, data);
  return response;
}
