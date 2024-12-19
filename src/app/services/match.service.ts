import { Injectable } from '@angular/core';
import {Match} from "../models/match.model";
import {AngularFirestore, AngularFirestoreCollection} from "@angular/fire/compat/firestore";
import {BehaviorSubject, catchError, delay, first, map, Observable, of, take, takeLast, tap} from "rxjs";
import {Statistics} from "../models/statistics.model";

@Injectable({
  providedIn: 'root'
})
export class MatchService {
  private dbPath = '/matchs';
  matchsRef:AngularFirestoreCollection<Match>;

  constructor(private _firestore: AngularFirestore) {

    this.matchsRef = this._firestore.collection<Match>(this.dbPath);
  }


  private _loading$=new BehaviorSubject<boolean>(false);
  get loading$(): Observable<boolean> {
    return this._loading$.asObservable();
  }

  private _matchs$=new BehaviorSubject<Match[]>([]);
  get matchs$(): Observable<Match[]> {
    return this._matchs$.asObservable();
  }


  private setLoadingStatus(loading: boolean) {
    this._loading$.next(loading);
  }

  getRecentMatches(){
    this.setLoadingStatus(true);
    this.matchsRef.snapshotChanges().pipe(
      first(),
      map((changes: any) => {
        return changes.map((doc: any) => {
          return ({id: doc.payload.doc.id, ...doc.payload.doc.data()}) as Match
        });
      }),
      delay(2000),
      map((matchs: Match[]) => matchs.slice(0, 3)),
      tap((matchs: Match[]) =>{
        this._matchs$.next(matchs)
        this.setLoadingStatus(false);
      }),
    ).subscribe()
  }

  getMatchsFromFirebase():Observable<Match[]> {
    this.setLoadingStatus(true);
    return this.matchsRef.snapshotChanges().pipe(
      map((changes: any) => {
        return changes.map((doc: any) => {
          return ({id: doc.payload.doc.id, ...doc.payload.doc.data()}) as Match
        });
      }),
      tap((matchs: Match[]) => {
        this._matchs$.next(matchs);
        this.setLoadingStatus(false);
      })
    )
  }

  getMatchById(id: string): Observable<Match> {
    return this.getMatchsFromFirebase().pipe(
      map((matchs: Match[]) => matchs.filter(match=>match.id===id)[0]),
    )
  }

  createMatch(match: Match): Observable<boolean> {
    return new Observable(obs => {
      this.matchsRef.add({...match}).then(() => {
        obs.next(match);
      })
    }).pipe(
      map(() => true),
      delay(1000),
      // On émet un observable à faux
      catchError(() => of(false).pipe(
        delay(1000)
      ))
    )
  }

  updateMatch(match: Match): Observable<Match> {
    return new Observable(obs => {
      this.matchsRef.doc(match.id).update(match)
      obs.next()
    })
  }

  deleteMatch(id: string): void {
    this.setLoadingStatus(true);
    this._firestore.doc(`${this.dbPath}/${id}`).delete();
    this.matchs$.pipe(
      map((matchs: Match[]) => matchs.filter(match => match.id !== id)),
      tap((matchs: Match[]) => this._matchs$.next(matchs))
    ).subscribe()

    this.setLoadingStatus(false);
  }

  getStats():Observable<Statistics>{
    this.setLoadingStatus(true);
    return this.matchs$.pipe(
      delay(1000),
      map((matchs:Match[])=>{
        return {
          totalMatchs:matchs.length,
          victoirePourcentage:matchs.filter(match=>match.resultat.issue==="victoire").length*100/matchs.length,
          totalAces:matchs.reduce((total,match)=>total+match.aces,0),
          totalDoubleFautes:matchs.reduce((total,match)=>total+match.doubleFautes,0),
          pourcentagePremierService:matchs.reduce((total,match)=>total+match.pourcentagePremierService,0)/matchs.length,
          pointsGagnes:matchs.reduce((total,match)=>total+match.pointsGagnes,0)
        }
      }),
      tap(()=>this.setLoadingStatus(false))
    )
  }
}
