import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { HashRouter as Router, Switch, Redirect } from "react-router-dom";
import { startChecking } from "../actions/authActions";
import { PrivateRoute } from "./PrivateRoute";
import { PublicRoute } from "./PublicRoute";
import { NewBookScreen } from "../components/newBook/NewBook";
import { LoginScreen } from "../components/auth/LoginScreen";
import { HomeScreen } from "../components/homeScreen/HomeScreen";
import { EditBookScreen } from "../components/editBook/EditBook";

export const AppRouter = () => {
  const dispatch = useDispatch();
  const { checking, uid } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(startChecking());
  }, [dispatch, checking, uid]);

  if (checking) {
    return <h1>Espere..</h1>;
  }

  return (
    <div>
      <Router>
        <Switch>
          <PublicRoute
            exact
            path="/login"
            component={LoginScreen}
            isAuthenticated={!!uid}
          />

          <PrivateRoute
            exact
            path="/"
            component={HomeScreen}
            isAuthenticated={!!uid}
          />

          <PrivateRoute
            exact
            path="/books/agg"
            component={NewBookScreen}
            isAuthenticated={!!uid}
          />

          <PrivateRoute
            exact
            path="/books/edit/:id"
            component={EditBookScreen}
            isAuthenticated={!!uid}
          />

          <Redirect to={"/"} />
        </Switch>
      </Router>
    </div>
  );
};
