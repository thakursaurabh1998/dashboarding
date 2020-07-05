const DEV_API = 'http://localhost:5000';
const PROD_API = 'http://prod.api';

class BaseEnv {
  _baseRoute = 'api';

  constructor(baseApi) {
    this._baseApi = baseApi;
    this.api = {
      sample: `${this._baseApi}/${this._baseRoute}/sample`,
      getUser: `${this._baseApi}/${this._baseRoute}/user`,
      page: `${this._baseApi}/${this._baseRoute}/create/page`,
      getAllCreatedPages: `${this._baseApi}/${this._baseRoute}/create/pages`,
    };
  }
}

/**
 * @type {BaseEnv}
 */
let environment = null;

switch (process.env.NODE_ENV) {
  case 'development':
    environment = new BaseEnv(DEV_API);
    break;
  default:
    environment = new BaseEnv(PROD_API);
}

export default environment;
