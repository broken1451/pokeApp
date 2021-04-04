import { Component, Output, EventEmitter, Input } from '@angular/core';
import { PokemonService } from './pages/services/pokemon.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  
  // @Output() pokemons = new EventEmitter<any>();
  public typePokemons!: string;
  public poke!: any;
 public pokemons!: any;


  constructor(private pokemonService: PokemonService){
    
  }
  typePokemon(ev: string){
    console.log({ev})
   this.poke = ev;
  //  this.getTypePokemon();
  }

  typePokemonRecived(ev: any){
    this.typePokemons = ev;
    console.log({ev:this.typePokemons})
    // console.log('dsdsdsdsdsd',this.pokemons)
    // this.typePokemons = ev;
   //  console.log(this.typePokemons)
    this.getTypePokemon();
  }
 

  getTypePokemon(){
    this.pokemonService.getPokemonsTypes(this.typePokemons).subscribe((pokemonsType=>{
      // console.log({pokemonsType});
      // this.pokemons = pokemonsType;
      // console.log(this.pokemons);
      // // this.pokemons.emit(pokemonsType);
      this.pokemons = pokemonsType;
      console.log( this.pokemons)
    }))
  }
}