import axios from 'axios';

const RequestMethod = {
  Get: 'GET',
  Post: 'POST',
  Put: 'PUT',
  Delete: 'DELETE',
  Options: 'OPTIONS',
  Head: 'HEAD',
  Patch: 'PATCH',
};

export async function get(endpoint, params, requestConfig) {
  const paramsConfig = params ? { params } : undefined;

  return _request(
    {
      url: endpoint,
      method: RequestMethod.Get,
    },
    {
      ...paramsConfig,
      ...requestConfig,
    }
  );
}

export async function post(endpoint, data) {
  const config = data ? { data } : undefined;

  return _request(
    {
      url: endpoint,
      method: RequestMethod.Post,
    },
    config
  );
}

export async function put(endpoint, data) {
  const config = data ? { data } : undefined;

  return _request(
    {
      url: endpoint,
      method: RequestMethod.Put,
    },
    config
  );
}

export async function del(endpoint, data) {
  const config = data ? { data } : undefined;

  return _request(
    {
      url: endpoint,
      method: RequestMethod.Delete,
    },
    config
  );
}

export async function _request(restRequest, config) {
  if (!Boolean(restRequest.url)) {
    console.error(
      `Received ${restRequest.url} which is invalid for a endpoint url`
    );
  }

  try {
    const axiosRequestConfig = {
      ...config,
      method: restRequest.method,
      url: restRequest.url,
      headers: {
        Authorization: `Bearer ${localStorage.getItem('Authorization')}`,
      },
    };
    const axiosResponse = await axios(axiosRequestConfig);

    const { status, data, request } = axiosResponse;

    if (data.success === false) {
      return _fillInErrorWithDefaults(
        {
          status,
          message: data.errors.join(' - '),
          errors: data.errors,
          url: request ? request.responseURL : restRequest.url,
          raw: axiosResponse,
        },
        restRequest
      );
    }

    return axiosResponse;
  } catch (error) {
    if (error.response) {
      // The request was made and the server responded with a status code that falls out of the range of 2xx
      const { status, statusText, data } = error.response;
      const errors = data.hasOwnProperty('errors')
        ? [statusText, ...data.errors]
        : [statusText];

      return _fillInErrorWithDefaults(
        {
          status,
          message: errors.filter(Boolean).join(' - '),
          errors,
          url: error.request.responseURL,
          raw: error.response,
        },
        restRequest
      );
    } else if (error.request) {
      // The request was made but no response was received `error.request` is an instance of XMLHttpRequest in the browser and an instance of http.ClientRequest in node.js
      const { status, statusText } = error.request;

      return _fillInErrorWithDefaults(
        {
          status,
          message: statusText,
        },
        restRequest
      );
    }

    // Something happened in setting up the request that triggered an Error
    return _fillInErrorWithDefaults(
      {
        status: 0,
        message: error.message,
      },
      restRequest
    );
  }
}

function _fillInErrorWithDefaults(error, request) {
  const { url } = request;
  const { status, message } = error;

  if (status === 401) {
    window.localStorage.clear();
    window.location.replace('/');
    return;
  }

  return {
    error: true,
    status,
    message,
    url,
    raw: error,
  };
}

/**
 * We want to show the loading indicator to the user but sometimes the api
 * request finished too quickly. This makes sure there the loading indicator is
 * visual for at least a given time.
 *
 * @param duration
 * @returns {Promise<void>}
 * @private
 */
// function _delay(duration = 250) {
//   return new Promise((resolve) => setTimeout(resolve, duration));
// }
