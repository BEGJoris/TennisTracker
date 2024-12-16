import { Component, OnInit } from '@angular/core';
import {MatchService} from "../services/match.service";
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Geolocation} from '@capacitor/geolocation';
import {map, Observable, startWith, tap} from "rxjs";
import {Router} from "@angular/router";

@Component({
  selector: 'app-match-create',
  templateUrl: './match-create.page.html',
  styleUrls: ['./match-create.page.scss'],
})
export class MatchCreatePage implements OnInit{
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
              private router:Router) {
  }

  ngOnInit():void {
    this.initFormControls();
    this.initMainForm();
    this.initFormObservables()

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

  getFormControlErrorText(ctrl:AbstractControl){
    if(ctrl.touched && ctrl.invalid){
      if(ctrl.hasError('required')){
        return 'Ce champ est obligatoire';
      }
      else if(ctrl.hasError('min')){
        return 'Valeur trop petite';
      }
      else if(ctrl.hasError('max')){
        return 'Valeur trop grande';
      }
      else{
        return '';
      }
    }
    else{
      return '';
    }
  }

  async getCurrentLocation(): Promise<void> {
    const coordinates = await Geolocation.getCurrentPosition();
    this.locationForm.patchValue({
      latitude: coordinates.coords.latitude,
      longitude: coordinates.coords.longitude
    });
  }

  onSubmit(): void {
    if(this.mainForm.value.id) {
      this._matchService.updateMatch(this.mainForm.value)
    }
    else{
      this._matchService.createMatch(this.mainForm.value).subscribe()
    }
    this.router.navigateByUrl('/tabs/match-list');
  }
}
