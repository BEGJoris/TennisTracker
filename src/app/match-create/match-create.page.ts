import { Component, OnInit } from '@angular/core';
import {MatchService} from "../services/match.service";
import {Match} from "../models/match.model";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-match-create',
  templateUrl: './match-create.page.html',
  styleUrls: ['./match-create.page.scss'],
})
export class MatchCreatePage implements OnInit{
  public matchForm :FormGroup
  constructor(private _matchService: MatchService,
              private _formBuilder: FormBuilder) {
    this.matchForm = this._formBuilder.group({
      adversaire: ['', Validators.required],
      date: ['', Validators.required],
      surface: ['', Validators.required],
      score: ['', Validators.required],
      aces: [0, Validators.min(0)],
      doubleFautes: [0, Validators.min(0)],
      pourcentagePremierService: [0, [Validators.min(0), Validators.max(100)]],
      pointsGagnes: [0, Validators.min(0)]
    });
  }

  ngOnInit(): void {

  }

  onSubmit(): void {
    if(this.matchForm.value.id) {
      this._matchService.updateMatch(this.matchForm.value)
    }
    else{
      this._matchService.createMatch(this.matchForm.value).subscribe()
    }
  }
}
