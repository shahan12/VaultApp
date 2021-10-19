import React, { useState, useRef, useEffect } from "react";
import "./AllSafes.css";
import CreateSafe from "../../../../modal/CreateSafe";
import downBtn from "../../../../assests/images/icon_arrow_white.svg";
import searchIcon from "../../../../assests/images/icon_search.svg";
import assetsIcon from "../../../../assests/images/g1.svg";
import InfoCard from "../infoCard/InfoCard";
import { useSelector } from "react-redux";
import api from "../../../../api";

const AllSafes = ({ setSelectSafe }) => {
  const [CreateSafePopup, setCreateSafePopup] = useState(false);
  const allSafes = useSelector((state) => state.allSafe);
  const [searchTerm, setSearchTerm] = useState("");
  const inputRef = useRef("");
  const [isActive, setActive] = useState("false");
  const [newSafeList, setNewSafeList] = useState([]);
  const [clickedActiveId, setClickedActiveId] = useState("");
  const [data, setData] = useState([]);
  const [refresh, setRefresh] = useState(0);
  const pagereload = () => {
    setRefresh(refresh + 1);
    console.log("refrsh", refresh);
  };
  useEffect(() => {
    api.get(``).then((res) => {
      const result = res.data;
      console.log("reso/t", res);
      setData(result);
    });
  }, [refresh]);
  const AddFolder = (data) => {
    setSelectSafe(data);
    setClickedActiveId(data._id);
  };
  //
  const filteredAllSafes = () => {
    const searchText = inputRef?.current.value;
    setSearchTerm(searchText);
    if (searchText !== "") {
      const newAllSafes = data.filter((result) => {
        return result.SafeName.toLowerCase().includes(searchText.toLowerCase());
      });
      setNewSafeList(newAllSafes);
    } else {
      return allSafes;
    }
  };

  return (
    <div className="allSafes">
      <div className="topSection">
        <div className="topSectionLeft">
          <span className="safesCount">All Safes ({data.length})</span>
          <img className="downBtnClass" src={downBtn}></img>
        </div>
        <div className="topSectionRight">
          <img src={searchIcon} className="searchIcon"></img>
          <input
            ref={inputRef}
            type="text"
            id="searchBar"
            placeholder="Search"
            value={searchTerm}
            onChange={filteredAllSafes}
          ></input>
        </div>
      </div>
      {CreateSafePopup && (
        <CreateSafe pagereload={pagereload} setTrigger={setCreateSafePopup} />
      )}

      {/* display when size is 0  */}
      {/* redux ---- */}
      {data.length < 1 && (
        <div
          className="emptyDiv"
          style={{
            backgroundImage: "url(" + assetsIcon + ")",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
          }}
        >
          {/* <img src={assetsIcon} id="assestImg"></img> */}
          <button onClick={() => setCreateSafePopup(true)} id="createNewBtn">
            +<span className="onHoverShowText">Create New Safe</span>
          </button>
        </div>
      )}

      {/* display after entring values */}
      {/* redux -------- */}
      <div className="allSafe-wrapper">
        <div className="items-btn-wrap">
          {/*  Search not exists*/}
          {!searchTerm &&
            data.map((result) => {
              return (
                <div className="items-wrap">
                  <div key={result.Owner} className="items">
                    <ul
                      id="infoCard-ul"
                      className={
                        clickedActiveId == result._id ? "active" : null
                      }
                      onClick={() => {
                        AddFolder(result);
                        console.log("result id ", result._id);
                      }}
                    >
                      <InfoCard
                        SafeName={result.SafeName}
                        Owner={result.Owner}
                        Description={result.Description}
                        id={result.id}
                        enable={result.enable}
                        idd={result._id}
                        reload={pagereload}
                        Type={result.Type}
                      />
                    </ul>
                  </div>
                </div>
              );
            })}

          {/* Search exits */}
          {searchTerm &&
            newSafeList &&
            data.map((result) => {
              return (
                <div className="items-wrap">
                  <div key={result.Owner} className="items">
                    <ul
                      id="infoCard-ul"
                      className={
                        clickedActiveId == result._id ? "active" : null
                      }
                      onClick={() => AddFolder(result.id)}
                    >
                      <InfoCard
                        SafeName={result.SafeName}
                        Owner={result.Owner}
                        Description={result.Description}
                        id={result.id}
                        enable={result.enable}
                        idd={result._id}
                      />
                    </ul>
                  </div>
                </div>
              );
            })}

          {/* display No search found */}
          {searchTerm && newSafeList.length === 0 && (
            <div className="items-wrap">
              <div className="items">
                <ul id="notFound">
                  <span className="notFound">No Result Found!!</span>
                </ul>
              </div>
            </div>
          )}
        </div>
        {allSafes.SafeName !== "" && (
          <button onClick={() => setCreateSafePopup(true)} id="createNewBtn-2">
            +<span className="onHoverShowText-2">Create New Safe</span>
          </button>
        )}
      </div>
    </div>
  );
};
export default AllSafes;
