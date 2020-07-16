import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Alert from './components/layout/Alert';
// using Redux
import { Provider } from 'react-redux';
import store from './store';
import { loadUser } from './actions/auth';
import setAuthToken from './utils/setAuthToken';

// always send token in local storage
if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {

  // useEffect to call loadUser
  // classes/lifecycle method like componentDidMount if using classes, but using functions, use useEffect
  useEffect(() => {
    // access to store, call dispatch(method on store) then pass in loadUser
    store.dispatch(loadUser());
    // must add empty array as second parameter for useEffect to keep from looping
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Navbar />
          <Route exact path='/' component={Landing} />
          <section className='container'>
            <Alert />
            <Switch>
              <Route exact path='/register' component={Register} />
              <Route exact path='/login' component={Login} />
            </Switch>
          </section>
        </Fragment>
      </Router>
    </Provider >
  );
};

export default App;
