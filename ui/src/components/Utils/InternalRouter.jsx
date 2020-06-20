import React, { lazy, Suspense } from 'react';
import { Switch, Route } from 'react-router-dom';
import RoutesEnum from '../../constants/RoutesEnum';
import Loading from '../Extras/Loading';
import Login from '../Login/Login';
import LoginPopup from '../Login/LoginPopup';

const Home = lazy(() => import('../Home'));
const Profile = lazy(() => import('../Profile/Profile'));

function NewRoute(path, component) {
  return {
    path,
    component,
  };
}

// All the routes go here
const routes = [
  NewRoute(RoutesEnum.HOME, Home),
  NewRoute(RoutesEnum.LOGIN, Login),
  NewRoute(RoutesEnum.PROFILE, Profile),
  NewRoute(RoutesEnum.CALLBACK, LoginPopup),
];

function getRoutes() {
  const finalRoutes = routes.map((route) => (
    <Route
      exact
      path={route.path}
      key={route.path}
      component={route.component}
    />
  ));
  return finalRoutes;
}

export default function InternalRouter() {
  return (
    <Suspense fallback={<Loading />}>
      <Switch>{[getRoutes()]}</Switch>
    </Suspense>
  );
}
