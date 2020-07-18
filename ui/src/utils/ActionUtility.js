import openNotification from 'utils/NotificationUtility';

export function createAction(
  type,
  payload = undefined,
  error = false,
  meta = null
) {
  return { type, payload, error, meta };
}

export async function createThunkEffect(dispatch, actionType, effect, ...args) {
  dispatch(createAction(actionType));

  const response = await effect(...args);

  const isErrored = Boolean(response.error);
  const errorMessage = "There's an issue";
  isErrored &&
    openNotification('BANNER', 'error', response?.message || errorMessage);

  dispatch(createAction(`${actionType}_FINISHED`, response, isErrored, args));
}
