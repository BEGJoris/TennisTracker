import { Component, OnInit } from '@angular/core';
import {Match} from "../models/match.model";
import {ActivatedRoute, Router} from "@angular/router";
import {MatchService} from "../services/match.service";
import {map, Observable, startWith, tap} from "rxjs";
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Geolocation} from "@capacitor/geolocation";

@Component({
  selector: 'app-match-edit',
  templateUrl: './match-edit.page.html',
  styleUrls: ['./match-edit.page.scss'],
})
export class MatchEditPage implements OnInit {
  match!: Match;
  loading = false;
  matchId!: string;
  public mainForm! :FormGroup
  public locationForm! : FormGroup
  public resultatForm!: FormGroup

  // Facultatifs cela dépend du nombre de sets et/ou si forfait
  public scoreForm1?:FormGroup
  public scoreForm2?:FormGroup
  public scoreForm3?:FormGroup
  public scoreForm4?:FormGroup
  public scoreForm5?:FormGroup

  public forfaitCtrl!: FormControl
  public setsCtrl!: FormControl
  public issueCtrl!: FormControl

  public showScoreForms$!:Observable<boolean>;
  public showFiveSetsForms$!:Observable<boolean>;
  public showSetsError$!:Observable<boolean>;
  public showScoreError$!:Observable<boolean>;

  constructor(private _matchService: MatchService,
    private _formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private _router:Router) {}

  ngOnInit(): void {
    this.initMainForm();
    this.initFormControls();
    this.initFormObservables();
    this.loadMatchData();
  }
  private initMainForm():void{
    this.mainForm = this._formBuilder.group({
      adversaire: ['', Validators.required],
      date: ['', Validators.required],
      surface: ['', Validators.required],
      aces: [0, [Validators.min(0), Validators.required]],
      doubleFautes: [0, [Validators.min(0), Validators.required]],
      pourcentagePremierService: [0, [Validators.min(0), Validators.max(100), Validators.required]],
      pointsGagnes: [0, [Validators.min(0), Validators.required]],
      location: this.locationForm,
      resultat: this.resultatForm,
    });

  }

  private initFormControls(): void {
    this.locationForm = this._formBuilder.group({
      latitude: [0, Validators.required],
      longitude: [0, Validators.required],
    });
    this.forfaitCtrl= this._formBuilder.control(false);
    this.setsCtrl= this._formBuilder.control(3,[Validators.required,Validators.pattern('[3|5]')]);
    this.issueCtrl= this._formBuilder.control("victoire", [Validators.required]);
    this.scoreForm1 = this._formBuilder.group({
      domicile: [0, [Validators.min(0),Validators.max(7),Validators.required]],
      visiteur: [0, [Validators.min(0),Validators.max(7),Validators.required]],
    });
    this.scoreForm2 = this._formBuilder.group({
      domicile: [0, [Validators.min(0),Validators.max(7),Validators.required]],
      visiteur: [0, [Validators.min(0),Validators.max(7),Validators.required]],
    });
    this.scoreForm3 = this._formBuilder.group({
      domicile: [0, [Validators.min(0),Validators.max(7),Validators.required]],
      visiteur: [0, [Validators.min(0),Validators.max(7),Validators.required]],
    });
    this.scoreForm4 = this._formBuilder.group({
      domicile: [0, [Validators.min(0),Validators.max(7),Validators.required]],
      visiteur: [0, [Validators.min(0),Validators.max(7),Validators.required]],
    });
    this.scoreForm5 = this._formBuilder.group({
      domicile: [0, [Validators.min(0),Validators.max(7),Validators.required]],
      visiteur: [0, [Validators.min(0),Validators.max(7),Validators.required]],
    });
    this.resultatForm = this._formBuilder.group({
      forfait: this.forfaitCtrl,
      nbSets: this.setsCtrl,
      issue:this.issueCtrl,
      score1stSet: this.scoreForm1,
      score2ndSet: this.scoreForm2,
      score3rdSet: this.scoreForm3,
      score4thSet: this.scoreForm4,
      score5thSet: this.scoreForm5
    });

  }
  private initFormObservables():void{
    this.showScoreForms$=this.forfaitCtrl.valueChanges.pipe(
      startWith(this.forfaitCtrl.value),
      map(forfait => !forfait)
    )
    this.showFiveSetsForms$= this.setsCtrl.valueChanges.pipe(
      startWith(this.setsCtrl.value),
      map(sets => sets===5),
    );
    this.showSetsError$=this.setsCtrl.valueChanges.pipe(
      map(status=>(status!==5 && status!==3)),
    );
  }
  private loadMatchData(): void {
    this.matchId = this.route.snapshot.paramMap.get('id')!;
    this._matchService.getMatchById(this.matchId).subscribe(matchData => {
      this.locationForm.patchValue(matchData.location);
      this.resultatForm.patchValue(matchData.resultat);
      this.mainForm.patchValue({
        ...matchData,
        location: matchData.location,
        resultat: matchData.resultat
      });
    });
  }

onUpdate() {
  const updatedMatch={
    ...this.mainForm.value,
    location: this.locationForm.value,
    resultat: this.resultatForm.value
  }

  this._matchService.updateMatch({...updatedMatch,id: this.matchId}).pipe(
    tap(() => {
      this.loading = true;
      setTimeout(() => {
        this.loading = false;
        this._router.navigateByUrl('/tabs/match-list');
      }, 3000);
    })
  ).subscribe()
}
  async getCurrentLocation(): Promise<void> {
    const coordinates = await Geolocation.getCurrentPosition();
    this.locationForm.patchValue({
      latitude: coordinates.coords.latitude,
      longitude: coordinates.coords.longitude
    });
  }

  getFormControlErrorText(ctrl:AbstractControl){
    if(ctrl.touched){
      if(ctrl.hasError('required')){
        return 'Ce champ est obligatoire';
      }
      else if(ctrl.hasError('min')){
        return 'Valeur trop petite';
      }
      else if(ctrl.hasError('max')){
        return 'Valeur trop grande';
      }
    }
    return ''
  }
}
