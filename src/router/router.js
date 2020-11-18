import Home from "../page/home/Home";
import Help from "../page/help/Help";

export default [
  {
    path: "/Home",
    name: "home",
    component: Home,
    navType: {
      type: "text",
      title: "home",
    },
  },
  {
    path: "/Help",
    name: "help",
    component: Help,

    navType: {
      type: "text",
      title: "help",
    },
  },
];
