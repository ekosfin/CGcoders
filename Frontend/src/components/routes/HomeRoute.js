import React from "react";
import { AdminDataProvider } from "../contexts/AdminDataContext";
import NavBar from "../navbar";
import Schedule from "../schedule";

export default function HomeRoute() {
  return (
    <>
      <AdminDataProvider>
        <NavBar />
        <Schedule />
      </AdminDataProvider>
    </>
  );
}
