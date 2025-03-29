import { Routes } from '@angular/router';
import {PokemonListComponent} from "./pokemon-list/pokemon-list.component";
import {CapturedPokemonsComponent} from "./captured-pokemons/captured-pokemons.component";
import {PokemonHuntComponent} from "./pokemon-hunt/pokemon-hunt.component";

export const routes: Routes = [
  { path: '', component: PokemonListComponent },
  { path: 'captured', component: CapturedPokemonsComponent },
  { path: 'pokemon-hunt', component: PokemonHuntComponent }
];

