import { Component, OnInit } from '@angular/core';
import {Match} from "../models/match.model";
import {MatchService} from "../services/match.service";
import {map, Observable} from "rxjs";

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  recentMatches$!: Observable<Match[]>
  loading$!:Observable<boolean>

  constructor(private _matchService: MatchService) {
  }

  ngOnInit() {
    this._matchService.getRecentMatches().subscribe()
    this.recentMatches$ = this._matchService.matchs$.pipe(
      map((matchs: Match[]) => matchs.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())),
      map((matchs: Match[]) => matchs.slice(0, 3)),
    )
    this.loading$ = this._matchService.loading$
  }

}
