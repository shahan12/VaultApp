import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import api from "../api";
import { editFolder } from "../redux/actions/AllSafeSlice";
import "./PopUp.css";
import OutsideClickHandler from "react-outside-click-handler";
import Loader from "react-loader-spinner";

const CreateSecretFolder = (props) => {
  const dispatch = useDispatch();
  console.log(props, "in secret props");
  //const [secretFolder, setSecretFolder] = useState([]);
  const [folder, setFolder] = useState("");
  const [loader, setLoader] = useState(false);
  //const allSafes = useSelector((state) => state.allSafe);
  const pId = props.selectID;
  console.log(pId, " id of selected ");

  const addFolder = async (e) => {
    e.preventDefault();
    //if (/^\w+$/.test(folder.trim)) return false;

    if (folder.length > 9) {
      dispatch(
        editFolder({
          id: pId,
          folder: folder,
        })
      );
      console.log(folder, "folder print");
      if (props.selectSafe.secrets.includes(folder)) {
        alert("Same Secret Key Exists");
      } else {
        setLoader(true);
        await api
          .put(`/secret/${pId}`, { secret: folder })
          .then(console.log("secretsucess"))

          .catch((error) => {
            console.log(error.response);
          });
        console.log(pId, "pid in add secret");
        console.log(folder, "secret value");
        setLoader(false);
        props.setTrigger(false);
        props.pagereload();
      }
    } else {
      alert("please fill min 10");
    }
  };
  const validateSecretsForm = () => {
    if (/^[a-z0-9_]*$/.test(folder)) return true;

    return false;
  };
  return (
    <div className="popup">
      <OutsideClickHandler
        onOutsideClick={() => {
          props.setTrigger(false);
        }}
      >
        <form
          className="form"
          onSubmit={(e) => {
            e.preventDefault();
            if (validateSecretsForm()) addFolder(e);
            else {
              alert("Enter lowercase number only");
            }
          }}
        >
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
            <p className="bottomP">
              Please add lower case aplabets numbers and underscores only
            </p>
          </div>
          {loader ? (
            <div style={{ display: "flex", justifyContent: "center" }}>
              <Loader type="Circles" color="#00BFFF" height={50} width={50} />
            </div>
          ) : (
            <div className="buttons">
              <button
                className="cancelBtn"
                onClick={() => props.setTrigger(false)}
              >
                Cancel
              </button>

              <input type="submit" value="+ Create" className="createBtn" />
              {props.children}
            </div>
          )}
        </form>
      </OutsideClickHandler>
    </div>
  );
};

export default CreateSecretFolder;
