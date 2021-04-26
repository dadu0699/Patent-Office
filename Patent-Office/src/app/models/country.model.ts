import { Region } from "./region.model";

export class Country {
  public countryID: number
  public name: string;
  public capital: string;
  public population: number;
  public area: number;
  public region: Region;

  constructor() { }
};
