import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";

const DataContext = React.createContext();

export function useData() {
  return useContext(DataContext);
}

export function DataProvider({ children }) {
  const [data, setData] = useState({});
  const [userRights, setUserRights] = useState(null);
  const [idNum, setIdNum] = useState(0);
  const [tokenObj, setTokenObj] = useState(null);
  const [dataContextLoading, setDataContextLoading] = useState(false);
  const { REACT_APP_CLIENT_ID } = process.env;
  const history = useHistory();

  function clearData() {
    setData({});
    setUserRights(null);
  }

  const modifyData = (data) => {
    let dayList = [
      "Maanantai",
      "Tiistai",
      "Keskiviikko",
      "Torstai",
      "Perjantai",
      "Lauantai",
      "Sunnuntai",
    ];
    if (data.schedule !== undefined && data.schedule.length > 0) {
      let idNum = 0;
      data.schedule = data.schedule.map((material) => {
        let dayNum = 0;
        material.data = material.data.map((dayItem) => {
          dayItem = dayItem.map((deliveryItem) => {
            deliveryItem.day = dayList[dayNum];
            deliveryItem.material = material.materialName;
            deliveryItem.idNum = idNum;
            idNum++;
            return deliveryItem;
          });
          dayNum++;
          return dayItem;
        });
        return material;
      });
      setIdNum(idNum);
    }
    return data;
  };

  const getPermissions = (data) => {
    if (data.permissions === "edit") {
      setUserRights("admin");
    } else {
      setUserRights(null);
    }
    return true;
  };

  function handleEmailReject() {
    history.push("/");
  }

  function handleEmailError() {
    history.push("/");
  }

  async function getData() {
    let data;
    try {
      let response = await fetch("/data", {
        method: "POST",
        headers: {
          Authorization: tokenObj.id_token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({}),
      });
      data = await response.json();
    } catch (error) {
      return false;
    }
    if (!data) {
      return false;
    } else {
      if (data.message === "Email not in system") {
        handleEmailReject();
        return false;
      } else if (data.message === "Error in sheets") {
        handleEmailError();
        return false;
      }
      getPermissions(data);
      data = modifyData(data);
      if (data.message === "Authorization failed") {
        setTokenObj(null);
        history.push("/");
        return false;
      }
      setData(data);
      return true;
    }
  }

  async function sendEdits(edits) {
    let data;
    try {
      let response = await fetch("/edit", {
        method: "POST",
        headers: {
          Authorization: tokenObj.id_token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          edits: edits,
        }),
      });
      data = await response.json();
    } catch (error) {
      return false;
    }
    if (!data) {
      return false;
    } else {
      return true;
    }
  }

  const value = {
    data,
    setData,
    getData,
    clearData,
    userRights,
    idNum,
    setIdNum,
    sendEdits,
    tokenObj,
    setTokenObj,
    dataContextLoading,
    setDataContextLoading,
    REACT_APP_CLIENT_ID,
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}
