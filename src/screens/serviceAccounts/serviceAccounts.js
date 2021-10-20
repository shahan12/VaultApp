import React, { Component } from "react";
import { useLocation } from "react-router-dom";
import "../valutAppRoles/ValutAppRoles.css";

function ServiceAccounts() {
  const useQuery = () => {
    return new URLSearchParams(useLocation().search);
  };
  let query = useQuery();
  let userName = query.get("name");
  let userId = query.get("userId");

  return (
    <div className="Valut">
      <h1>ServiceAccounts </h1>
      <h1>{userName}</h1>
      <h1>{userId}</h1>
    </div>
  );
}

export default ServiceAccounts;
