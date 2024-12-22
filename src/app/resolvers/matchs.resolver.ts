import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {Match} from "../models/match.model";
import {MatchService} from "../services/match.service";
import {Observable} from "rxjs";

@Injectable()
export class MatchsResolver implements Resolve<Match[]> {

  constructor(private _matchService:MatchService) {}

  resolve(): Observable<Match[]> {
    return this._matchService.getMatchsFromFirebase();
  }
}
