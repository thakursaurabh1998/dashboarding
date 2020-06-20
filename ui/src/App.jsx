import React, { useState } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import './static/App.css';
import Home from './components/Home';
import Login from './components/Login';
import LoginPopup from './components/LoginPopup';
import { getAuthorizationToken } from './utils/LocalStorage';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!getAuthorizationToken()
  );

  return (
    <div className="App">
      <Switch>
        <Route
          exact
          path="/"
          render={() => (isAuthenticated ? <Home /> : <Redirect to="/login" />)}
        />
        <Route
          path="/login"
          render={() =>
            isAuthenticated ? (
              <Redirect to="/" />
            ) : (
              <Login updateAuthenticationState={setIsAuthenticated} />
            )
          }
        />
        <Route exact path="/callback" component={LoginPopup} />
      </Switch>
    </div>
  );
}
