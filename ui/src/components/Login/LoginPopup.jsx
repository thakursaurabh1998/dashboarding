import React, { useEffect } from 'react';

export default function LoginPopup() {
  useEffect(() => {
    // get the URL parameters which will include the auth token
    if (window.opener) {
      const querystring = window.location.search;
      const searchParams = new URLSearchParams(querystring);
      const paramObject = {};
      searchParams.forEach(function (value, key) {
        paramObject[key] = value;
      });
      // send them to the opening window
      window.opener.postMessage(paramObject);
      // close the popup
      window.close();
    }
  });
  return <div>Redirecting...</div>;
}
