import React, { useEffect } from "react";

import { render, fireEvent, screen } from "@testing-library/react";
import AdminModal from "../components/adminModal";
import { DataProvider, useData } from "../components/contexts/DataContext";
import { AdminDataProvider, useAdminData } from "../components/contexts/AdminDataContext";



const SetMockData = (props) => {
  const { setData } = useData();
  const { handleAdminModal } = useAdminData();

  useEffect(() => {
    setData(data);
    handleAdminModal(props.open, props.mode);
  }, []);

  return null;
}

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

const setAdminModalData = (data) => {
  adminModalData = data;
}

const selectData = {
  "material": [
    "Materiaali1",
    "Materiaali2",
  ],
  "destination": [
    "Kaupunki1",
    "Kaupunki2"
  ],
  "driver": [
    "Kuljettaja1",
    "Kuljettaja2"
  ],
  "day": [
    "Maanantai",
    "Tiistai",
    "Keskiviikko"
  ],
  "direction": [
    "Meno",
    "Meno-paluu"
  ]
};

/*DataContext data*/
let data = {
  "permissions": "edit",
  "schedule": [
    {
      "materialName": "Materiaali1",
      "data": [
        [
          {
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
          },
          {
            "dayItem": "Kuljettaja2 Kaupunki2 9",
            "dayInfo": "",
            "twoWay": true,
            "color": "#FFFFFF",
            "day": "Maanantai",
            "material": "Materiaali1",
            "idNum": 1,
            "driver": "Kuljettaja1",
            "destination": "Kaupunki2",
            "time": "12"
          }
        ],
        [],
        [],
        [],
        [],
        [],
        []
      ]
    },
    {
      "materialName": "Materiaali2",
      "data": [
        [],
        [
          {
            "dayItem": "Kuljettaja2 Kaupunki1 8",
            "dayInfo": "",
            "twoWay": false,
            "color": "#FFFFFF",
            "day": "Tiistai",
            "material": "Materiaali2",
            "idNum": 2,
            "driver": "Kuljettaja2",
            "destination": "Kaupunki1",
            "time": "8"
          }
        ],
        [],
        [],
        [],
        [],
        []
      ]
    }
  ],
  "drivers": [
    {
      "driver": "Kuljettaja1",
      "color": "#FFFFFF"
    },
    {
      "driver": "Kuljettaja2",
      "color": "#FFFFFF"
    }
  ],
  "destinations": [
    "Kaupunki1",
    "Kaupunki2"
  ]
}

describe("renders everything correctly in new mode", () => {
  beforeEach(() => {
    render(
      <DataProvider>
        <AdminDataProvider>
          <SetMockData open={true} mode={"new"} />
          <AdminModal selectData={selectData} adminModalData={adminModalData} setAdminModalData={setAdminModalData} />
        </AdminDataProvider>
      </DataProvider>
    );
  })

  test("page has all the required fields", () => {
    screen.getByText("Uuden toimituksen luominen");
    screen.getByLabelText("Materiaali");
    screen.getByLabelText("Viikonpäivä");
    screen.getByLabelText("Kuljettaja");
    screen.getByLabelText("Kohde");
    screen.getByLabelText("Kellonaika");
    screen.getByLabelText("Suunta");
    screen.getByLabelText("Lisätieto");
    screen.getByText("Lisää toimitus");
  });
});

describe("renders everything correctly in edit mode", () => {
  beforeEach(() => {
    render(
      <DataProvider>
        <AdminDataProvider>
          <SetMockData open={true} mode={"edit"} />
          <AdminModal selectData={selectData} adminModalData={adminModalData} setAdminModalData={setAdminModalData} />
        </AdminDataProvider>
      </DataProvider>
    );
  })

  test("page has all the required fields", () => {
    screen.getByText("Toimituksen muokkaaminen");
    screen.getByLabelText("Materiaali");
    screen.getByLabelText("Viikonpäivä");
    screen.getByLabelText("Kuljettaja");
    screen.getByLabelText("Kohde");
    screen.getByLabelText("Kellonaika");
    screen.getByLabelText("Suunta");
    screen.getByLabelText("Lisätieto");
    screen.getByText("Tallenna muutokset");
  });
});

describe("renders everything correctly in remove mode", () => {
  beforeEach(() => {
    render(
      <DataProvider>
        <AdminDataProvider>
          <SetMockData open={true} mode={"remove"} />
          <AdminModal selectData={selectData} adminModalData={adminModalData} setAdminModalData={setAdminModalData} />
        </AdminDataProvider>
      </DataProvider>
    );
  })

  test("page has all the required fields", () => {
    screen.getByText("Haluatko varmasti poistaa seuraavan toimituksen?");
    screen.getByText("Kyllä");
    screen.getByText("Peruuta");
  });
});

describe("renders everything correctly in remove mode", () => {
  beforeEach(() => {
    render(
      <DataProvider>
        <AdminDataProvider>
          <SetMockData open={true} mode={"new"} />
          <AdminModal selectData={selectData} adminModalData={adminModalData} setAdminModalData={setAdminModalData} />
        </AdminDataProvider>
      </DataProvider>
    );
  })

  test("selection works", () => {
    let materialInput = screen.getByLabelText("Materiaali");
    screen.getByText("Materiaali2");
    fireEvent.change(materialInput, { target: { value: "Materiaali1" } });



    //expect(getByLabelText("Materiaali")).toBe("Materiaali1");
    //console.log(screen.getByLabelText("Materiaali"));
    screen.getByLabelText("Viikonpäivä");
    screen.getByLabelText("Kuljettaja");
    screen.getByLabelText("Kohde");
    screen.getByLabelText("Kellonaika");
    screen.getByLabelText("Suunta");
    screen.getByLabelText("Lisätieto");
  });
});

/*describe("delivery list functions work", () => {
  let dataList;

  beforeEach(() => {
    dataList = JSON.parse(JSON.stringify(data));
    render(
      <DataProvider>
        <AdminDataProvider>
          <AdminModal
            selectData={selectData}
            adminModalData={{
            material: "Materiaali1",
            day: "Keskiviikko",
            driver: "Kuljettaja1",
            destination: "Kaupunki2",
            time: "12",
            direction: "Meno-paluu",
            info: "Lisätietoa",
            idNum: null
          }}
          setAdminModalData={setAdminModalData}/>

        </AdminDataProvider>
      </DataProvider>
    )
  });

  test("adding a new delivery function works", () => {
    let result;
    result = addDelivery(dataList, 0);
    expect(result).toBe({
      materialName: "Materiaali1",
      day: "Keskiviikko",
      data: {
        color: "#FFFFFF",
        day: "Keskiviikko",
        dayInfo: "Lisätietoa",
        dayItem: "Kuljettaja1 Kaupunki2 12",
        driver: "Kuljettaja1",
        destination: "Kaupunki2",
        time: "12",
        idNum: 4,
        material: "Materiaali1",
        twoWay: true,
      }
    })
  })
});*/