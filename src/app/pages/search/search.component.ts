import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { PokemonService } from '../services/pokemon.service';
import { PokeSprites, Result, TYPE_COLOURS } from '../interfaces/poke.interfaces';
import { map, switchMap, tap } from 'rxjs/operators';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  public pokemons!: any[];
  public arrtypes: any[] = [];

  constructor(private pokeService: PokemonService,private activateRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activateRoute.params.pipe(
      switchMap(({name})=>{
        return this.getTypePokemons(name)
      })
    ) .subscribe((res)=>{
      for (let i = 0; i < res.pokemon.length; i++) {
        const element = res.pokemon[i];
        this.getSprites(element.pokemon.name).subscribe((res) => {
          element.img = res.sprites.front_default;
          element.color = 'primary';
          let type: string[] = [];
          if (res.types?.length) {
            this.arrtypes = res.types;
            this.arrtypes.forEach((types) => {
              type.push(types?.type?.name);
            });
            element.type = type;
          }
        });
      }
      this.pokemons = res.pokemon;
    })
  }

  getTypePokemons(name:string): Observable<any>{
    return this.pokeService.getPokemonsTypes(name);
  }

  getSprites(name: string): Observable<PokeSprites> {
    return this.pokeService.getPokemonsSprites(name);
  }

  _getTypeColour(type: any): any {
    return `#${TYPE_COLOURS[type]}`;
  }

}
