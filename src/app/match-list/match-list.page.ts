import { Component, OnInit } from '@angular/core';
import {BehaviorSubject, combineLatest, map, Observable, take} from 'rxjs';
import { animate, query, stagger, style, transition, trigger } from '@angular/animations';
import {MatchService} from "../services/match.service";
import {Match} from "../models/match.model";
import {ActivatedRoute} from "@angular/router";

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
  matchsDeletion$=new BehaviorSubject<Match[]>([])
  loading$!:Observable<boolean>

  constructor(private _matchService:MatchService,
              private route:ActivatedRoute) {}

  ngOnInit(): void {
    this.initObservables()
    this.matchs$=combineLatest([
      this.route.data.pipe(map(data => data['matchs'] || [])),
      this.matchsDeletion$
    ]).pipe(
      map(([resolvedMatchs, deletionMatch]) => {
        return deletionMatch.length > 0 ? deletionMatch : resolvedMatchs;
      })
    )
  }

  private initObservables() : void {
    this.loading$ = this._matchService.loading$

  }
  onDelete(id: string): void {
    this._matchService.deleteMatch(id);
    this.matchs$.pipe(
      take(1),
    ).subscribe(currentMatchs => {
      const updatedMatchs = currentMatchs.filter(match => match.id !== id);
      this.matchsDeletion$.next(updatedMatchs);
    });
  }

}
