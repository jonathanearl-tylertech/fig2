import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'
import FriendFeed from './components/FriendFeed';
import NavBar from './components/NavBar'
import { Login } from './components/Login';
import Registration from './components/Registration';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import purple from '@material-ui/core/colors/purple';
import { endUserSession, SessionState, startUserSession } from './feature/sessionslice';
import { AuthHelper } from './services/auth-helper';
import { RootState } from './store';
import { ProfileDetail } from './components/ProfileDetail';

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
  // const { username }: { username: string} = useParams();
  // console.log(username, useParams());
  const hasSession = useSelector((state: RootState) => state.session.hasSession);
  const dispatch = useDispatch()

  useEffect(() => {
    const fetchProfile = async () => {
      const token = await AuthHelper.getToken();
      if (!token) {
        dispatch(endUserSession());
        return;
      }

      const { REACT_APP_FIG_BASE_API } = process.env;
      const options = { headers: { authorization: `Bearer ${token}` } };
      const response = await fetch(`${REACT_APP_FIG_BASE_API}/profile/me`, options);
      const userinfo = await response.json();
      dispatch(startUserSession(userinfo));
    }

    fetchProfile();
  }, [dispatch])

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
            <Route path="/signup">
              <Registration />
            </Route>
            <Route path="/:username">
            { hasSession === SessionState.isActive && 
              <ProfileDetail />
            }
            </Route>
          </Switch>
        </main>
      </Router>
      <iframe title="hidden auth token retriever" id="oauthMessager"></iframe>
    </ThemeProvider>
  );
}

export default App;