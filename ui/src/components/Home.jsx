import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import logo from '../static/logo.svg';
import * as UserActions from '../stores/user/UserActions';
import { Button } from 'antd';
import { Link } from 'react-router-dom';
import RoutesEnum from '../constants/RoutesEnum';

export default function Home() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(UserActions.getUser());
  }, [dispatch]);

  const { name } = useSelector((state) => ({
    name: state.user?.name,
  }));

  return (
    <header className="App">
      <img src={logo} className="App-logo" alt="logo" />
      <h1>Welcome {name}</h1>
      <Link to={RoutesEnum.CREATE}>
        <Button type="primary" size="large">
          Create Dashboard
        </Button>
      </Link>
    </header>
  );
}
