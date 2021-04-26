import { Survey } from "./survey.model";

export class Question {
  public questionID: number
  public utterance: string;
  public survey: Survey;

  constructor() { }
};
