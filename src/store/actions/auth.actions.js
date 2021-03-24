import { firebase, googleAuth } from "../../firebase/firebaseConfig";
import { endLoading, startLoading } from "./ui.actions";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);
export const authTypes = {
  login: "[auth] login",
  logout: "[auth] logout",
};
export const registerWithEmailPasswordName = (email, password, name) => {
  return (dispatch) => {
    dispatch(startLoading());
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(async ({ user }) => {
        await user.updateProfile({ displayName: name });
        dispatch(login(user.uid, user.displayName));
        dispatch(endLoading());
      })
      .catch((error) => {
        dispatch(endLoading());
        MySwal.fire(
          "Se produjo un error",
          "Vuelva a intentarlo más tarde",
          "error"
        );
      });
  };
};
export const loginWithEmailPassword = (email, password) => {
  return (dispatch) => {
    dispatch(startLoading());
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(({ user }) => {
        dispatch(login(user.uid, user.displayName));
        dispatch(endLoading());
      })
      .catch((error) => {
        dispatch(endLoading());
        MySwal.fire(
          "Se produjo un error",
          "Vuelva a intentarlo más tarde",
          "error"
        );
      });
  };
};

export const loginWithGoogle = () => {
  return (dispatch) => {
    firebase
      .auth()
      .signInWithPopup(googleAuth)
      .then(({ user }) => {
        dispatch(login(user.uid, user.displayName));
      })
      .catch((error) => {
        MySwal.fire(
          "Se produjo un error",
          "Vuelva a intentarlo más tarde",
          "error"
        );
      });
  };
};

export const login = (uid, name) => ({
  type: authTypes.login,
  payload: {
    uid,
    name,
  },
});

export const startLogout = () => {
  return async (dispatch) => {
    await firebase.auth().signOut();
    dispatch(logout());
  };
};

export const logout = () => ({
  type: authTypes.logout,
});
