import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { DataService } from "../services/data.service";
import { CommonModule, TitleCasePipe } from "@angular/common";
import { Pokemon } from "../models/pokemon.model";

@Component({
  selector: 'app-pokemon-hunt',
  standalone: true,
  imports: [TitleCasePipe, CommonModule],
  templateUrl: './pokemon-hunt.component.html',
  styleUrls: ['./pokemon-hunt.component.css']
})
export class PokemonHuntComponent implements OnInit {
  specialPokemons: Pokemon[] = [];
  isGameActive: boolean = false;  // Hide or show the game
  pokeballs: any[] = [];
  caughtCount: number = 0;
  gameOver: boolean = false;
  winMessage: string = '';
  capturedPokemon: Pokemon | null = null;
  colors: string[] = ['red', 'blue', 'green', 'yellow', 'purple', 'orange', 'pink'];

  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.loadSpecialPokemons();
  }

  // Loading 3 special Pokemons from the API
  loadSpecialPokemons() {
    const specialPokemonsNames = ['mewtwo', 'mew', 'celebi'];
    specialPokemonsNames.forEach(name => {
      this.dataService.getDataAboutPokemons(name).subscribe((pokemon: Pokemon) => {
        this.specialPokemons.push({ ...pokemon });
      });
    });
  }


  // When starting the game the titles are hidden and only the game is shown
  startGame() {
    this.caughtCount = 0;
    this.isGameActive = true;
    this.gameOver = false;
    this.winMessage = '';
    this.capturedPokemon = null;

    this.pokeballs = [];
    for (let i = 0; i < 50; i++) {
      const top = Math.floor(Math.random() * 350);
      const left = Math.floor(Math.random() * 350);
      const color = this.colors[Math.floor(Math.random() * this.colors.length)];
      this.pokeballs.push({ top, left, color });
    }

    // After 10 seconds the game is over
    setTimeout(() => this.endGame(), 10000);
  }

  // When catching a PokéBall the count is increased and the PokéBall is removed
  catchPokeball(index: number) {
    this.caughtCount++;
    this.pokeballs.splice(index, 1);
  }

  endGame() {
    this.isGameActive = false;
    this.gameOver = true;

    // If you catch more than 30 Poké Balls you win a random special Pokémon
    if (this.caughtCount >= 30) {
      this.winMessage = `You caught ${this.caughtCount} Poké Balls! Congratulations, you won a Pokémon!`;
      this.capturedPokemon = this.specialPokemons[Math.floor(Math.random() * this.specialPokemons.length)];
    } else {
      this.winMessage = `You only caught ${this.caughtCount} Poké Balls. Try again!`;
    }
  }

  catchCapturedPokemon() {
    // Get the captured Pokemon from localStorage
    let capturedPokemons = JSON.parse(localStorage.getItem('capturedPokemons') || '[]');

    // Add the new Pokemon to the list
    capturedPokemons.push(this.capturedPokemon);

    // Save the list in localStorage
    localStorage.setItem('capturedPokemons', JSON.stringify(capturedPokemons));

    this.winMessage = 'The Pokémon was successfully captured!';

    this.capturedPokemon = null; // Hide the Pokemon after catching it

    // Don't change the `gameOver` status so the page remains on the captured Pokemon and the "Capture" button
    this.gameOver = true;
  }

  // Play again
  restartGame() {
    this.gameOver = false;
    this.startGame();
  }
}
