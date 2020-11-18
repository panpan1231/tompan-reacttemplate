import react from "react";
import api from "../apis";
import timeTransformer from "./timeTransformer";

react.prototype.$api = api;
react.prototype.$trans = timeTransformer.timeTransform;
