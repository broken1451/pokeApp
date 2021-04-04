import {
  Component,
  Input,
  OnInit,
  AfterViewInit,
  OnChanges,
  SimpleChanges,
  Output,
  EventEmitter,
} from '@angular/core';
import { PokemonService } from 'src/app/pages/services/pokemon.service';
import { FormGroup } from '@angular/forms';
import { MatSelectChange } from '@angular/material/select';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  public types: any[] = [];
  public poke!: any;
  @Output() typesPokemon: EventEmitter<string> = new EventEmitter<string>();
  public type: string = '';
  public poke$!: Subscription;
  @Output() pokemons: EventEmitter<string> = new EventEmitter<string>();

  constructor(private pokemonService: PokemonService, private router: Router) {}

  ngOnInit(): void {
    // this.types = this.pokemonService.getTypesPokemons()
    this.getTypePokemon(this.type);
    // this.poke$ =  this.pokemonService.itemsObservable$.subscribe((data) => {
    //   this.poke = data;
    //   console.log('data header: ', data);
    // });
    this.getTypesPokemonService();
  }

  cambioSelect(ev: MatSelectChange) {
    this.type = ev.value.name;
    console.log(this.type)
    this.router.navigate(['/home/search', this.type])
    // this.typesPokemon.emit(this.type);
    // this.getTypePokemon(this.type);
  }

  getTypePokemon(type: string) {
    this.pokemonService.getPokemonsTypes(type).subscribe((pokemonsType) => {
      // this.poke$ = this.pokemonService.itemsObservable$.subscribe((data) => {
      //   this.poke = pokemonsType;
      //   console.log('data header: ', data);
      //   this.pokemons.emit(this.poke);
      // });
    });
  }

  getTypesPokemonService() {
    this.pokemonService.getTypesPokemonsService().subscribe((types: any) => {
      this.types = types.results;
    });
  }
}
