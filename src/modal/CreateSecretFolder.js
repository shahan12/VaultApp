import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import api from "../api";
import { editFolder } from "../redux/actions/AllSafeSlice";
import "./PopUp.css";

const CreateSecretFolder = (props) => {
  const dispatch = useDispatch();
  //const [secretFolder, setSecretFolder] = useState([]);
  const [folder, setFolder] = useState("");

  //const allSafes = useSelector((state) => state.allSafe);
  const pId = props.selectID;
  console.log(pId, " id of selected ");

  const addFolder = (e) => {
    e.preventDefault();
    if (folder.length > 9) {
      dispatch(
        editFolder({
          id: pId,
          folder: folder,
        })
      );
      api
        .put(`/secret/${pId}`, { secret: folder })
        .then(console.log("secretsucess"))

        .catch((error) => {
          console.log(error.response);
        });
      console.log(pId, "pid in add secret");
      console.log(folder, "secret value");

      props.setTrigger(false);
    } else {
      alert("please fill min 10");
    }
  };

  return (
    <div className="popup">
      <form className="form" onSubmit={addFolder}>
        <h2 className="form-h2">Add folder</h2>
        <span className="form-fname">Folder Name</span>
        <div className="SafeInputs">
          <input
            className="inputTag"
            type="text"
            placeholder="Enter Folder Name"
            value={folder}
            onChange={(e) => setFolder(e.target.value)}
          ></input>
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

export default CreateSecretFolder;
