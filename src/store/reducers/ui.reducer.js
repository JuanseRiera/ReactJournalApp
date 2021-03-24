import { uiTypes } from "../actions/ui.actions";

const initialState = {
  loading: false,
  error: null,
};

export const uireducer = (state = initialState, action) => {
  switch (action.type) {
    case uiTypes.setError:
      return {
        ...state,
        error: action.payload,
      };

    case uiTypes.unsetError:
      return {
        ...state,
        error: null,
      };

    case uiTypes.startLoading:
      return {
        ...state,
        loading: true,
      };

    case uiTypes.endLoading:
      return {
        ...state,
        loading: false,
      };

    default:
      return state;
  }
};
