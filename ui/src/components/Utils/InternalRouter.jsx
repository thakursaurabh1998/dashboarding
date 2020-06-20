import React, { lazy, Suspense } from 'react';
import { Switch, Route } from 'react-router-dom';
import RoutesEnum from '../../constants/RoutesEnum';
import Loading from '../Extras/Loading';

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
  NewRoute(RoutesEnum.ROOT, Home),
  NewRoute(RoutesEnum.PROFILE, Profile),
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
  console.log(getRoutes());
  return (
    <Suspense fallback={<Loading />}>
      <Switch>{[getRoutes()]}</Switch>
    </Suspense>
  );
}
