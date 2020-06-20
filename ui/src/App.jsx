import React, { useState } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import './static/App.css';
import Login from './components/Login/Login';
import LoginPopup from './components/Login/LoginPopup';
import { getAuthorizationToken } from './utils/LocalStorage';
import InternalRouter from './components/Utils/InternalRouter';
import RoutesEnum from './constants/RoutesEnum';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!getAuthorizationToken()
  );

  return (
    <div className="App">
      <Switch>
        <Route
          path={RoutesEnum.ROOT}
          render={() =>
            isAuthenticated ? <InternalRouter /> : <Redirect to="/login" />
          }
        />
        <Route
          path={RoutesEnum.LOGIN}
          render={() =>
            isAuthenticated ? (
              <Redirect to="/" />
            ) : (
              <Login updateAuthenticationState={setIsAuthenticated} />
            )
          }
        />
        <Route exact path={RoutesEnum.CALLBACK} component={LoginPopup} />
      </Switch>
    </div>
  );
}
