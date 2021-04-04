import {
  Component,
  Input,
  OnInit,
  Output,
  EventEmitter,
  AfterViewInit,
  AfterContentInit,
  DoCheck,
} from '@angular/core';
import {
  PokeSprites,
  Result,
  TYPE_COLOURS,
} from '../interfaces/poke.interfaces';
import { PokemonService } from '../services/pokemon.service';
import { map } from 'rxjs/operators';
import { Observable, of, Subscription } from 'rxjs';

@Component({
  selector: 'app-poke-home',
  templateUrl: './poke-home.component.html',
  styleUrls: ['./poke-home.component.scss'],
})
export class PokeHomeComponent implements OnInit, DoCheck, AfterContentInit {
  @Input() pokemons!: Result[];
  @Input() pokemonsFilter!: any;
  @Input() typePokemons!: any;
  public poke$!: Subscription;
  @Output() emitTypePokemons = new EventEmitter<any[]>();
  public arrtypes: any[] = [];

  constructor(private pokeService: PokemonService) {}
  ngAfterContentInit(): void {
    console.log('here ngAfterContentInit')
    console.log( this.pokemonsFilter)
    console.log( this.typePokemons)
  }
  ngDoCheck(): void {
    if (this.pokemonsFilter) {
      // console.log('here docheck')
      // console.log( this.pokemonsFilter)
      //  this.pokemons = this.pokemonsFilter.pokemon
      //  this.getAllPokemons();
      // console.log( this.pokemonsFilter)
      // console.log( this.typePokemons)
   }
  }

  ngOnInit(): void {
    this.getAllPokemons();
    this.poke$ =  this.pokeService.itemsObservable$.subscribe((data) => {
      this.pokemons = data;
      // console.log('data: ', data);
    });
    
  }

  getAllPokemons() {
 
      this.pokeService
      .getAllPokemons()
      .pipe(
        map((pokemon) => {
          this.pokemons = pokemon.results;
          for (let i = 0; i < pokemon.results.length; i++) {
            const element = pokemon.results[i];
            this.getSprites(element.name).subscribe((res) => {
              element.img = res?.sprites?.front_default;
              element.color = 'primary';
              let type: string[] = [];
              if (res?.types?.length) {
                this.arrtypes = res.types;
                // console.log( this.arrtypes)
                this.arrtypes.forEach((types) => {
                  type.push(types?.type?.name);
                });
                element.type = type;
              }
            });
          }
        })
      )
      .subscribe();

   
  }

  getSprites(name: string): Observable<PokeSprites> {
    return this.pokeService.getPokemonsSprites(name);
  }

  getTypesPokemon(name: string): Observable<PokeSprites> {
    return this.pokeService.getPokemonsSprites(name);
  }

  _getTypeColour(type: any): any {
    return `#${TYPE_COLOURS[type]}`;
  }
}
