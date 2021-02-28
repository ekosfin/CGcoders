import React, { useContext, useState } from "react";

const DataContext = React.createContext();

export function useData() {
  return useContext(DataContext);
}

export function DataProvider({ children }) {
  //this is temp data
  const [data, setData] = useState([
    {
      materialName: "SRF",
      data: [
        [{ dayItem: "12A", dayInfo: "", color: "#85A311" }],
        [],
        [
          { dayItem: "15A", dayInfo: "Tämä on lisätietoa", color: "#CC4341" },
          { dayItem: "18A", dayInfo: "", color: "#85A311" },
        ],
        [],
        [{ dayItem: "13A", dayInfo: "", color: "#CC4341" }],
        [{ dayItem: "12A", dayInfo: "", color: "#85A311" }],
      ],
    },
    {
      materialName: "VL",
      data: [
        [],
        [],
        [],
        [],
        [],
        [],
      ],
    },
    {
      materialName: "Seka",
      data: [
        [{ dayItem: "12A", dayInfo: "Tämä on lisätietoa", color: "#85A311" }],
        [{ dayItem: "13A", dayInfo: "", color: "#85A311" }],
        [],
        [],
        [{ dayItem: "15A", dayInfo: "", color: "#CC4341" }],
        [{ dayItem: "18A", dayInfo: "", color: "#CC4341" }],
      ],
    },
    {
      materialName: "Metalli",
      data: [
        [],
        [],
        [{ dayItem: "12A", dayInfo: "Tämä on lisätietoa", color: "#85A311" }],
        [],
        [],
        [],
      ],
    },
    {
      materialName: "Pahvi",
      data: [
        [],
        [],
        [{ dayItem: "12A", dayInfo: "Tämä on lisätietoa", color: "#85A311" }],
        [],
        [
          { dayItem: "15A", dayInfo: "Tämä on lisätietoa", color: "#CC4341" },
          { dayItem: "18A", dayInfo: "", color: "#85A311" },],
        [],
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
