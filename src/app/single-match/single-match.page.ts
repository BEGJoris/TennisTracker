import { Component, OnInit } from '@angular/core';
import {MatchService} from "../services/match.service";
import {Observable, switchMap} from "rxjs";
import {Match} from "../models/match.model";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-single-match',
  templateUrl: './single-match.page.html',
  styleUrls: ['./single-match.page.scss'],
})
export class SingleMatchPage implements OnInit {
  loading$!: Observable<boolean>;
  match$!: Observable<Match>;

  constructor(private _matchService: MatchService,
              private route:ActivatedRoute) { }

  ngOnInit() {
    this.initObservables()
  }

  private initObservables() {
    this.loading$ = this._matchService.loading$;
    this.match$ = this.route.params.pipe(
      switchMap(params => this._matchService.getMatchById(params['id'])),
    )
  }
}
