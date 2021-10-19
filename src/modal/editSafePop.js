import React, { useState } from "react";
import "./PopUp.css";
import icon_safe from "../assests/images/icon_safe.svg";
import { useDispatch } from "react-redux";
import { editSafe } from "../redux/actions/AllSafeSlice";
import { useSelector } from "react-redux";
import api from "../api";

const EditSafePop = (props) => {
  //const allSafesList = useSelector((state) => state.allSafe);
  // const currentsafe = allSafesList.find((item) => item.id === props.id);
  const [SafeName, setSafeName] = useState(props.SafeName);
  const [Owner, setOwner] = useState(props.Owner);
  const [Description, setDescription] = useState(props.Description);
  const [Type, setType] = useState(props.Type);
  const dispatch = useDispatch();
  let matchId = props.idd;
  console.log(Type, props.Type, "sdbvkjsdvbdsv");

  // const add = (e) => {
  //   e.preventDefault();
  //   if (SafeName.length !== 0 || Owner.length !== 0) {
  //     dispatch(
  //       editSafe({
  //         id: matchId,
  //         SafeName: SafeName,
  //         Owner: Owner,
  //         Description: Description,
  //         Type: Type,
  //       })
  //     );
  //     props.setTrigger(false);
  //   } else {
  //     alert("please fill all details");
  //   }
  // };

  const add = (e) => {
    e.preventDefault();
    // using redux
    dispatch(
      editSafe({
        id: matchId,
        SafeName: SafeName,
        Owner: Owner,
        Description: Description,
        Type: Type,
      })
    );
    api
      .patch(`/${props.idd}`, {
        SafeName: SafeName,
        Owner: Owner,
        Description: Description,
        Type: Type,
      })
      .then(console.log("sucess"))
      .catch((error) => {
        console.log(error.responce);
      });

    props.setTrigger(false);
    props.reload();
  };

  return (
    <div className="popup">
      <form className="form" onSubmit={add}>
        <h2 className="form-h2">Edit Safe</h2>
        <div className="infoDiv">
          <img src={icon_safe} className="shieldImg" alt="safeImage"></img>
          <p className="topP">
            A Safe is a logical unit to store the secrets. All the safes are
            created within Vault. You can control access only at the safe level.
            As a vault administrator you can manage safes but cannot view the
            content of the safe.
          </p>
        </div>
        <div className="SafeInputs">
          <label>Safe Name</label>
          <input
            className="inputTag"
            type="text"
            placeholder="Enter Safe Name"
            value={SafeName}
            onChange={(e) => setSafeName(e.target.value)}
          ></input>
          <label>Owner</label>
          <input
            className="inputTag"
            type="text"
            placeholder="Enter Owner Name"
            value={Owner}
            onChange={(e) => setOwner(e.target.value)}
          ></input>
          <label>Type</label>
          <select
            className="createSafeSelect"
            value={Type}
            onChange={(e) => setType(e.target.value)}
          >
            <option value="personal">Personal</option>
            <option value="corporate">Corporate</option>
            <option value="shared">Shared</option>
          </select>
          <label>Description</label>
          <textarea
            placeholder="Enter Description About Safe"
            rows="6"
            cols="50"
            value={Description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
          <p className="bottomP">Please add a minimum of 10 characters</p>
        </div>
        <div className="buttons">
          <button className="cancelBtn" onClick={() => props.setTrigger(false)}>
            Cancel
          </button>
          <input type="submit" value="Save Edit" className="createBtn" />
          {props.children}
        </div>
      </form>
    </div>
  );
};

export default EditSafePop;
