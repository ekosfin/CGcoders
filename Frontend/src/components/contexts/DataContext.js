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
      data: [[], [], [], [], [], []],
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
          { dayItem: "18A", dayInfo: "", color: "#85A311" },
        ],
        [],
      ],
    },
  ]);
  const [jwtToken, setJwt] = useState();

  async function getData() {
    let response = await fetch("/data", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ jwt: jwtToken }),
    });
    let data = await response.json();
    if (data === "Failure") {
      console.log("it failed");
    } else {
      setData(data);
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
    } else {
      return false;
    }
  }

  const value = {
    data,
    login,
    getData,
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}
