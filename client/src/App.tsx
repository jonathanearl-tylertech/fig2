import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import styled from 'styled-components'

import FriendFeed from './components/FriendFeed';
import NavBar from './components/NavBar'
import './App.css';

function App() {
  return (
    <Router>
      <Container>
        <Main>
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
        </Main>
        <NavBar></NavBar>

      </Container>
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

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
`
const Main = styled.main`
  display: flex;
  flex-direction: column;
  flex: 1;
`
