import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import logo from '../static/logo.svg';
import * as UserActions from '../stores/user/UserActions';

export default function Home() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(UserActions.getUser());
  }, [dispatch]);

  const { name, pictureUrl } = useSelector((state) => ({
    name: state.user?.name,
    pictureUrl: state.user?.pictureUrl,
  }));

  return (
    <header className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
      <h1>Welcome "{name}"</h1>
      <img src={pictureUrl} alt="profile"/>
      <p>Soon going to dashboard :)</p>
    </header>
  );
}
