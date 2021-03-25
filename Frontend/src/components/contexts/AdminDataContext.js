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

  const handleAdminModal = (openState, mode) => {
    if (userRights === "admin") {
      setAdminModal({
        open: openState,
        mode: mode
      });
    }
  }

  const value = {
    adminModal,
    handleAdminModal
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>
}

