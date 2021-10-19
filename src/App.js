import React, { useLayoutEffect, useState } from "react";
import Header from "./component/header/Header";
import "./App.css";
import AllSafes from "./screens/safes/safeFolder/allSafes/AllSafes";
import SecretSafes from "./screens/safes/secretFolder/SecretSafes";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import ValutAppRoles from "./screens/valutAppRoles/ValutAppRoles";

function App() {
  const [selectSafe, setSelectSafe] = useState();

  return (
    <Router>
      <div className="wrapper">
        <Header />
        <div className="content">
          <Switch>
            <Route exact path="/">
              <AllSafes setSelectSafe={setSelectSafe} />
              <SecretSafes selectSafe={selectSafe} />
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
