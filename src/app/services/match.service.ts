import { Injectable } from '@angular/core';
import {Match} from "../models/match.model";
import {AngularFirestore, AngularFirestoreCollection} from "@angular/fire/compat/firestore";
import {map, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class MatchService {
  // matchsRef:AngularFirestoreCollection<Match>;
  private dbPath = '/matchs';
  matchsRef:AngularFirestoreCollection<Match>;
  constructor(private _firestore: AngularFirestore) {
    this.matchsRef = this._firestore.collection<Match>(this.dbPath);
  }

  getMatchsFromFirebase(): Observable<Match[]> {
    return this.matchsRef.snapshotChanges().pipe(
      map((changes: any) => {
        return changes.map((doc: any) => {
          return ({id: doc.payload.doc.id, ...doc.payload.doc.data()}) as Match
        });
      })
    )
  }

  getMatchById(id: string): Observable<Match> {
    return new Observable(obs => {
      this.matchsRef.doc(id).get().subscribe(doc => {
        obs.next({id: doc.id, ...doc.data()} as Match);
      })
    })
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
      this.matchsRef.doc(match.id).update(match)
      obs.next()
    })
  }

  deleteMatch(id: string): void {
    this._firestore.doc(`${this.dbPath}/${id}`).delete();
  }
}
