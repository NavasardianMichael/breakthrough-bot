import { UserManager } from 'oidc-client';

const config = {
  authority: import.meta.env.VITE_OIDC_AUTHORITY,
  client_id: import.meta.env.VITE_OIDC_CLIENT_ID,
  redirect_uri: import.meta.env.VITE_OIDC_REDIRECT_URI,
  response_type: import.meta.env.VITE_OIDC_RESPONSE_TYPE,
  scope: import.meta.env.VITE_OIDC_SCOPE,
  post_logout_redirect_uri: import.meta.env.VITE_OIDC_POST_LOGOUT_REDIRECT_URI,
  automaticSilentRenew: import.meta.env.VITE_OIDC_AUTOMATIC_SILENT_RENEW,
  silent_redirect_uri: import.meta.env.VITE_OIDC_SILENT_REDIRECT_URI,
  accessTokenExpiringNotificationTime: import.meta.env.VITE_OIDC_ACCESS_TOKEN_EXPIRING_NOTIFICATION_TIME
};

const userManager = new UserManager(config);

export default userManager;
