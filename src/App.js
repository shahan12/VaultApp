import React, { useLayoutEffect, useState } from "react";
import Header from "./component/header/Header";
import "./App.css";
import AllSafes from "./screens/safes/safeFolder/allSafes/AllSafes";
import SecretSafes from "./screens/safes/secretFolder/SecretSafes";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import ValutAppRoles from "./screens/valutAppRoles/ValutAppRoles";

function App() {
  const [selectSafe, setSelectSafe] = useState();
  const [refresh, setRefresh] = useState(0);
  const pagereload = () => {
    setRefresh(refresh + 1);
    setSelectSafe({});
    console.log("refrsh", refresh);
  };
  return (
    <Router>
      <div className="wrapper">
        <Header />
        <div className="content">
          <Switch>
            <Route exact path="/">
              <AllSafes
                setSelectSafe={setSelectSafe}
                refresh={refresh}
                pagereload={pagereload}
              />
              <SecretSafes
                selectSafe={selectSafe}
                refresh={refresh}
                pagereload={pagereload}
              />
            </Route>
            <Route path="/ValutAppRoles" component={ValutAppRoles} />
            <Route path="/ServiceAccounts" component={ValutAppRoles} />
            <Route path="/IAMServiceAccounts" component={ValutAppRoles} />
            <Route path="/AzureActiveDirectory" component={ValutAppRoles} />
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
