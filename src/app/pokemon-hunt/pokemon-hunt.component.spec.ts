import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PokemonHuntComponent } from './pokemon-hunt.component';
import { DataService } from "../services/data.service";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { of } from "rxjs";
import { Pokemon } from "../models/pokemon.model";

describe('PokemonHuntComponent', () => {
  let component: PokemonHuntComponent;
  let fixture: ComponentFixture<PokemonHuntComponent>;
  let dataService: DataService;

  const mockCapturedPokemon: Pokemon = {
    id: 1,
    name: 'mewtwo',
    abilities: [
      {
        ability: { name: 'pressure', url: 'https://pokeapi.co/api/v2/ability/23/' },
        is_hidden: false,
        slot: 1
      }
    ],
    base_experience: 300,
    height: 20,
    weight: 122,
    sprites: {
      front_default: 'mewtwo_sprite_url',
      back_default: 'mewtwo_back_sprite_url',
      front_shiny: 'mewtwo_shiny_sprite_url',
      back_shiny: 'mewtwo_back_shiny_sprite_url'
    },
    species: { name: 'mewtwo', url: 'https://pokeapi.co/api/v2/pokemon-species/150/' },
    types: [
      {
        type: { name: 'psychic', url: 'https://pokeapi.co/api/v2/type/14/' }
      }
    ],
    stats: [
      { base_stat: 106, effort: 0, stat: { name: 'hp', url: 'https://pokeapi.co/api/v2/stat/1/' } },
      { base_stat: 110, effort: 0, stat: { name: 'attack', url: 'https://pokeapi.co/api/v2/stat/2/' } },
      { base_stat: 90, effort: 0, stat: { name: 'defense', url: 'https://pokeapi.co/api/v2/stat/3/' } }
    ]
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, PokemonHuntComponent],
      providers: [DataService]
    });

    fixture = TestBed.createComponent(PokemonHuntComponent);
    component = fixture.componentInstance;
    dataService = TestBed.inject(DataService);

    fixture.detectChanges();
  });

  it('should load special pokemons on init', () => {
    const mockSpecialPokemons: Pokemon[] = [
      {
        id: 1,
        name: 'mewtwo',
        abilities: [
          {
            ability: { name: 'pressure', url: 'https://pokeapi.co/api/v2/ability/23/' },
            is_hidden: false,
            slot: 1
          }
        ],
        base_experience: 300,
        height: 20,
        weight: 122,
        sprites: {
          front_default: 'mewtwo_sprite_url',
          back_default: 'mewtwo_back_sprite_url',
          front_shiny: 'mewtwo_shiny_sprite_url',
          back_shiny: 'mewtwo_back_shiny_sprite_url'
        },
        species: { name: 'mewtwo', url: 'https://pokeapi.co/api/v2/pokemon-species/150/' },
        types: [
          {
            type: { name: 'psychic', url: 'https://pokeapi.co/api/v2/type/14/' }
          }
        ],
        stats: [
          { base_stat: 106, effort: 0, stat: { name: 'hp', url: 'https://pokeapi.co/api/v2/stat/1/' } }
        ]
      },
      {
        id: 2,
        name: 'mew',
        abilities: [
          {
            ability: { name: 'synchronize', url: 'https://pokeapi.co/api/v2/ability/2/' },
            is_hidden: false,
            slot: 1
          }
        ],
        base_experience: 200,
        height: 6,
        weight: 40,
        sprites: {
          front_default: 'mew_sprite_url',
          back_default: 'mew_back_sprite_url',
          front_shiny: 'mew_shiny_sprite_url',
          back_shiny: 'mew_back_shiny_sprite_url'
        },
        species: { name: 'mew', url: 'https://pokeapi.co/api/v2/pokemon-species/151/' },
        types: [
          {
            type: { name: 'psychic', url: 'https://pokeapi.co/api/v2/type/14/' }
          }
        ],
        stats: [
          { base_stat: 100, effort: 0, stat: { name: 'hp', url: 'https://pokeapi.co/api/v2/stat/1/' } }
        ]
      },
      {
        id: 3,
        name: 'celebi',
        abilities: [
          {
            ability: { name: 'natural-cure', url: 'https://pokeapi.co/api/v2/ability/62/' },
            is_hidden: false,
            slot: 1
          }
        ],
        base_experience: 200,
        height: 6,
        weight: 50,
        sprites: {
          front_default: 'celebi_sprite_url',
          back_default: 'celebi_back_sprite_url',
          front_shiny: 'celebi_shiny_sprite_url',
          back_shiny: 'celebi_back_shiny_sprite_url'
        },
        species: { name: 'celebi', url: 'https://pokeapi.co/api/v2/pokemon-species/251/' },
        types: [
          {
            type: { name: 'psychic', url: 'https://pokeapi.co/api/v2/type/14/' }
          },
          {
            type: { name: 'grass', url: 'https://pokeapi.co/api/v2/type/12/' }
          }
        ],
        stats: [
          { base_stat: 100, effort: 0, stat: { name: 'hp', url: 'https://pokeapi.co/api/v2/stat/1/' } }
        ]
      }
    ];


    spyOn(dataService, 'getDataAboutPokemons').and.callFake((name: string) => {
      const pokemon = mockSpecialPokemons.find(pokemon => pokemon.name === name);
      return pokemon ? of(pokemon) : of({
        id: 0,
        name: '',
        abilities: [],
        base_experience: 0,
        height: 0,
        weight: 0,
        sprites: {
          front_default: '',
          back_default: '',
          front_shiny: '',
          back_shiny: ''
        },
        species: { name: '', url: '' },
        types: [],
        stats: []
      } as Pokemon);
    });


    component.ngOnInit();

    expect(component.specialPokemons.length).toBe(3);
    expect(component.specialPokemons[0].name).toBe('mewtwo');
    expect(component.specialPokemons[1].name).toBe('mew');
    expect(component.specialPokemons[2].name).toBe('celebi');
  });

  it('should start the game correctly', () => {
    component.startGame();

    expect(component.isGameActive).toBeTrue();
    expect(component.gameOver).toBeFalse();
    expect(component.caughtCount).toBe(0);
    expect(component.pokeballs.length).toBe(50);
  });

  it('should increment caughtCount when a pokeball is caught', () => {
    component.startGame();

    const initialCaughtCount = component.caughtCount;
    component.catchPokeball(0);

    expect(component.caughtCount).toBe(initialCaughtCount + 1);
    expect(component.pokeballs.length).toBe(49);
  });

  it('should end the game and choose a special pokemon when caughtCount > 30', () => {
    component.startGame();

    component.caughtCount = 31;
    component.endGame();

    expect(component.gameOver).toBeTrue();
    expect(component.winMessage).toBe('You caught 31 Poké Balls! Congratulations, you won a Pokémon!');
    expect(component.capturedPokemon).not.toBeNull();
  });

  it('should not choose a special pokemon when caughtCount <= 30', () => {
    component.startGame();

    component.caughtCount = 10;
    component.endGame();

    expect(component.gameOver).toBeTrue();
    expect(component.winMessage).toBe('You only caught 10 Poké Balls. Try again!');
    expect(component.capturedPokemon).toBeNull();
  });

  it('should capture the pokemon and store it in localStorage', (done) => {
    component.capturedPokemon = mockCapturedPokemon;

    spyOn(localStorage, 'setItem').and.callThrough();

    component.catchCapturedPokemon();

    setTimeout(() => {
      const capturedPokemons = JSON.parse(localStorage.getItem('capturedPokemons') || '[]');

      expect(capturedPokemons.length).toBe(1);
      expect(capturedPokemons[0].name).toBe('mewtwo');
      expect(localStorage.setItem).toHaveBeenCalledWith('capturedPokemons', JSON.stringify(capturedPokemons));
      expect(component.winMessage).toBe('The Pokémon was successfully captured!');
      expect(component.gameOver).toBeTrue();

      done();
    }, 0);
  });

  it('should restart the game', () => {
    component.startGame();
    component.restartGame();

    expect(component.gameOver).toBeFalse();
    expect(component.isGameActive).toBeTrue();
    expect(component.caughtCount).toBe(0);
  });

  afterEach(() => {
    localStorage.clear();
  });
});
