import Container from "typedi";

import {
  CityRepository,
  LocationRepository,
} from "./services/location-service";



/** Containers */
export const setFunctionalServices = () => {
  Container.set("LocationRepository", LocationRepository);
  Container.set("CityRepository", CityRepository);

};
