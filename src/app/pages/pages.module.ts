import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { PokeHomeComponent } from './poke-home/poke-home.component';
import { MaterialModule } from '../material/material.module';
import { SearchComponent } from './search/search.component';
import { PipesModule } from '../pipes/pipes.module';


@NgModule({
  declarations: [PokeHomeComponent, SearchComponent],
  imports: [
    CommonModule,
    PagesRoutingModule,
    MaterialModule,
    PipesModule
  ],
  exports:[PokeHomeComponent]
})
export class PagesModule { }
