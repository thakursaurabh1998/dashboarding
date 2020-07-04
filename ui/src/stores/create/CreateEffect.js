import environment from '../../environments';
import * as HttpUtility from '../../utils/HttpUtility';

export async function getCreatedPages() {
  const endpoint = environment.api.getAllCreatedPages;
  return await HttpUtility.get(endpoint);
}

export async function addPage(pageData) {
  const endpoint = environment.api.createPage;
  return await HttpUtility.put(endpoint, pageData);
}

export async function removePage(routes) {
  const endpoint = environment.api.createPage;
  return await HttpUtility.del(endpoint, { routes });
}
