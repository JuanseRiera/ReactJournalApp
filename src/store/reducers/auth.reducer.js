import { authTypes } from "../actions/auth.actions";

const initialState = {
  uid: null,
  name: null,
};

export const authReducer = (state = initialState, actions) => {
  switch (actions.type) {
    case authTypes.login:
      return {
        uid: actions.payload.uid,
        name: actions.payload.name,
      };

    case authTypes.logout:
      return {
        uid: null,
        name: null,
      };

    default:
      return state;
  }
};
