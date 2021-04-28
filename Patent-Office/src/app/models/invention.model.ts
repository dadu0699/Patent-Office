import { Country } from "./country.model";

export class Invention {
  public inventionID: number
  public name: string;
  public year: number;
  public country: Country;

  constructor() { }
};
