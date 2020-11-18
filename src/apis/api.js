import req from "./https.js";
import { apiUrl, jsonServer } from "./config.json";

export const apiTest = (params) =>
  req("get", `${true ? apiUrl : jsonServer}user/level`, params, true);

export const apiGetVcode = (params) =>
  req("get", `${true ? apiUrl : jsonServer}help/vcode`, params, false);

export const apiGetPhoneVcode = (params) =>
  req(
    "post",
    `${true ? apiUrl : jsonServer}user/register/verifyMobile`,
    params,
    false
  );

export const apiGetUserInfo = (params) =>
  req("get", `${true ? apiUrl : jsonServer}user/info`, params, true);
