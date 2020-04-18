import React from 'react';
import 'semantic-ui-css/semantic.min.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import ManageUsers from './pages/ManageUsers';
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/" exact>
            <Home />
          </Route>
          <Route
            exact
            path="/login"
            render={() => <Login />} />
          <Route
            exact
            path="/register"
            render={() => <Register />} />
          <PrivateRoute
            path="/dashboard"
            render={() => <Dashboard />} />
          <PrivateRoute
            path="/manage-users"
            render={() => <ManageUsers />} />
          <Route
            exact
            path="/logout"
            render={() => {
              localStorage.removeItem('token');
              return (<Redirect to="/login" />);
            }} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
