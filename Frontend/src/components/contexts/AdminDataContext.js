import React, { useContext, useState } from "react";
import { useData } from "./DataContext";

const DataContext = React.createContext();

export function useAdminData() {
  return useContext(DataContext);
}

export function AdminDataProvider({ children }) {
  const { userRights } = useData();
  const [adminModal, setAdminModal] = useState({
    open: false,
    mode: null
  });
  const [selectData, setSelectData] = useState([]);

  const handleAdminModal = (openState, mode) => {
    if (userRights === "admin") {
      setAdminModal({
        open: openState,
        mode: mode
      });
    }
  }

  const setAdminData = (data) => {
    let adminModalDataList = [], materialList = [];
    data.schedule.forEach(element => {
      materialList.push(element.materialName);
    });
    adminModalDataList.material = materialList;
    adminModalDataList.destination = data.destinations;
    adminModalDataList.driver = data.drivers;
    adminModalDataList.day = ["Maanantai", "Tiistai", "Keskiviikko", "Torstai", "Perjantai", "Lauantai", "Sunnuntai"];
    adminModalDataList.direction = ["Meno", "Meno-paluu"];
    setSelectData(adminModalDataList);
  }

  const value = {
    adminModal,
    handleAdminModal,
    setAdminData,
    selectData
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>
}

