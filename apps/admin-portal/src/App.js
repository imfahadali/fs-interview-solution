import { Admin, EditGuesser, ListGuesser, Resource } from "react-admin";
import dataProvider from "./data-provider";
import { CountryCreate } from "./resources/country";
import {CityCreate} from "./resources/city"
import {CityList} from './components/Lists'

function App() {
  return (
    <div className="App">
      <Admin dataProvider={dataProvider}>
        <Resource name="country" list={ListGuesser} create={CountryCreate} />;
        <Resource name="city" list={CityList} create={CityCreate} edit={EditGuesser}/>;
      </Admin>
    </div>
  );
}

export default App;
