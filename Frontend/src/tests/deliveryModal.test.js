import { render, screen } from "@testing-library/react";

import DeliveryModal from "../components/deliveryModal";
import { DataProvider } from "../components/contexts/DataContext";
import { AdminDataProvider } from "../components/contexts/AdminDataContext";

let dayData = {
  "dayItem": "Kuljettaja1 Kaupunki2 12",
  "dayInfo": "",
  "twoWay": true,
  "color": "#FFFFFF",
  "day": "Maanantai",
  "material": "Materiaali1",
  "idNum": 0,
  "driver": "Kuljettaja1",
  "destination": "Kaupunki2",
  "time": "12"
}
let deliveryModal = {
  open: true,
  data: dayData
}
const setAdminModalData = () => {}
const handleDeliveryModal = (openState, dayData) => {
  deliveryModal = {
    open: openState,
    data: dayData
  }
}

describe("delivery modal shows the right information", () => {
  beforeAll(() => {
    render(
      <DataProvider>
        <AdminDataProvider>
          <DeliveryModal deliveryModal={deliveryModal} handleDeliveryModal={handleDeliveryModal} setAdminModalData={setAdminModalData} />
        </AdminDataProvider>
      </DataProvider>
    );
  });

  test("delivery modal works with correct information", () => {
    screen.getByText("Kaupunki2");
    screen.getByText("Maanantai");
    screen.getByText(", kello 12");

    screen.getByText("Materiaali:")
    screen.getByText("Materiaali1")

    screen.getByText("Kuljettaja:")
    screen.getByText("Kuljettaja1")

    screen.getByText("Lisätieto:")
    screen.getByText("-")

    screen.getByText("Suunta:")
    screen.getByText("Meno-paluu")
  });
});