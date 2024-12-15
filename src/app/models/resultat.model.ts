import {Score} from "./score.model";

export class Resultat{
  forfait!:boolean;
  nbSets!: number;
  issue!:string;
  score1stSet?:Score;
  score2ndSet?:Score;
  score3rdSet?:Score;
  score4thSet?:Score;
  score5thSet?:Score;
}
