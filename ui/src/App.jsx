import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import 'antd/dist/antd.css';

import 'static/App.css';
import Navbar from 'components/Navbar/Navbar';
import RoutePage from 'components/Extras/RoutePage';
import * as UserActions from 'stores/user/UserActions';

export default function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(UserActions.checkUserAuth());
  }, [dispatch]);

  const { isAuthenticated } = useSelector((state) => ({
    isAuthenticated: state.user?.isAuthenticated,
  }));

  return (
    <>
      <Navbar isAuthenticated={isAuthenticated} />
      <RoutePage />
    </>
  );
}
