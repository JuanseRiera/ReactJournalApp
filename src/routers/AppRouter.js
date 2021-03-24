import React from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { firebase } from "../firebase/firebaseConfig";
import { BrowserRouter as Router, Switch, Redirect } from "react-router-dom";
import { JournalScreen } from "../journal/JournalScreen";
import { AuthRouter } from "./AuthRouter";
import { login } from "../store/actions/auth.actions";
import { PrivateRouter } from "./PrivateRouter";
import { PublicRouter } from "./PublicRouter";
import { useState } from "react";

export const AppRouter = () => {
  const dispatch = useDispatch();
  const [isLogged, setisLogged] = useState(false);
  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user?.uid) {
        dispatch(login(user.uid, user.displayName));
        setisLogged(true);
      } else {
        setisLogged(false);
      }
    });
  }, [dispatch]);

  return (
    <Router>
      <div>
        <Switch>
          <PublicRouter
            path="/auth"
            isAuthenticated={isLogged}
            component={AuthRouter}
          ></PublicRouter>
          <PrivateRouter
            path="/"
            isAuthenticated={isLogged}
            component={JournalScreen}
          ></PrivateRouter>
          <Redirect to="/auth/login" />
        </Switch>
      </div>
    </Router>
  );
};
