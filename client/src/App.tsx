import React from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

import FriendFeed from './components/FriendFeed';
import './App.css';

function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/users">
            <Users />
          </Route>
          <Route path="/">
            <FriendFeed />
          </Route>
        </Switch>

        <nav>
          <ul>
            <li>
              <Link to="/">FriendFeed</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/users">Users</Link>
            </li>
          </ul>
        </nav>
      </div>
    </Router>
  );
}

export default App;

function About() {
  return <h2>About</h2>;
}

function Users() {
  return <h2>Users</h2>;
}
