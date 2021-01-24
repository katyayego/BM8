import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import LandingPage from './pages/Home/LandingPage';
import ProfilePage from './pages/Home/ProfilePage';
import SearchPage from './pages/Home/SearchPage';
import SignUp from './pages/Home/SignUp';
import LogIn from './pages/Home/LogIn';

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
      <Switch>
        <Route
          exact
          path='/signUp'
          component={SignUp}
        />
      </Switch>
      <Switch>
        <Route
          exact
          path='/logIn'
          component={LogIn}
        />
      </Switch>
    </Suspense>
  </Router>
);

export default AppRouter;
