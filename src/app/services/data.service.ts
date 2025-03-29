import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import {Pokemon, PokemonApiResponse} from "../models/pokemon.model";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  // Retrieves a list of Pokemons from the PokeAPI
  getPokemons(limit: number, offset: number): Observable<PokemonApiResponse> {
    return this.http.get<PokemonApiResponse>(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`);
  }

  // Fetches detailed data about a specific Pokémon by its name.
  getDataAboutPokemons(name: string): Observable<Pokemon> {
    return this.http.get<Pokemon>(`https://pokeapi.co/api/v2/pokemon/${name}`);
  }

}
