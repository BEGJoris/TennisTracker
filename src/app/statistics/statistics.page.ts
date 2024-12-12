import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs";
import {Match} from "../models/match.model";
import {MatchService} from "../services/match.service";

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.page.html',
  styleUrls: ['./statistics.page.scss'],
})
export class StatisticsPage implements OnInit {
  totalMatchs = 15;
  victoirePourcentage = 66.7;
  totalAces = 45;
  totalDoubleFautes = 12;
  pourcentagePremierService = 73;
  pointsGagnes = 68;
  derniersMatchs!:Observable<Match[]>
  constructor(private _matchService: MatchService) { }

  ngOnInit() {
    this._matchService.getRecentMatches()
    this.derniersMatchs = this._matchService.matchs$
  }

}
