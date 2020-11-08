import React, { Suspense } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { AuthContext } from './shared/context/auth-context';
import { useAuth } from './shared/hooks/auth-hook';

const Auth = React.lazy(() => import("./Auth"));
const Layout = React.lazy(() => import('./components/Layout'));
const Dashboard = React.lazy(() => import("./pages/Dashboard"));
const Todo = React.lazy(() => import("./pages/Todo"));

function Routes() {

  const { token, login, logout, userId } = useAuth();



  console.log('token',token);
  console.log('isLoggedIn',!!token);


  let routes;
  if (token) {
    routes = (
      <Layout>
        <Switch>
          <Route path='/' exact component={Dashboard} />
          <Route path='/dashboard' exact component={Dashboard} />
          <Route path='/:tagId' exact component={Todo} />
          <Redirect to='/' />
        </Switch>
      </Layout>
    );
  } else {
    routes = (
      <Switch>
        {/* <Route path='/auth' exact component={Auth} />
        <Redirect to='/auth' /> */}
           <Route path='/' exact component={Auth} />
        <Redirect to='/' />
      </Switch>
    );
  }

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: !!token,
        token: token,
        userId: userId,
        login: login,
        logout: logout,
      }}
    >
      <BrowserRouter>
        <main>
          <Suspense
            fallback={<div className='center'>{/* <LoadingSpinner /> */}</div>}
          >
            {' '}
            {routes}
          </Suspense>
        </main>
      </BrowserRouter>
    </AuthContext.Provider>
  );
}

export default Routes;
