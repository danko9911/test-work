import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import {table} from "./table-data-interface";

@Injectable({
  providedIn: 'root'
})
export class tableService {

  private tablesUrl = 'api/tables';  // URL to web api

  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  getTables(): Observable<table[]> {
    return this.http.get<table[]>(this.tablesUrl).pipe(
      tap(_ => console.log('fetched tables')),
      catchError(this.handleError<table[]>('gettables', []))
    );
  }

  getTable(id: number): Observable<table> {
    const url = `${this.tablesUrl}/${id}`;
    return this.http.get<table>(url).pipe(
      tap(_ => console.log(`fetched table id=${id}`)),
      catchError(this.handleError<table>(`gettable id=${id}`))
    );
  }

  addTable(table: table): Observable<table> {
    return this.http.post<table>(this.tablesUrl, table, this.httpOptions).pipe(
      tap((newtable: table) => console.log(`added table =${newtable.Firstname}`)),
      catchError(this.handleError<table>('addtable'))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
  updateTable(table: table): Observable<any> {
    console.log(`updated table =${table.Firstname}`,);
    return this.http.put(this.tablesUrl, table, this.httpOptions).pipe(
      tap(_ => console.log("ok")/*this.appFacade.incrementButtonSave(1))*/),
      catchError(this.handleError<any>('updatetable'))
    );
  }

  deleteTable(Firstname: string): Observable<table> {
    const url = `${this.tablesUrl}/${Firstname}`;
    return this.http.delete<table>(url, this.httpOptions).pipe(
      tap(_ => console.log(`deleted table =${Firstname}`)),
      catchError(this.handleError<table>('deletetable'))
    );
  }

  searchTables(term: string): Observable<table[]> {
    if (!term.trim()) {
      // if not search term, return empty tables array.
      return of([]);
    }
    return this.http.get<table[]>(`${this.tablesUrl}/?name=${term}`).pipe(
      tap(x => x.length ?
        console.log(`found tables matching "${term}"`) :
        console.log(`no tables matching "${term}"`)),
      catchError(this.handleError<table[]>('searchtables', []))
    );
  }

}
