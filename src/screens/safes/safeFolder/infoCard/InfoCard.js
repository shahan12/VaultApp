import react, { useState } from "react";
import iconSafe from "../../../../assests/images/icon_safes.png";
import "./infoCard.css";
import { useDispatch } from "react-redux";
import { deleteSafe } from "../../../../redux/actions/AllSafeSlice";
import deleteBtn from "../../../../assests/images/icon_delete_inactive.svg";
import editIcon from "../../../../assests/images/icon_edit_active.svg";
import EditSafePop from "../../../../modal/editSafePop";
import api from "../../../../api";

const InfoCard = ({ SafeName, Description, id, Owner, idd, reload, Type }) => {
  const dispatch = useDispatch();
  const [editSafePopup, setEditSafePopup] = useState(false);
  const handleDeleteClick = async (idd) => {
    //dispatch(deleteSafe({ SafeName: SafeName }));
    await api
      .delete(`/${idd}`)
      .then((res) => {
        console.log("delete res", res);
        console.log("delete res.data", res.data);
      }) //
      .catch((error) => {
        console.log(error.response);
      });
    reload();
  };

  return (
    <li className="infoCard-li">
      <div className="infoCard-item">
        <img src={iconSafe} alt="iconSafe" className="iconSafe"></img>
        <div className="infoCard-data">
          <div className="infoCard-SafeName">
            {SafeName}
            {/* <span className="infoCard-state">New</span> */}
          </div>
          <div className="infoCard-Description">
            {Description}
            {/* <span>&#183;</span>{" "} */}
            <span className="infoCard-Owner"> / {Owner} </span>
          </div>
        </div>
      </div>
      {editSafePopup && (
        <EditSafePop
          idd={idd}
          SafeName={SafeName}
          Description={Description}
          Owner={Owner}
          reload={reload}
          Type={Type}
          setTrigger={setEditSafePopup}
        />
      )}
      <img
        src={editIcon}
        alt="editIcom"
        className="editIcon"
        onClick={() => setEditSafePopup(true)}
      />
      <img
        src={deleteBtn}
        onClick={() => handleDeleteClick(idd)}
        className="deleteBtn"
      ></img>
    </li>
  );
};

export default InfoCard;
