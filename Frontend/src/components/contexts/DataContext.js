import React, { useContext, useState } from "react";

const DataContext = React.createContext();

export function useData() {
  return useContext(DataContext);
}

export function DataProvider({ children }) {
  //this is temp data
  const [data, setData] = useState([]);
  const [jwtToken, setJwt] = useState();
  const [userRights, setUserRights] = useState(null);

  function clearData() {
    setData([]);
    setJwt();
    setUserRights(null);
  }

  const modifyData = (data) => {
    let dayList = ["Maanantai", "Tiistai", "Keskiviikko", "Torstai", "Perjantai", "Lauantai", "Sunnuntai"];
    if (data.schedule !== undefined && data.schedule.length > 0) {
      data.schedule.forEach(material => {
        let dayNum = 0;
        material.data.forEach(dayItem => {
          dayItem.forEach(deliveryItem => {
            deliveryItem.day = dayList[dayNum];
            deliveryItem.material = material.materialName;
          });
          dayNum++; 
        });
      });
    }
    return data;
  }

  async function getData() {
    let data;
    try {
      let response = await fetch("/data", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ jwt: jwtToken }),
      });
      data = await response.json();
    }
    catch (error) {
      return false;
    }
    if (!data) {
      return false;
    }
    else {
      data = modifyData(data);
      setData(data);
      return true;
    }
  }

  async function login(password) {
    let response = await fetch("/jwt", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ pass: password }),
    });
    let data = await response.json();
    if (data.message === "Success!") {
      setJwt(data.JWT);
      return true;
    }
    else {
      return false;
    }
  }

  const value = {
    data,
    login,
    getData,
    clearData,
    userRights,
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}
