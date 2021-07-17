import React from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch } from "react-router-dom";
import FriendFeed from './components/FriendFeed';
import NavBar from './components/NavBar'
import { Profile } from './profile/Profile';


function App() {
  return (
    <Router>
      <main className="h-screen w-screen">
        <NavBar></NavBar>
        <Switch>
          <Route path="/feed">
            <FriendFeed />
          </Route>
          <Route path="/profile">
            <Profile />
          </Route>
          <Route path="/">
            <Redirect from="/" to="/profile" />
          </Route>
        </Switch>
      </main>
    </Router>
  );
}

export default App;