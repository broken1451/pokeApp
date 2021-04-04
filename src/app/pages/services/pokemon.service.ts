import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, throwError, Subject, of } from 'rxjs';
import { PokeAPI, PokeSprites, Sprites } from '../interfaces/poke.interfaces';
import { catchError, map } from 'rxjs/operators';

const URL = environment.pokeUrl;
const URLSprites = environment.pokeUrlSprites;
const URLType = environment.pokeUrlTypes;

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  public nroPokemones = 150;
  public typesPokemons: string[] = [
    'steel',
    'water',
    'bug',
    'dragon',
    'electric',
    'ghost',
    'fire',
    'fairy',
    'ice',
    'fighting',
    'normal',
    'grass',
    'psychic',
    'rock',
    'dark',
    'ground',
    'poison',
    'flying',
  ];

  private pokeSubject = new Subject<any>();
  public itemsObservable$ = this.pokeSubject.asObservable();

  constructor(private httpClient: HttpClient) {}

  getAllPokemons(): Observable<PokeAPI> {
    return (
      this.httpClient
        .get<PokeAPI>(`${URL}?limit=${this.nroPokemones}`)
        // .pipe( catchError((err: any) => {
        //   console.log('err', err);
        //   return throwError(err);
        // }));
        .pipe(
          catchError((err: any) => {
            return this._handleError(err);
          })
        )
    );
  }

  // pokeUrlSprites: 'https://pokeapi.co/api/v2/pokemon/{id or name}/',
  getPokemonsSprites(name: string): Observable<PokeSprites | any> {
    // console.log(name)
    return this.httpClient.get(`${URLSprites}/${name}`).pipe(
      catchError((err: any) => {
        console.log({err})
        return of(err);
      })
    );
  }

  // pokeUrlTypes: 'https://pokeapi.co/api/v2/type/{id or name}/',',
  getPokemonsTypes(name: string): Observable<PokeSprites | any> {
    return this.httpClient.get(`${URLType}/${name}`);
  }

  private _handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` + `body was: ${error.error}`
      );
    }
    // return an observable with a user-facing error message
    return throwError('Something bad happened; please try again later.');
  }

  getTypesPokemons() {
    return this.typesPokemons;
  }

  getTypesPokemonsService() {
    return this.httpClient.get(`${URLType}`);
  }
}
