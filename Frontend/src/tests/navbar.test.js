import { render } from "@testing-library/react";
import NavBar from "../components/navbar";
import { DataProvider } from "../components/contexts/DataContext";
import { AdminDataProvider } from "../components/contexts/AdminDataContext";

test("renders navbar correctly", () => {
  const { getByText, getByAltText } = render(
    <DataProvider>
      <AdminDataProvider>
        <NavBar />
      </AdminDataProvider>
    </DataProvider>
  )

  getByText("Kirjaudu ulos");
  getByAltText("remeo-logo");
});
