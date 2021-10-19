import React from "react";

const CreateSafeCard = (props) => {
  const { SafeName, Owner } = props.CreateSafedetail;

  return (
    <div className="item">
      <h1>{SafeName}</h1>
      <h1>{Owner}</h1>
    </div>
  );
};

export default CreateSafeCard;
