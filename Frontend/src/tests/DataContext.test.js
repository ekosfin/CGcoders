import { renderHook, act } from "@testing-library/react-hooks"
import { useData, DataProvider } from "../components/contexts/DataContext";


const mockFetch = async () => {
  console.log("test");
  return true;
}

describe("data context works as intended", () => {
  const wrapper = ({ children }) => <DataProvider>{children}</DataProvider>

  beforeEach(() => {
    fetchMock.resetMocks();
  })

  //beforeAll(() => jest.spyOn(window, "fetch"));
  //beforeEach(() => window.fetch.mockImplementation(mockFetch));

  test("adding new data works", () => {
    const { result } = renderHook(() => useData(), { wrapper });
    expect(result.current.data).toEqual({});
    act(() => {
      result.current.setData({ test: "testValue" });
    });

    expect(result.current.data).toEqual({ test: "testValue" });
  });

  test("setting idNum works", () => {
    const { result } = renderHook(() => useData(), { wrapper });
    expect(result.current.idNum).toBe(0);
    act(() => {
      result.current.setIdNum(14);
    });

    expect(result.current.idNum).toBe(14);
  });

  test("clearing data and user rights work", () => {
    const { result } = renderHook(() => useData(), { wrapper });
    act(() => {
      result.current.setData({ test: "testValue" });
      result.current.clearData();
    });

    expect(result.current.data).toEqual({});
    expect(result.current.userRights).toBeNull();
  });

  test("getting & modifying data works", async () => {
    const { result } = renderHook(() => useData(), { wrapper });

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
                "driver": "Kuljettaja1",
                "destination": "Kaupunki2",
                "time": "12"
              },
              {
                "dayItem": "Kuljettaja2 Kaupunki2 9",
                "dayInfo": "",
                "twoWay": true,
                "color": "#FFFFFF",
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

    let dataResult;

    expect(result.current.userRights).toBeNull();

    await act(async () => {
      fetchMock.mockResponse(JSON.stringify(data));
      await result.current.setTokenObj({ id_token: "test" });
      dataResult = await result.current.getData();
      console.log(dataResult);
    });

    //expect(fetch.mock.calls.length).toEqual(1);
    expect(dataResult).toBeTruthy();
    expect(result.current.data.schedule[0].data[0][0].day).toBe("Maanantai");
    expect(result.current.data.schedule[0].data[0][0].material).toBe("Materiaali1");
    expect(result.current.data.schedule[0].data[0][0].idNum).toBe(0);
    expect(result.current.userRights).toBe("admin");
  });

  test("getData with email not in system", async () => {
    const { result } = renderHook(() => useData(), { wrapper });

    let data = {
      message: "Email not in system"
    }

    let dataResult;

    await act(async () => {
      fetchMock.mockResponse(JSON.stringify(data));
      await result.current.setTokenObj({ id_token: "test" });
      dataResult = await result.current.getData();
      console.log(dataResult);
    })

    expect(dataResult).toBeFalsy();
    expect(result.current.userRights).toBeNull();

  });

  test("getData with error in sheets", async () => {
    const { result } = renderHook(() => useData(), { wrapper });

    let data = {
      message: "Error in sheets"
    }

    let dataResult;

    await act(async () => {
      fetchMock.mockResponse(JSON.stringify(data));
      await result.current.setTokenObj({ id_token: "test" });
      dataResult = await result.current.getData();
      console.log(dataResult);
    })

    expect(dataResult).toBeFalsy();
    expect(result.current.userRights).toBeNull();

  });

  test("setting data loading", () => {
    const { result } = renderHook(() => useData(), { wrapper });

    expect(result.current.loadingData).toBeFalsy();
    act(() => {
      result.current.setLoadingData(true);
    });

    expect(result.current.loadingData).toBeTruthy();
    act(() => {
      result.current.setLoadingData(false);
    });

    expect(result.current.loadingData).toBeFalsy();
  });
});