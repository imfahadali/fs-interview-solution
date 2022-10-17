import { errAsync, okAsync, ResultAsync } from "neverthrow";
import { FindOneOptions, ObjectLiteral, Repository } from "typeorm";
import { whereIdIs } from "../shared/utils";

export interface BaseServiceInterface {
  findOneById(id: string): Promise<ResultAsync<any, any>>;
  findAll(): Promise<ResultAsync<any, any>>;
  create(...args: any[]): Promise<ResultAsync<any, any>>;
  delete(id: string): Promise<ResultAsync<any, any>>;
}

export class BaseCRUD<EntityType extends ObjectLiteral> {
  private _repository: Repository<EntityType>;
  private _relations: string[] = [];
  private _serviceName: string;

  constructor(
    serviceName: string,
    repository: Repository<EntityType>,
    relations: string[] = []
  ) {
    this._repository = repository;
    this._relations = relations;
    this._serviceName = serviceName;
  }

  private async _findById(id: string) {
    const params = {
      ...whereIdIs(id),
      relations: this._relations,
    } as FindOneOptions;

    return await this._repository.findOne(params);
  }

  async delete(id: string): Promise<ResultAsync<string, any>> {
    try {
      const item = await this._findById(id);

      if (!item) {
        throw new Error("Item not found");
      }

      const deleted = await this._repository.remove(item);
      if (!deleted) {
        throw new Error("Item not deleted");
      }

      return okAsync(id);
    } catch (error) {
      console.log(`${this._serviceName}.delete`, error);
      return errAsync(null);
    }
  }
}
