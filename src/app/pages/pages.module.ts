import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { PokeHomeComponent } from './poke-home/poke-home.component';
import { MaterialModule } from '../material/material.module';
import { SearchComponent } from './search/search.component';


@NgModule({
  declarations: [PokeHomeComponent, SearchComponent],
  imports: [
    CommonModule,
    PagesRoutingModule,
    MaterialModule
  ],
  exports:[PokeHomeComponent]
})
export class PagesModule { }
