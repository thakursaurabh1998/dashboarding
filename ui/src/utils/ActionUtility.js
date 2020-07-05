export async function createThunkEffect(dispatch, actionType, effect, ...args) {
  dispatch(createAction(actionType));

  const response = await effect(...args);

  const isErrored = Boolean(response.error);

  dispatch(createAction(`${actionType}_FINISHED`, response, isErrored, args));
}

export function createAction(
  type,
  payload = undefined,
  error = false,
  meta = null
) {
  return { type, payload, error, meta };
}
