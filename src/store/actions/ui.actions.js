export const uiTypes = {
  setError: "[ui] setError",
  unsetError: "[ui] unsetError",
  startLoading: "[ui] start loading",
  endLoading: "[ui] end loading",
};

export const setError = (error) => ({
  type: uiTypes.setError,
  payload: error,
});

export const unsetError = () => ({
  type: uiTypes.unsetError,
});

export const startLoading = () => ({
  type: uiTypes.startLoading,
});

export const endLoading = () => ({
  type: uiTypes.endLoading,
});
