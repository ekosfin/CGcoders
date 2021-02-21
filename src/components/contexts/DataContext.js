import React, { useContext, useState } from "react";

const DataContext = React.createContext();

export function useData() {
  return useContext(DataContext);
}

export function DataProvider({ children }) {
  //this is temp data
  const [data, setData] = useState([
    {
      materialName: "Metalli",
      data: [
        [],
        [{ dayItem: "A12", dayInfo: "" }],
        [
          { dayItem: "A12", dayInfo: "Tämä on lisätietoa" },
          { dayItem: "A12", dayInfo: "" },
        ],
        [],
        [{ dayItem: "A12", dayInfo: "Tämä on lisätietoa" }],
        [{ dayItem: "A12", dayInfo: "Tämä on lisätietoa" }],
      ],
    },
    {
      materialName: "Lasi",
      data: [
        [{ dayItem: "A12", dayInfo: "" }],
        [],
        [{ dayItem: "A12", dayInfo: "" }],
        [],
        [{ dayItem: "A12", dayInfo: "" }],
        [],
      ],
    },
    {
      materialName: "Pahvi",
      data: [
        [{ dayItem: "A12", dayInfo: "Tämä on lisätietoa" }],
        [{ dayItem: "A12", dayInfo: "" }],
        [],
        [],
        [{ dayItem: "A12", dayInfo: "" }],
        [{ dayItem: "A12", dayInfo: "Tämä on lisätietoa" }],
      ],
    },
  ]);
  const [jwt, setJwt] = useState();

  const URL = process.env.REACT_APP_GOOGLE_URL;

  async function getData() {
    //fecth jonka jälkeen set data
    return new Promise((resolve, reject) => {
      resolve();
    });
  }

  async function login(password) {
    //fetch saada jwt
    //problems with cors
    return new Promise(async (resolve, reject) => {
      const response = await fetch(URL + "?route=login", {
        method: "POST",
        mode: "cors",
        redirect: "follow",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ watch: password }), // body data type must match "Content-Type" header
      });
      console.log(response);
      resolve();
    });
  }

  const value = {
    data,
    login,
    getData,
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}
