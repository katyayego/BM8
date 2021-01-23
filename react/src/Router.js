import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import LandingPage from './pages/Home/LandingPage';
import ProfilePage from './pages/Home/ProfilePage';
import SearchPage from './pages/Home/SearchPage';

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
          component={LandingPage}
        />
      </Switch>
      <Switch>
        <Route
          exact
          path='/mapPage'
          component={Home}
        />
      </Switch>
      <Switch>
        <Route
          exact
          path='/profilePage'
          component={ProfilePage}
        />
      </Switch>
      <Switch>
        <Route
          exact
          path='/searchPage'
          component={SearchPage}
        />
      </Switch>
    </Suspense>
  </Router>
);

export default AppRouter;
