import { Context, UserInputError } from "apollo-server-core";
import {
  Resolver,
  Query,
  Mutation,
  Arg,
  Ctx,
  FieldResolver,
  Root,
} from "type-graphql";
import { Service } from "typedi";
import { BaseEntity } from "typeorm";
import { dataSource } from "../../data-source";
import { CityEntity } from "../../entities";
import { CityService } from "../../services/city-services";
import { LocationService } from "../../services/location-service";
import { falsyToInvalidId, whereIdIs } from "../../shared/utils";

@Service()
@Resolver((resolverOf) => CityEntity)
export default class CityResolver {
  constructor(private readonly cityService: CityService) {}

  @Query(() => [CityEntity])
  async getAllCities(): Promise<CityEntity[]> {
    const cityResult = await this.cityService.findAll();
    console.log(cityResult);
    if (cityResult.isOk()) {
      return cityResult.value;
    }

    throw new Error("LocationResolver.getAllCities");
  }

  @Query(() => CityEntity)
  async getACity(@Arg("cityId") cityId: string) {
    const result = await this.cityService.findOne(cityId);
    console.log("GET A CITy")
    console.log(result)
    if (result.isOk()) {
      return result.value;
    }

    throw new Error("LocationResolver.createCity");
  }

  @Mutation(() => String)
  async deleteCity(@Arg("id") id: string): Promise<string> {
    const deleteResult = await this.cityService.delete(id);

    if (deleteResult.isOk()) {
      return deleteResult.value;
    }

    throw new Error("LocationResolver.deleteCity");
  }

  @Mutation(() => CityEntity)
  async createCity(
    @Arg("locationId") locationId: string,
    @Arg("cityName") cityName: string
  ) {
    const result = await this.cityService.create(cityName, locationId);

    if (result.isOk()) {
      return result.value;
    }

    throw new Error("LocationResolver.createCity");
  }
  @Mutation(() => CityEntity)
  async updateCity(
    @Arg("cityId") cityId: string,
    @Arg("cityName") cityName: string
  ) {
    const result = await this.cityService.update(cityId, cityName);

    if (result.isOk()) {
      return result.value;
    }

    throw new Error("LocationResolver.createCity");
  }
}
