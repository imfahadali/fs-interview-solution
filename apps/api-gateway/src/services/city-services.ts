import { errAsync, okAsync, ResultAsync } from "neverthrow";
import { LocationEntity, CityEntity } from "../entities";

import { Service, Inject } from "typedi";
import { dataSource } from "../data-source";
import { falsyToInvalidId, whereIdIs } from "../shared/utils";
import { Location } from "graphql";

export const LocationRepository = dataSource
  .getRepository(LocationEntity)
  .extend({});

export const CityRepository = dataSource.getRepository(CityEntity).extend({});

@Service()
export class CityService {
  constructor(
    @Inject("LocationRepository")
    private locationRepository: typeof LocationRepository,
    @Inject("CityRepository")
    private cityRepository: typeof CityRepository
  ) {}

  private _relations = ["location"];

  private async _findById(id: string): Promise<CityEntity> {
    const city = await this.cityRepository.findOne({
      ...whereIdIs(id),
      relations: this._relations,
    });

    if (!city) {
      throw new Error("city not found");
    }

    return city;
  }

  public async delete(id: string): Promise<ResultAsync<string, null>> {
    try {
      const city = await this._findById(id);
      if (!city) {
        throw new Error("city not found");
      }
      await this.cityRepository.remove(city);
      return okAsync(id);
    } catch (error) {
      console.log("CityService.delete", error);
      return errAsync(null);
    }
  }
  public async create(
    cityName: string,
    locationId: string
  ): Promise<ResultAsync<CityEntity, null>> {
    const existingCity = await this.cityRepository.findOne({
      where: { name: cityName },
      relations: this._relations,
    });

    const existingLocation = await this.locationRepository.findOne({
      where: { id: locationId },
    });

    try {
      const city = existingCity ? existingCity : new CityEntity();
      city.name = cityName;
      city.location = existingLocation;

      const saved = await this.cityRepository.save(city);
      const refreshed = await this._findById(saved.id);
      return okAsync(refreshed);
    } catch (error) {
      console.log("CityService.create", error);
      return errAsync(null);
    }
  }

  public async update(
    id: string,
    cityName: string
  ): Promise<ResultAsync<CityEntity, null>> {
    try {
      const city = await this._findById(id);
      if (!city) {
        throw new Error("city not found");
      }
      city.name = cityName;

      const saved = await this.cityRepository.save(city);
      const refreshed = await this._findById(saved.id);
      return okAsync(refreshed);
    } catch (e) {
      console.log("CityService.update", e);
      return errAsync(null);
    }
  }

  public async findAll(): Promise<ResultAsync<CityEntity[], null>> {
    try {
      const city = await this.cityRepository.find({
        relations: this._relations,
      });
      // console.log({city})
      return okAsync(city);
    } catch (error) {
      console.log("CityService.findAll", error);
      return errAsync(null);
    }
  }
  public async findOne(cityId: string): Promise<ResultAsync<CityEntity, null>> {
    try {
      const city = await this.cityRepository.findOne({
        relations: this._relations,
        where: { id: cityId },
      });
      console.log("find ONE")
      console.log({city})
      return okAsync(city);
    } catch (error) {
      console.log("CityService.findAll", error);
      return errAsync(null);
    }
  }
}
