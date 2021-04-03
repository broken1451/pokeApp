import { Component, Input, OnInit } from '@angular/core';
import { PokeSprites, Result } from '../interfaces/poke.interfaces';
import { PokemonService } from '../services/pokemon.service';
import { map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-poke-home',
  templateUrl: './poke-home.component.html',
  styleUrls: ['./poke-home.component.scss']
})
export class PokeHomeComponent implements OnInit {

  public pokemons!: Result[];


  constructor(private pokeService: PokemonService) { }

  ngOnInit(): void {
    this.getAllPokemons();
  }


  getAllPokemons(){
    this.pokeService.getAllPokemons().pipe(
      map((pokemon)=> {
        this.pokemons = pokemon.results;
        for (let i = 0; i < pokemon.results.length; i++) {
          const element = pokemon.results[i];
          this.getSprites(element.name).subscribe((res) => {
            element.img = res.sprites.front_default;
            element.color = 'primary';
            let type: string[] = [];
            if (res.types.length) {
              res.types.forEach(types=>{
                type.push(types.type.name) 
              })
              element.type = type;
            }
          })
        }
      })
    ).subscribe();
  }

  getSprites(name:string): Observable<PokeSprites>{
   return this.pokeService.getPokemonsSprites(name)
  }

}

// switchMap((pokemon) => {
//   console.log('switchMap ===> ', pokemon);
//   let name: string[] = [];
//   for (const poke of pokemon.results) {
//     // console.log({poke})
//     name.push(poke.name)
//   }
//   console.log({name})
//   // return of(pokemon)
//   return this.getSprites(name)
// })