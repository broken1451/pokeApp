import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PokeHomeComponent } from './poke-home/poke-home.component';


const routes: Routes = [
  {
    path:'',
    children:[
      {
        path:'pokemons',
        component: PokeHomeComponent
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
