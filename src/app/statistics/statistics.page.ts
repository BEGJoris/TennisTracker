import { Component, OnInit } from '@angular/core';
import {delay, map, Observable, timer, switchMap} from "rxjs";
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
    this.loading$=this._matchService.loading$
    this.stats = this._matchService.getStats().pipe(
    )
    this.derniersMatchs = this._matchService.matchs$.pipe(
      map((matchs: Match[]) => matchs.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())),
      map((matchs: Match[]) => matchs.slice(0, 3)),
    )
    timer(2000).pipe(
      switchMap(() => this._matchService.getMatchsFromFirebase())
    ).subscribe()
  }

}
