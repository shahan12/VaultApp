import React, { useState } from "react";
import "./PopUp.css";
import icon_safe from "../assests/images/icon_safe.svg";
import { useDispatch } from "react-redux";
import { addSafe } from "../redux/actions/AllSafeSlice";
import api from "../api";
import axios from "axios";

const CreateSafe = (props) => {
  const [inputList, setInputList] = useState([]);
  const [SafeName, setSafeName] = useState([]);
  const [Owner, setOwner] = useState([]);
  const [Description, setDescription] = useState([]);
  const [Type, setType] = useState("personal");

  const dispatch = useDispatch();

  const add = async (e) => {
    e.preventDefault();
    if (SafeName.length !== 0 || Owner.length !== 0) {
      if (Description.length >= 10) {
        dispatch(
          addSafe({
            SafeName: SafeName,
            Owner: Owner,
            Description: Description,
            Type: Type,
          })
        );
        console.log(Type, "typein safe");
        await api
          .post("/", {
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
      } else {
        alert("please fill min 10 charaters");
      }
    } else {
      alert("please fill all details");
    }
    props.pagereload();
  };

  return (
    <div className="popup">
      <form className="form" onSubmit={add}>
        <h2 className="form-h2">Create Safe</h2>
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
          <input type="submit" value="+ Create" className="createBtn" />
          {props.children}
        </div>
      </form>
    </div>
  );
};

export default CreateSafe;
