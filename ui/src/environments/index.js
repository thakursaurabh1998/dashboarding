const DEV_API = 'http://localhost:5000';
const PROD_API = 'http://prod.api';

class BaseEnv {
  _baseRoute = 'api';

  constructor(baseApi) {
    this._baseApi = baseApi;
    this.api = {
      sample: `${this._baseApi}/${this._baseRoute}/sample`,
      getUser: `${this._baseApi}/${this._baseRoute}/user`
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
