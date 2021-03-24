import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import validator from "validator";
import { useForm } from "../../Hooks/useForm";
import {
  loginWithEmailPassword,
  loginWithGoogle,
} from "../../store/actions/auth.actions";
import { setError, unsetError } from "../../store/actions/ui.actions";

export const LoginScreen = () => {
  const dispatch = useDispatch();
  const { error, loading } = useSelector((state) => state.ui);
  const { formState, changeInput } = useForm({
    email: "",
    contrasenna: "",
  });

  const { email, contrasenna } = formState;

  const handleLogin = (e) => {
    e.preventDefault();
    if (!isFormValid()) {
      return;
    }
    dispatch(loginWithEmailPassword(email, contrasenna));
  };

  const isFormValid = () => {
    if (!validator.isEmail(email)) {
      dispatch(setError("El email ingresado es inválido"));
      return false;
    } else if (contrasenna.trim().length < 5) {
      dispatch(setError("La contraseña ingresada no es válida"));
      return false;
    }
    dispatch(unsetError());
    return true;
  };

  const handleLoginGoogle = () => {
    dispatch(loginWithGoogle());
  };
  return (
    <div>
      <h2 className="auth__tittle">Iniciar Sesión</h2>
      <hr />
      <form className="mt-5" onSubmit={handleLogin}>
        {error && <div className="auth__alert-error">{error}</div>}
        <input
          name="email"
          autoComplete="off"
          placeholder="Ingrese su email"
          type="text"
          className="auth__input"
          value={email}
          onChange={changeInput}
        />

        <input
          name="contrasenna"
          placeholder="Ingrese su contraseña"
          type="password"
          className="mt-3 auth__input"
          value={contrasenna}
          onChange={changeInput}
        />

        <button
          type="submit"
          className="mt-5 mb-3 btn btn-primary btn-block pointer"
          disabled={loading}
        >
          Iniciar Sesión
        </button>
      </form>

      <hr />
      <div className="auth__redes-sociales">
        <p>Iniciar Sesión con redes sociales</p>

        <div className="google-btn" onClick={handleLoginGoogle}>
          <div className="google-icon-wrapper">
            <img
              className="google-icon"
              src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
              alt="google button"
            />
          </div>
          <p className="btn-text">
            <b>Sign in with google</b>
          </p>
        </div>
      </div>
      <hr />
      <div className="auth__go-to">
        <Link to="/auth/register" className="link">
          Registrarse
        </Link>
      </div>
    </div>
  );
};
