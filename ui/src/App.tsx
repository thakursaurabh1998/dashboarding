import React from 'react';
import PropTypes, { InferProps } from 'prop-types';
import { Switch, Route, Redirect } from 'react-router-dom';

import './static/App.css';
import Login from './components/Login';
import Home from './components/Home';

export default function App({
  isAuthenticated,
}: InferProps<typeof App.propTypes>) {
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
          render={() => (isAuthenticated ? <Redirect to="/" /> : <Login />)}
        />
      </Switch>
    </div>
  );
}

App.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
};

App.defaultProps = {
  isAuthenticated: false,
};
