import React, { useContext, useState } from "react";

const DataContext = React.createContext();

export function useData() {
  return useContext(DataContext);
}

export function DataProvider({ children }) {
  //this is temp data
  const [data, setData] = useState({});
  const [userRights, setUserRights] = useState(null);
  const [idNum, setIdNum] = useState(0);
  const [tokenObj, setTokenObj] = useState(null);
  const [loadingData, setLoadingData] = useState(false);
  //const [gettingData, setGettingData] = useState(false);
  //const [sendingData, setSendingData] = useState(false);
  const { REACT_APP_CLIENT_ID } = process.env;

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

            let dayItemList = deliveryItem.dayItem?.split(" ");
            if (dayItemList?.length > 2) {
              deliveryItem.driver = dayItemList[0];
              deliveryItem.destination = dayItemList[1];
              deliveryItem.time = dayItemList[2];
            }
            else {
              deliveryItem.driver = "-";
              deliveryItem.destination = "-";
              deliveryItem.time = "-";
            }
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
    //TODO this function is called when email is not on list
  }

  function handleEmailError() {
    //TODO this function is called when emails permissions is not regoniced by the sheets API
  }

  function handleAPIError() {
    //TODO this function is a catch all for error coming from API or gateway
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
    loadingData,
    setLoadingData,
    REACT_APP_CLIENT_ID,
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}
