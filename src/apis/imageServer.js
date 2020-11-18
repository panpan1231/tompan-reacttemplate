import req from "./https.js";
import { imageServer, jsonServer } from "./config.json";

export const apiPostImage = (params) =>
  req(
    "post",
    `${true ? imageServer : jsonServer}api/image/upload`,
    params,
    true
  );
