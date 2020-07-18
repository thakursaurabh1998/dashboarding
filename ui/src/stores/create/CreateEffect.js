import environment from 'environments';
import * as HttpUtility from 'utils/HttpUtility';

export async function getCreatedPages() {
  const endpoint = environment.api.getAllCreatedPages;
  return await HttpUtility.get(endpoint);
}

export async function addPage(pageData) {
  const endpoint = environment.api.page;
  return await HttpUtility.put(endpoint, pageData);
}

export async function removePage(routes) {
  const endpoint = environment.api.page;
  return await HttpUtility.del(endpoint, { routes });
}

export async function editPage(page) {
  const endpoint = environment.api.page;
  return await HttpUtility.post(endpoint, page);
}

export async function getComponents(pageID) {
  const endpoint = environment.api.getAllCreatedComponents;
  return await HttpUtility.get(endpoint, pageID);
}
