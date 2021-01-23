import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import LandingPage from './pages/Home/LandingPage';
import ProfilePage from './pages/Home/ProfilePage';

const Navbar = lazy(() => import('./Components/Navbar/Navbar'));

const Home = lazy(() => import('./pages/Home/Home'));

const AppRouter = () => (
  <Router>
    <Suspense fallback={<p>Loading...</p>}>
      <Route
        path='/'
        component={Navbar}
      />
      <Switch>
        <Route
          exact
          path='/'
          component={Home}
        />
      </Switch>
      <Switch>
        <Route
          exact
          path='/landingPage'
          component={LandingPage}
        />
      </Switch>
      <Switch>
        <Route
          exact
          path='/profilePage'
          component={ProfilePage}
        />
      </Switch>
    </Suspense>
  </Router>
);

export default AppRouter;
