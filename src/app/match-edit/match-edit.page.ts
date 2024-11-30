import { Component, OnInit } from '@angular/core';
import {Match} from "../models/match.model";
import {ActivatedRoute, Router} from "@angular/router";
import {MatchService} from "../services/match.service";

@Component({
  selector: 'app-match-edit',
  templateUrl: './match-edit.page.html',
  styleUrls: ['./match-edit.page.scss'],
})
export class MatchEditPage implements OnInit {
  match!: Match;
  change!: boolean;

constructor(private _matchService: MatchService,
  private route: ActivatedRoute,
  private _router:Router) {}

ngOnInit(): void {
  const id = this.route.snapshot.params['id'];
  this._matchService.getMatchById(id).subscribe((value: Match) => {
    this.match = value;
  });
}

onUpdate() {
  this._matchService.updateMatch(this.match).subscribe(() => {
    this.change = true
    setTimeout(() => {
      this.change = false
      this._router.navigateByUrl('/list')

    },3000)
  })
}
}
