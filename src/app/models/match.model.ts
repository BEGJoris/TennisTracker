import {Localisation} from "./localisation.model";
import {Resultat} from "./resultat.model";

export class Match{
  id!:string;
  adversaire!:string;
  date!:string;
  resultat!:Resultat;
  surface!:string;
  aces!:number;
  doubleFautes!:number;
  pourcentagePremierService!:number;
  pointsGagnes!:number;
  location!:Localisation;
}
