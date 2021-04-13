import { useEffect } from "react";

import { render, fireEvent, screen, act } from "@testing-library/react";
import Schedule from "../components/schedule";
import { DataProvider, useData } from "../components/contexts/DataContext";
import { AdminDataProvider } from "../components/contexts/AdminDataContext";
import DeliveryModal from "../components/deliveryModal";

const schedule = require("../components/schedule");

const SetMockData = () => {
    const { setData } = useData();

    useEffect(() => {
        setData(data);
    }, []);

    return null;
}
//jest.mock("../components/schedule", () => ({ getData: jest.fn() }));

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


/*describe("unit tests for schedule grid", () => {


    act(() => {
        render(
            <DataProvider>
                <AdminDataProvider>
                    <SetMockData />
                    <Schedule />
                </AdminDataProvider>
            </DataProvider>
        );
    });

    test("weekdays render correctly", () => {
        screen.getByText("TÄMÄ ON JOKU RANDOM VIESTI");
        screen.getByText("Tiistai");
        screen.getByText("Keskiviikko");
        screen.getByText("Torstai");
        screen.getByText("Perjantai");
        screen.getByText("Lauantai");
        screen.getByText("Sunnuntai");
    });

    test("materials render correctly", () => {
        act(() => {
            screen.getByText("Materiaali1");
            screen.getByText("Materiaali2");
        });
    });

    test("deliveries render correctly", () => {
        act(() => {
            screen.getAllByText("Ku K12");
            screen.getByText("Ku K9");
            screen.getByText("Ku K8");
        });
    });
});*/