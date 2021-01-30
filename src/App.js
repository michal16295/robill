import React, { useEffect } from "react";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import { useHistory } from "react-router-dom";
import paths from "./constants/paths";
import Login from "./screens/Login";
import Register from "./screens/Register";
import Home from "./screens/Home";
import NavBar from "./components/NavBar";
import UserProvider from "./providers/UserProvider";

const App = () => {
  const history = useHistory();
  return (
    <UserProvider>
      <Router history={history}>
        <NavBar />
        <Switch>
          <Route key="Home" path={paths.HOME || "/"} component={Home} />
          <Route key="Login" exact path={paths.LOGIN} component={Login} />
          <Route
            key="Register"
            exact
            path={paths.REGISTER}
            component={Register}
          />
        </Switch>
      </Router>
    </UserProvider>
  );
};

export default App;
