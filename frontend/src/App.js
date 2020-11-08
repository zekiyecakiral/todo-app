import React, { Suspense } from 'react';
// import {
//   BrowserRouter as Router,
//   Route,
//   Redirect,
//   Switch,
// } from 'react-router-dom';
import {BrowserRouter, Route, Switch} from "react-router-dom";

// import MainNavigation from './shared/components/Navigation/MainNavigation';
import { AuthContext } from './shared/context/auth-context';
import { useAuth } from './shared/hooks/auth-hook';
import LoadingSpinner from './shared/components/UIElements/LoadingSpinner';

// const Layout = React.lazy(() => import('./Layout'));
// const LeftSide = React.lazy(() => import('./LeftSide'));

// const Todo = React.lazy(() => import('./Todo'));
// const HomePage = React.lazy(() => import('./HomePage'));
// const Auth = React.lazy(() => import('./Auth'));

import Layout from './Layout';
import HomePage from './HomePage';
import Todo from './Todo';

const App = () => {
  const { token, login, logout, userId } = useAuth();

  let routes;

  if (token) {
    routes = (
      <Switch>
        {/* <Route path='/' exact>
          <Layout />
        </Route>
        <Route path='/:tagId' exact>
          <Todo />
        </Route> */}
      </Switch>
    );
  } else {
    routes = (
      <Switch>
        {/* <Route path='/' exact>
          <Auth />
        </Route>
        <Redirect to='/' /> */}
      </Switch>
    );
  }
  ReactDOM.render(<Routes/>, document.getElementById('root'));
//   return (
//     // <AuthContext.Provider
//     //   value={{
//     //     isLoggedIn: !!token,
//     //     token: token,
//     //     userId: userId,
//     //     login: login,
//     //     logout: logout,
//     //   }}
//     // >
//     //   <Router>
//     //     <main>
//     //       <Suspense
//     //         fallback={
//     //           <div className='center'>
//     //             <LoadingSpinner />
//     //           </div>
//     //         }
//     //       ></Suspense>
//     //     </main>
//     //   </Router>
//     // </AuthContext.Provider>

// //     <BrowserRouter>
// //     <Route render={(props)=>(
// //         <Layout {...props}>
// //             <Switch>
// //                 <Route path="/" exact component={HomePage}/>
// //                 <Route path="/:tag" exact component={Todo}/>
// //                 {/* <Route path="/dashboard" exact component={Dashboard}/>
// //                 <Route path="/page-1" component={Page1}/>
// //                 <Route path="/page-2" component={Page2}/>
// //                 <Route path="/page-3" component={Page3}/>
// //                 <Route component={NotFound}/> */}
// //             </Switch>
// //         </Layout>
// //     )}/>
// // </BrowserRouter>
//   );
};

export default App;
