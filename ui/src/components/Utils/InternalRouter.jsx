import React, { lazy, Suspense } from 'react';
import { useSelector } from 'react-redux';
import { Switch, Route, Redirect } from 'react-router-dom';

import RoutesEnum from 'constants/RoutesEnum';
import Create from 'components/Create/Create';
import Loading from 'components/Extras/Loading';
import LoginPopup from 'components/Login/LoginPopup';
import NotFound from 'components/Extras/NotFound';

const Home = lazy(() => import('components/Home'));
const Profile = lazy(() => import('components/Profile/Profile'));

function NewRoute(path, component) {
  return {
    path,
    component,
  };
}

// All the open routes go here
const openRoutes = [NewRoute(RoutesEnum.CALLBACK, LoginPopup)];

// All the secure routes go here
const secureRoutes = [
  NewRoute(RoutesEnum.HOME, Home),
  NewRoute(RoutesEnum.PROFILE, Profile),
  NewRoute(RoutesEnum.CREATE, Create),
];

function getRoutes(secure) {
  const finalRoutes = (secure ? secureRoutes : openRoutes).map((route) => (
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
  const { isAuthenticated } = useSelector((state) => ({
    isAuthenticated: state.user?.isAuthenticated,
  }));

  return (
    <Suspense fallback={<Loading />}>
      <Switch>
        {[getRoutes(false)]}
        {isAuthenticated === false && <Redirect to={RoutesEnum.ROOT} />}
        {[getRoutes(true)]}
        <Route path="*" component={NotFound} />
      </Switch>
    </Suspense>
  );
}
