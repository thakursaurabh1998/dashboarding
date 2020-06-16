export const VALIDATE_AUTHENTICATION = 'VALIDATE_AUTHENTICATION';

export const validateAuthenticationAction = (isAuthenticated) => ({
  type: VALIDATE_AUTHENTICATION,
  isAuthenticated,
});
