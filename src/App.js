import React, { useEffect, useRef, useState, useContext } from "react";
import theme from "./plugins/material";
import { MuiThemeProvider } from "@material-ui/core/styles";
import i18n from "./plugins/i18n";

import { useTranslation } from "react-i18next";
import "./App.scss";
import ContextHandler, { AuthInfoContext } from "./context";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
} from "react-router-dom";
import Background from "../src/layouts/background";
import DefaultLayout from "../src/layouts/defaultLayout";
import RouterList from "../src/router/router";
import Loading from "../src/components/basicUi/loading/Loading";

const findLayout = () => {
  let target = RouterList.find((route) => {
    return route.path == window.location.pathname;
  });

  return !!target ? (!!target.layout ? target.layout : "default") : "default";
};
const getNavType = () => {
  let target = RouterList.find((route) => {
    if (window.location.pathname.indexOf(route.path) != -1) {
      if (window.location.pathname.length - route.path.length < 3) {
        return route.path;
      }
    }
  });

  return target ? target.navType : false;
};

function App(props) {
  const router = useRef();
  const { t } = useTranslation();
  const [layout, setLayout] = useState(findLayout());
  const [navType, setNavType] = useState(getNavType());
  const [loading, setloading] = useState(false);

  const layouts = {
    default: DefaultLayout,
    background: Background,
  };

  var LayoutComponet = layouts[layout];

  useEffect(() => {
    window.emitter.addListener("loading-start", () => {
      setloading(true);
    });
    window.emitter.addListener("loading-end", () => {
      setloading(false);
    });

    const themeType = theme.palette.type;

    Object.keys(theme.palette).forEach((styleKey) => {
      if (typeof theme.palette[styleKey] == "string") {
        document.documentElement.style.setProperty(
          `--${styleKey}`,
          theme.palette[styleKey]
        );
      } else if (theme.palette[styleKey][themeType]) {
        document.documentElement.style.setProperty(
          `--${styleKey}`,
          theme.palette[styleKey][themeType]
        );
      }
    });
  }, []);
  useEffect(() => {
    router.current.history.listen(() => {
      setLayout(findLayout());
      setNavType(getNavType());
    });
  }, [window.location.pathname]);

  return (
    <div id="app" className="app" style={{ overflow: "visible" }}>
      <ContextHandler>
        <MuiThemeProvider theme={theme}>
          <LayoutComponet
            router={router}
            navType={navType ? navType : { type: "default" }}
          >
            {loading ? (
              <Loading
                display={loading}
                msg={t("normal.loadingFont")}
              ></Loading>
            ) : (
              ""
            )}
            <Router ref={router}>
              {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
              <Switch>
                {RouterList.map((route, index) => {
                  const AddExtraProps = (props) => {
                    return (
                      <route.component {...props} key={index}></route.component>
                    );
                  };

                  return (
                    <Route
                      key={index}
                      path={route.path}
                      // component={AddExtraProps(route.component,{special:878})}
                      render={AddExtraProps}
                    ></Route>
                  );
                })}
              </Switch>
            </Router>
          </LayoutComponet>
        </MuiThemeProvider>
      </ContextHandler>
    </div>
  );
}

export default App;
