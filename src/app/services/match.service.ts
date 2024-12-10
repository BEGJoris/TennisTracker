import { Injectable } from '@angular/core';
import {Match} from "../models/match.model";
import {AngularFirestore, AngularFirestoreCollection} from "@angular/fire/compat/firestore";
import {BehaviorSubject, delay, first, map, Observable, take, takeLast, tap} from "rxjs";

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

  getMatchsFromFirebase() {
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
    ).subscribe()
  }

  getMatchById(id: string): Observable<Match> {
    return this.matchs$.pipe(
      map((matchs: Match[]) => matchs.filter(match=>match.id===id)[0]),
    )
  }

  createMatch(match: Match): Observable<Match> {
    return new Observable(obs => {
      this.matchsRef.add({...match}).then(() => {
        obs.next(match);
      })
    })
  }

  updateMatch(match: Match): Observable<Match> {
    return new Observable(obs => {
      this.matchsRef.doc(match.id.toString()).update(match)
      obs.next()
    })
  }

  deleteMatch(id: string): void {
    this.setLoadingStatus(true);
    this._firestore.doc(`${this.dbPath}/${id}`).delete();
    this.matchs$.pipe(
      map((matchs: Match[]) => matchs.filter(match => match.id !== id)),
      tap((matchs: Match[]) => this._matchs$.next(matchs))
    )

    this.setLoadingStatus(false);
  }
}
