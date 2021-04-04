import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PokeHomeComponent } from './poke-home/poke-home.component';
import { SearchComponent } from './search/search.component';


const routes: Routes = [
  {
    path:'',
    children:[
      {
        path:'pokemons',
        component: PokeHomeComponent
      },
      {
        path:'search/:name',
        component: SearchComponent
      },
      {
        path:'**',
        redirectTo:'pokemons'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
