import React, { useState } from "react";
import "./SecretSafes.css";
import background from "../../../assests/images/Banner_img.svg";
import locker from "../../../assests/images/locker.svg";
import plusFolder from "../../../assests/images/plusFolder.svg";
import CreateSecretFolder from "../../../modal/CreateSecretFolder";
import { useSelector } from "react-redux";
import folderIcon from "../../../assests/images/folderIcon.svg";
import secret from "../../../../src/assests/images/secret.png";
import AllSafes from "../safeFolder/allSafes/AllSafes";

const SecretSafes = ({ selectSafe, refresh, pagereload }) => {
  console.log(selectSafe, "selectSafe in secret");
  const [CreateSecretPopup, setCreateSecretPopup] = useState(false);
  //const allSafes = useSelector((state) => state.allSafe);
  // const selectSafe = allSafes.find((item) => item._id === selectID);
  //const selectSafe = selectSafe;
  const secrets = selectSafe ? selectSafe.secrets : null;
  console.log(secrets);
  console.log(selectSafe, "curerntsafe");
  //console.log(allSafes, "allsafes");

  return (
    <div className="secretSafes">
      <div
        className="secretSafes-top"
        style={{
          backgroundImage: "url(" + background + ")",
          backgroundRepeat: "no-repeat",
        }}
      >
        {selectSafe?.SafeName ? (
          <span id="safeName">
            {" "}
            {selectSafe.Owner} / {selectSafe.SafeName}{" "}
          </span>
        ) : (
          <span id="safeName">No Safe Selected </span>
        )}
        {/* {<span id="safeName"> No Safe Created</span>} */}
        <span id="safeDescription">
          A Safe is a logical unit to store the secrets. All the safes are
          created within Vault. You can control access only at the safe level.
          As a vault administrator you can manage safes but cannot view the
          content of the safe.
        </span>
      </div>
      <div className="secretSafes-content">
        <div className="secretSafes-nav">
          <div className="navLeft">
            <span id="nav-1" className="navLeftItem">
              Secrets
            </span>
          </div>
          <div className="nabRight">
            <span id="addFolder">Add Folder</span>
            <img src={plusFolder} alt="O" className="addFolderImg"></img>
          </div>
        </div>
        <div className="secrets-container">
          <span id="totalSecrets">{secrets?.length || 0} Secrets</span>
          {!secrets && (
            <div className="emptysecret">
              <img className="secretpng" src={secret} alt="secret"></img>{" "}
              <span className="addBtnSpan"></span>
            </div>
          )}

          {CreateSecretPopup && (
            <CreateSecretFolder
              selectSafe={selectSafe}
              selectID={selectSafe._id}
              pagereload={pagereload}
              setTrigger={setCreateSecretPopup}
            />
          )}

          {secrets && (
            <div className="secretFolderItem">
              {secrets.map((itemvalue) => {
                return (
                  <div className="eachFolder">
                    <span className="dropdownFolderItem">{">"}</span>
                    <img src={folderIcon} alt="folderIcon"></img>
                    <span className="newFolder"> {itemvalue}</span>
                  </div>
                );
              })}
            </div>
          )}
          {console.log(selectSafe, "selectsafein secret")}
          {/* {!selectSafe && (
            <div id="emptyDiv-2">
              <img src={locker} alt="O"></img>
            </div>
          )} */}
          {selectSafe?.SafeName && (
            <span className="addBtnSpan">
              <button
                onClick={() => setCreateSecretPopup(true)}
                className="addBtn"
              >
                ADD
              </button>
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default SecretSafes;
