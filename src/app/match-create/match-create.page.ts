import { Component, OnInit } from '@angular/core';
import {MatchService} from "../services/match.service";
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Geolocation} from '@capacitor/geolocation';
import {map, Observable, startWith, tap, combineLatest} from "rxjs";
import {Router} from "@angular/router";

@Component({
  selector: 'app-match-create',
  templateUrl: './match-create.page.html',
  styleUrls: ['./match-create.page.scss'],
})
export class MatchCreatePage implements OnInit{
  loading=false;
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
    this.setsCtrl= this._formBuilder.control(null,[Validators.required,Validators.pattern('[3|5]')]);
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
  private initFormObservables(): void {
    // Observable pour afficher les champs de score uniquement si "forfait" est décoché
    this.showScoreForms$ = this.forfaitCtrl.valueChanges.pipe(
      startWith(this.forfaitCtrl.value),
      map(forfait => !forfait),
    );

    // Observable pour afficher les champs pour les 5 sets uniquement si "setsCtrl" est 5 et "forfaitCtrl" est décoché
    let lastValidSetsValue = this.setsCtrl.value; // Stocker la dernière valeur valide de setsCtrl

    this.showFiveSetsForms$ = combineLatest([
      this.setsCtrl.valueChanges.pipe(
        startWith(this.setsCtrl.value),
        tap(sets => {
          if (sets === 3 || sets === 5) {
            lastValidSetsValue = sets;
          }
        }),
        map(sets => sets || lastValidSetsValue) // Utiliser la dernière valeur valide si sets est null
      ),
      this.forfaitCtrl.valueChanges.pipe(
        startWith(this.forfaitCtrl.value),
      )
    ]).pipe(
      map(([sets, forfait]) => sets === 5 && !forfait),
    );

    // Observable pour afficher une erreur si la valeur de "setsCtrl" est invalide
    this.showSetsError$ = this.setsCtrl.valueChanges.pipe(
      map(sets => sets !== 5 && sets !== 3),
    );
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

  async getCurrentLocation(): Promise<void> {
    const coordinates = await Geolocation.getCurrentPosition();
    this.locationForm.patchValue({
      latitude: coordinates.coords.latitude,
      longitude: coordinates.coords.longitude
    });
  }

  onSubmit(): void {
    this.loading=true;
    this._matchService.createMatch(this.mainForm.value).pipe(
      tap(saved => {
        this.loading=false
        if(saved){
          this.resetForm();
          this.router.navigateByUrl('/tabs/match-list');
        }
        else{
          console.error("Echec de l'enregistrement")
        }
      })
    ).subscribe()
  }
  resetForm(){
    this.mainForm.reset()
    this.locationForm.reset()
    this.resultatForm.reset()

      // Remettre les valeurs par défaut pour les contrôles spécifiques
    this.issueCtrl.setValue('victoire');
    this.setsCtrl.setValue(3);
    this.forfaitCtrl.setValue(false);

      // Réinitialiser les sous-formulaires de scores
      this.scoreForm1?.reset({ domicile: 0, visiteur: 0 });
      this.scoreForm2?.reset({ domicile: 0, visiteur: 0 });
      this.scoreForm3?.reset({ domicile: 0, visiteur: 0 });
      this.scoreForm4?.reset({ domicile: 0, visiteur: 0 });
      this.scoreForm5?.reset({ domicile: 0, visiteur: 0 });

      this.locationForm.patchValue({ latitude: 0, longitude: 0 });

      // Marquer le formulaire comme vierge
      this.mainForm.markAsPristine();
      this.mainForm.markAsUntouched();
      this.mainForm.updateValueAndValidity();
    }
}
