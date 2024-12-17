import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs";
import {Match} from "../models/match.model";
import {MatchService} from "../services/match.service";
import {Statistics} from "../models/statistics.model";

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.page.html',
  styleUrls: ['./statistics.page.scss'],
})
export class StatisticsPage implements OnInit {
  loading$!:Observable<boolean>
  stats!:Observable<Statistics>
  derniersMatchs!:Observable<Match[]>
  constructor(private _matchService: MatchService) { }

  ngOnInit() {
    this.stats = this._matchService.getStats()
    this._matchService.getRecentMatches()
    this.derniersMatchs = this._matchService.matchs$
    this.loading$=this._matchService.loading$
  }

}
