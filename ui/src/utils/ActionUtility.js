export async function createThunkEffect(dispatch, actionType, effect, ...args) {
  dispatch(createAction(actionType));

  const response = await effect(...args);

  dispatch(createAction(`${actionType}_FINISHED`, response));
}

export function createAction(
  type,
  payload = undefined,
  error = false,
  meta = null
) {
  return { type, payload, error, meta };
}
