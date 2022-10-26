import {
  Admin,
  Create,
  SimpleForm,
  TextInput,
  ListGuesser,
  Resource,
  required,
  ReferenceInput,
  SelectInput,
  useChoicesContext,
} from "react-admin";
import { url } from "../constants";
import { request, gql } from "graphql-request";

/**
 * Mappings
 */
export const cityMappings = {
  delete: async (params) => {
    const { id } = params;

    const query = gql`
      mutation DeleteCity($deleteCityId: String!) {
        deleteCity(id: $deleteCityId)
      }
    `;

    const result = await request(url, query, {
      deleteCityId: id,
    });

    return { data: result.deleteCity };
  },

  create: async (params) => {
    const {
      data: { id, name },
    } = params;
    console.log("CREATE OF CITY");
    console.log({ params });
    const query = gql`
      mutation CreateCity($cityName: String!, $locationId: String!) {
        createCity(cityName: $cityName, locationId: $locationId) {
          id
          location {
            countryName
          }
          name
        }
      }
    `;

    const result = await request(url, query, {
      cityName: name,
      locationId: id,
    });
    return { data: result.createCity };
  },
  update: async (params) => {
    const {
      data: { id, name },
    } = params;
    console.log("Update");
    console.log({ params });
    console.log(id);
    console.log(name);
    const query = gql`
      mutation UpdateCity($cityId: String!, $cityName: String!) {
        updateCity(cityId: $cityId, cityName: $cityName) {
          id
          location {
            countryName
            id
          }
          name
        }
      }
    `;

    const result = await request(url, query, {
      cityId: id,
      cityName: name,
    });
    return { data: result.updateCity };
  },
  getList: async (params) => {
    console.log("getList");
    const cities = await request(
      url,
      gql`
        query GetAllCities {
          getAllCities {
            name
            id
          }
        }
      `
    );
    console.log({ cities });
    return {
      data: cities.getAllCities,
      total: cities.getAllCities.length,
    };
  },
  getACity: async (params) => {
    console.log("getACity");
    console.log({ params });
    const city = await request(
      url,
      gql`
        query GetACity($cityId: String!) {
          getACity(cityId: $cityId) {
            name
            id
          }
        }
      `,
      { cityId: params.id }
    );
    console.log({ city });
    return {
      data: city.getACity,
      total: city.getACity.length,
    };
  },
};

/**
 * Create
 */

export const CityCreate = () => {

  return (
    <Create>
      <SimpleForm>
        <ReferenceInput source="id" reference="country" label="country">
          <SelectInput optionText="countryName" label="country" />
        </ReferenceInput>
        <TextInput source="name" validate={[required()]} fullWidth />
      </SimpleForm>
    </Create>
  );
};
