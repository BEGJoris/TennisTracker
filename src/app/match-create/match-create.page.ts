import { Component, OnInit } from '@angular/core';
import {MatchService} from "../services/match.service";
import {Match} from "../models/match.model";

@Component({
  selector: 'app-match-create',
  templateUrl: './match-create.page.html',
  styleUrls: ['./match-create.page.scss'],
})
export class MatchCreatePage implements OnInit{
  public match!:Match
  constructor(private _matchService: MatchService) {

  }

  ngOnInit(): void {
    this.match = new Match();
  }


  onCreate(): void {
    this._matchService.createMatch(this.match).subscribe(() => {
      this.match = new Match();
    });
  }
}
