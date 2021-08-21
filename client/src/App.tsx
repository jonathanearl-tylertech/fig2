import React from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch } from "react-router-dom";
import FriendFeed from './components/FriendFeed';
import NavBar from './components/NavBar'
import { Login } from './login/Login';
import { Profile } from './profile/Profile';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import purple from '@material-ui/core/colors/purple';

const theme = createTheme({
  palette: {
    primary: {
      main: purple[600],
    },
    secondary: {
      main: purple[300],
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <main className="h-screen w-screen">
          <NavBar></NavBar>
          <Login></Login>
          <Switch>
            <Route path="/feed">
              <FriendFeed />
            </Route>
            <Route path="/profile">
              <Profile />
            </Route>
          </Switch>
        </main>
      </Router>
      <iframe id="oauthMessager"></iframe>
    </ThemeProvider>
  );
}

export default App;