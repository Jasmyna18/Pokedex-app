import { Component, OnInit } from '@angular/core';
import { DataService } from "../services/data.service";
import { CommonModule } from "@angular/common";
import { NgxPaginationModule } from "ngx-pagination";
import { RouterModule } from "@angular/router";
import { FormsModule } from "@angular/forms";
import { lastValueFrom } from "rxjs";
import { Pokemon, PokemonApiResponse } from "../models/pokemon.model";

@Component({
  selector: 'app-pokemon-list',
  standalone: true,
  imports: [CommonModule, NgxPaginationModule, RouterModule, FormsModule],
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.css']
})
export class PokemonListComponent implements OnInit {
  pokemons: Pokemon[] = [];
  filteredPokemons: Pokemon[] = [];
  searchQuery: string = '';
  page = 1;
  notificationMessage: string = '';
  notificationClass: string = '';

  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.getPokemons();
  }

  // Get a list of Pokemon from the API
  getPokemons() {
    this.dataService.getPokemons(100, 0).subscribe(
      (response: PokemonApiResponse) => {
        // Get detailed data about each Pokemon
        const pokemonRequests = response.results.map((result: { name: string }) =>
          lastValueFrom(this.dataService.getDataAboutPokemons(result.name))
        );

        // After all Pokémon data is fetched, update the lists
        Promise.all(pokemonRequests).then((pokemons: Pokemon[]) => {
          this.pokemons = pokemons;
          this.filteredPokemons = [...this.pokemons];
        });
      },
      (error) => {
        console.error('Error fetching Pokémon data:', error);
      }
    );
  }

// Catch a Pokémon and store it in localStorage
  capturePokemon(pokemon: Pokemon) {
    // Get the existing captured Pokemon list from localStorage or create one
    const capturedPokemons = JSON.parse(localStorage.getItem('capturedPokemons') || '[]');

    // Check if the Pokemon is already captured
    if (capturedPokemons.some((p: Pokemon) => p.name === pokemon.name)) {
      this.notificationMessage = `${pokemon.name} is already caught!`;
      this.notificationClass = 'error';
    } else {
      const pokemonData = {
        id: pokemon.id,
        name: pokemon.name,
        abilities: pokemon.abilities,
        base_experience: pokemon.base_experience,
        height: pokemon.height,
        weight: pokemon.weight,
        sprites: pokemon.sprites,
        species: pokemon.species,
        types: pokemon.types,
        stats: pokemon.stats
      };

      // Add the captured Pokemon to the list
      capturedPokemons.push(pokemonData);

      // Update the list in localStorage
      localStorage.setItem('capturedPokemons', JSON.stringify(capturedPokemons));

      this.notificationMessage = `${pokemon.name} was caught successfully!`;
      this.notificationClass = 'success';

      // Remove the Pokemon from the available list after catching it
      this.pokemons = this.pokemons.filter(p => p.name !== pokemon.name);
      this.filteredPokemons = this.filteredPokemons.filter(p => p.name !== pokemon.name);
    }


  setTimeout(() => {
      this.notificationMessage = '';
      this.notificationClass = '';
    }, 3000);
  }

  // Filter the Pokemons
  filterPokemons() {
    const searchQueryLower = this.searchQuery.toLowerCase();
    this.filteredPokemons = this.pokemons.filter(pokemon =>
      pokemon.name.toLowerCase().startsWith(searchQueryLower)
    );
  }
}
