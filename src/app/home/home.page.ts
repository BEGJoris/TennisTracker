import { Component, OnInit } from '@angular/core';
import {Match} from "../models/match.model";
import {MatchService} from "../services/match.service";
import {Observable, take} from "rxjs";

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
    this._matchService.getRecentMatches()
    this.recentMatches$ = this._matchService.matchs$;
    this.loading$ = this._matchService.loading$
  }

}
