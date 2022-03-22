export const resetMessage = (dispatch, dispatchType) => {
  setTimeout(() => {
    dispatch({ type: dispatchType });
  }, 3000);
};
