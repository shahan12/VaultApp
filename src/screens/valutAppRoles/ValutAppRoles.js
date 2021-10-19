// import React from "react";
// 

// const ValutAppRoles = () =>{

//     return (<div className="Valut">
//         <h1>App Valut Roles</h1>
//     </div>);
// }

// export default ValutAppRoles;

import React, { Component } from "react";
import { useLocation } from "react-router-dom";
import './ValutAppRoles.css';

function ValutAppRoles() {
  const useQuery = () => {
    return new URLSearchParams(useLocation().search);
  };
  let query = useQuery();
  let userName = query.get("name");
  let userId = query.get("userId");

  return (
    <div className="Valut">
      <h1>{userName}</h1>
      <h1>{userId}</h1>
    </div>
  );
}

export default ValutAppRoles;
