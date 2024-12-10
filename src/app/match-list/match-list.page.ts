import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { animate, query, stagger, style, transition, trigger } from '@angular/animations';
import {MatchService} from "../services/match.service";
import {Match} from "../models/match.model";

@Component({
  selector: 'app-match-list',
  templateUrl: './match-list.page.html',
  styleUrls: ['./match-list.page.scss'],
  animations: [
    trigger('listAnimation', [
      transition('* <=> *', [
        query(':enter', [
          style({ opacity: 0, transform: 'translateY(-20px)' }),
          stagger(100, [
            animate('500ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
          ])
        ], { optional: true })
      ])
    ])
  ]
})
export class MatchListPage implements OnInit {

  matchs$!:Observable<Match[]>
  loading$!:Observable<boolean>

  constructor(private _matchService:MatchService) {}

  ngOnInit(): void {
    this.initObservables()
    this._matchService.getMatchsFromFirebase()
  }

  private initObservables() : void {
    this.loading$ = this._matchService.loading$
    this.matchs$ = this._matchService.matchs$

  }
  onDelete(id: string): void {
    this._matchService.deleteMatch(id)
  }

}
