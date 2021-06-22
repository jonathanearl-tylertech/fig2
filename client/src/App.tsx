import React from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch } from "react-router-dom";
import FriendFeed from './components/FriendFeed';
import NavBar from './components/NavBar'
import Profile from './components/Profile';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  gql
} from "@apollo/client";
const client = new ApolloClient({
  uri: 'http://0.0.0.0:8080/query',
  cache: new InMemoryCache()
});
function App() {
  return (

    <Router>
      <ApolloProvider client={client}>
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
      </ApolloProvider>,
    </Router>

  );
}

export default App;