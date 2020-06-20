import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import 'antd/dist/antd.css';
import './static/App.css';
import InternalRouter from './components/Utils/InternalRouter';
import RoutesEnum from './constants/RoutesEnum';
import Navbar from './components/Navbar/Navbar';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as UserActions from './stores/user/UserActions';

export default function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(UserActions.checkUserAuth());
  }, [dispatch]);

  const { isAuthenticated } = useSelector((state) => ({
    isAuthenticated: state.user?.isAuthenticated,
  }));

  return (
    <div className="App">
      {isAuthenticated && <Navbar />}
      <Route exact path={RoutesEnum.ROOT}>
        {isAuthenticated ? (
          <Redirect to={RoutesEnum.HOME} />
        ) : (
          <Redirect to={RoutesEnum.LOGIN} />
        )}
      </Route>
      <InternalRouter />
    </div>
  );
}
