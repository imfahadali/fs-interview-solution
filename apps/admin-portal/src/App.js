import { Admin, ListGuesser, Resource } from "react-admin";
import dataProvider from "./data-provider";
import { CountryCreate } from "./resources/country";

function App() {
  return (
    <div className="App">
      <Admin dataProvider={dataProvider}>
        <Resource name="country" list={ListGuesser} create={CountryCreate} />;
      </Admin>
    </div>
  );
}

export default App;
