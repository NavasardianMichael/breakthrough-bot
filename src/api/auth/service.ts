import { UserManagerEvents } from 'oidc-client';
import userManager from "./config";

export function login() {
  userManager.signinRedirect();
}

export function logout() {
  userManager.signoutRedirect();
}

export function getUser() {
  return userManager.getUser();
}

export const signinRedirect: UserManagerEvents.UserSignedOutCallback = () => {
  console.log(123, import.meta.env.VITE_OIDC_REDIRECT_URI);
  const productId = localStorage.getItem('productId');
  const alternateAccessUserId = localStorage.getItem('alternateAccessUserId');

  sessionStorage.clear();

  const acr_values = `SubClient:${productId}` + (alternateAccessUserId ? ` AlternateAccessUserId:${alternateAccessUserId}` : '');

  userManager.signinRedirect({ extraQueryParams: { acr_values: acr_values }});
}