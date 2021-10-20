import React, { useState } from "react";
import "./Header.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";
// import AllSafes from "../safes/AllSafes";
// import SecretSafes from "../screens/secretFolder/SecretSafes";
// import ValutAppRoles from "../ValutAppRoles";

import logo from "../../assests/images/logo.png";
import ValutAppRoles from "../../screens/valutAppRoles/ValutAppRoles";
import ServiceAccounts from "../../screens/serviceAccounts/serviceAccounts";
import IAMServiceAccounts from "../../screens/iamService/iamService";
import Azure from "../../screens/azure/azure";

const Header = () => {
  const [clickedActiveId, setClickedActiveId] = useState(1);
  const links = [
    { id: 1, name: "Safes", path: "Safes" },
    { id: 2, name: "App VaultRoles", path: "ValutAppRoles" },
    { id: 3, name: "Service Accounts", path: "ServiceAccounts" },
    { id: 4, name: "IAM Service Accounts", path: "IAMSERVICEACCOUNTS" },
    { id: 5, name: "Azure Active Directory", path: "AZURE" },
  ];
  const handleClick = (id) => {
    setClickedActiveId(id);
  };

  return (
    <Router>
      <div className="header">
        <div className="headerSize">
          <div className="rightHead">
            <div className="rH1">
              <img src={logo} alt="logo" className="siteLogo"></img>
              <h2 id="logoText">T-VAULT</h2>
            </div>
            {links.map((item) => {
              return (
                <div
                  key={item.id}
                  className="rH2"
                  onClick={() => handleClick(item.id)}
                  id={clickedActiveId == item.id ? "active" : null}
                >
                  <ul className="rH2-list">
                    <Link
                      to={`/${item.path}${
                        item.id == 1 ? "" : "?name=shahan&userId=10"
                      }`}
                      className="router-link-li"
                    >
                      <li className="rH2-li">{item.name}</li>
                    </Link>
                  </ul>
                </div>
              );
            })}
            {/* <ul className="rH2-list">
                <li className="rH2-li">
                  <Link to="/" className="router-link-li">
                    Safes
                  </Link>
                </li>
                <li className="rH2-li" id="2">
                  <Link to="/ValutAppRoles" className="router-link-li">
                    Vault AppRoles
                  </Link>
                </li>
                <li className="rH2-li" id="3">
                  <Link to="/SecretSafes" className="router-link-li">
                    Service Accounts
                  </Link>
                </li>
                <li className="rH2-li" id="4">
                  <Link to="/" className="router-link-li">
                    IAM Service Accounts
                  </Link>
                </li>
                <li className="rH2-li" id="5">
                  <Link to="/" className="router-link-li">
                    Azure Active Directory
                  </Link>
                </li>
              </ul> */}
          </div>
          <div className="leftHead">
            <div className="lH1">Documentation</div>
            <div className="lH2">(Admin) Davis R.</div>
          </div>
        </div>
      </div>
      <Switch>
        <Route exact path="/">
          <Redirect to="/Safes" />
        </Route>
        <Route exact path="/Safes">
          <homePage />
        </Route>
        <Route exact path="/ValutAppRoles">
          <ValutAppRoles />
        </Route>
        <Route exact path="/ServiceAccounts">
          <ServiceAccounts />
        </Route>
        <Route exact path="/IAMSERVICEACCOUNTS">
          <IAMServiceAccounts />
        </Route>
        <Route exact path="/AZURE">
          <Azure />
        </Route>

        {/* <Route path="/SecretSafes">
                <SecretSafes />
              </Route> */}
      </Switch>
    </Router>
  );
};

export default Header;
