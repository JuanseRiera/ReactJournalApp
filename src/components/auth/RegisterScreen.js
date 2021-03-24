import React from "react";
import { Link } from "react-router-dom";
import { useForm } from "../../Hooks/useForm";
import validator from "validator";
import { useDispatch, useSelector } from "react-redux";
import { setError, unsetError } from "../../store/actions/ui.actions";
import { registerWithEmailPasswordName } from "../../store/actions/auth.actions";

export const RegisterScreen = () => {
  const dispatch = useDispatch();
  const { error, loading } = useSelector((state) => state.ui);
  const { formState, changeInput } = useForm({
    nombre: "Juanse Riera",
    email: "rierajuanse@gmail.com",
    contrasenna: "juanse",
    contrasenna2: "juanse",
  });

  const { nombre, email, contrasenna, contrasenna2 } = formState;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isFormValid()) {
      return;
    }
    dispatch(registerWithEmailPasswordName(email, contrasenna, nombre));
  };

  const isFormValid = () => {
    if (nombre.trim().length === 0) {
      dispatch(setError("Nombre es requerido"));
      return false;
    } else if (!validator.isEmail(email)) {
      dispatch(setError("Email invalido"));
      return false;
    } else if (contrasenna.trim().length < 5) {
      dispatch(
        setError(
          "La contraseña no es suficientemente larga, mínimo 6 caracteres"
        )
      );
      return false;
    } else if (contrasenna !== contrasenna2) {
      dispatch(setError("Las contraseñas no coinciden"));
      return false;
    }
    dispatch(unsetError());
    return true;
  };

  return (
    <div>
      <h2 className="auth__tittle">Registrarse</h2>
      <hr />
      <form className="mt-5" onSubmit={handleSubmit}>
        {error && <div className="auth__alert-error">{error}</div>}
        <input
          name="nombre"
          autoComplete="off"
          placeholder="Ingrese su nombre"
          type="text"
          className="auth__input"
          value={nombre}
          onChange={changeInput}
        />

        <input
          name="email"
          autoComplete="off"
          placeholder="Ingrese su email"
          type="text"
          className="mt-3 auth__input"
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

        <input
          name="contrasenna2"
          placeholder="Comprobar la contraseña"
          type="password"
          className="mt-3 auth__input"
          value={contrasenna2}
          onChange={changeInput}
        />
        <button
          type="submit"
          className="mt-5 mb-3 btn btn-primary btn-block pointer"
          disabled={loading}
        >
          Registrarse
        </button>
      </form>

      <hr />
      <div className="auth__go-to">
        <Link to="/auth/login" className="link">
          Ya estás registrado?
        </Link>
      </div>
    </div>
  );
};
