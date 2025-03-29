import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { Pokemon } from "../models/pokemon.model";
import {NgxPaginationModule} from "ngx-pagination";

@Component({
  selector: 'app-captured-pokemons',
  standalone: true,
  imports: [CommonModule, RouterModule, NgxPaginationModule],
  templateUrl: './captured-pokemons.component.html',
  styleUrl: './captured-pokemons.component.css'
})
export class CapturedPokemonsComponent implements OnInit {
  capturedPokemons: Pokemon[] = [];
  ngOnInit() {
    // Get the list of captured Pokemons from localStorage
    try {
      const storedPokemons = localStorage.getItem('capturedPokemons');
      this.capturedPokemons = storedPokemons ? JSON.parse(storedPokemons) : [];
    } catch (e) {
      this.capturedPokemons = [];
    }
  }


  // Remove a captured Pokemon by its name
  removeCapturedPokemon(pokemonName: string): void {
    // Get the list of captured Pokemon from localStorage
    const capturedPokemons = JSON.parse(localStorage.getItem('capturedPokemons') || '[]');

    // Search for the Pokémon by name
    const pokemonIndex = capturedPokemons.findIndex((pokemon: Pokemon) => pokemon.name === pokemonName);

    if (pokemonIndex === -1) {
      return;
    }

    // Remove the Pokemon from the list using its index
    capturedPokemons.splice(pokemonIndex, 1);

    // Update the capturedPokemons list in localStorage
    localStorage.setItem('capturedPokemons', JSON.stringify(capturedPokemons));

    // Update the capturedPokemons list in the component
    this.capturedPokemons = capturedPokemons;
  }
}
