import React, { useContext } from "react";

import { render } from "@testing-library/react";
import AdminModal from "./adminModal";

test("renders everything correctly", () => {

  /*Props data */
  let adminModalData = {
    material: "",
    day: "",
    driver: "",
    destination: "",
    time: "",
    direction: "",
    info: "",
    idNum: null
  };
  const selectData = [];

  const setAdminModalData = (data) => {
    adminModalData = data;
  }


  const { getByText } = render(
    <AdminModal selectData={selectData} adminModalData={adminModalData} setAdminModalData={setAdminModalData} />

  );

  //getByText("Materiaali");
});