import axios from "axios";
import { signinRedirect } from './service';
import userManager from './config';

const isProd = import.meta.env.PROD;

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

async function getToken() {
  const token = sessionStorage?.getItem("tempt");
  if (token) return { access_token: token };

  const getLocalLogin = () => localStorage.getItem("storedLogin");
  const getLocalPassword = () => localStorage.getItem("storedPassword");

  const login = getLocalLogin() || prompt("Login");
  const password = getLocalPassword() || prompt("Password");

  const headers = new Headers();
  headers.append("Content-Type", "application/x-www-form-urlencoded");

  const urlencoded = new URLSearchParams();
  urlencoded.append("grant_type", "password");
  urlencoded.append("username", login!);
  urlencoded.append("password", password!);
  urlencoded.append("scope", "openid profile BreakthroughExecutionAPI");
  urlencoded.append("client_id", "CorporateWeb");
  urlencoded.append("client_secret", "secret");

  const requestOptions: RequestInit = {
    method: "POST",
    headers: headers,
    body: urlencoded,
    redirect: "follow",
  };

  try {
    const res = await fetch(
      "https://gap-qa.volo.local:4443/GAPIdentity.GAPIdentityServer/connect/token",
      requestOptions
    );
    const data = await res.json();

    if (!data.access_token) return console.error("The token is not provided.");

    if (getLocalLogin() !== login) localStorage.setItem("storedLogin", login!);
    if (getLocalPassword() !== password)
      localStorage.setItem("storedPassword", password!);
    sessionStorage.setItem("tempt", data.access_token);
    return data;
  } catch (e) {
    console.error(e);
  }
}

apiClient.interceptors.request.use(
  async (config) => {
    const { params } = config
    const user = isProd ? await userManager.getUser() : await getToken();

    if (!user) {
      signinRedirect();
      return Promise.reject(new Error("User not authenticated"));
    }

    const accessToken = user.access_token;

    return {
        ...config,
        'Authorization': `Bearer ${accessToken}`,
        'SoftwareInstanceGuid': params.softwareInstanceId,
        'OutcomeGuid': params.outcomeGuid,
        'ProjectGuid': params.projectGuid,
        'AlternateAccessUserId': params.alternateAccessUserI1d,
        'Cache-Control': 'no-cache',
        'Pragma': 'no-cache',
        'Expires': 'Sat, 01 Jan 2000 00:00:00 GMT',
        'If-Modified-Since': '0',
    };
  },
  (error) => {
    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  null,
  (error) => {
    if (isProd && error.response && error.response.status === 401) {
      signinRedirect();
    }
    return Promise.reject(error.response || error.message);
  }
);
