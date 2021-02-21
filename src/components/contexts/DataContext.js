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

  async function getData() {
    //fecth jonka jälkeen set data
    return new Promise((resolve) => {
      resolve();
    });
  }

  async function login(password) {
    //fetch saada jwt
    return new Promise((resolve) => {
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
