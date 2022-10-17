import { Falsy } from "../types";


export const falsyToInvalidId = (value: Falsy<string>): string =>
  typeof value === "string" && value.length > 0 ? value : "-1";

export const whereIdIs = (id: Falsy<string>) => ({
  where: {
    id: falsyToInvalidId(id),
  },
});
