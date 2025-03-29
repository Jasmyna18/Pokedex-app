import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CapturedPokemonsComponent } from './captured-pokemons.component';
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { Pokemon } from "../models/pokemon.model";  // Importă modelul Pokemon

describe('CapturedPokemonsComponent', () => {
  let component: CapturedPokemonsComponent;
  let fixture: ComponentFixture<CapturedPokemonsComponent>;

  const mockCapturedPokemons: Pokemon[] = [
    {
      id: 1,
      name: 'bulbasaur',
      abilities: [{
        ability: { name: 'overgrow', url: 'https://pokeapi.co/api/v2/ability/65/' },
        is_hidden: false,
        slot: 1
      }],
      base_experience: 64,
      height: 7,
      weight: 69,
      sprites: {
        front_default: 'bulbasaur_sprite_url',
        back_default: 'bulbasaur_back_sprite_url',
        front_shiny: 'bulbasaur_shiny_sprite_url',
        back_shiny: 'bulbasaur_back_shiny_sprite_url'
      },
      species: { name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon-species/1/' },
      types: [{ type: { name: 'grass', url: 'https://pokeapi.co/api/v2/type/12/' } }],
      stats: [
        { base_stat: 45, effort: 0, stat: { name: 'hp', url: 'https://pokeapi.co/api/v2/stat/1/' } },
        { base_stat: 49, effort: 0, stat: { name: 'attack', url: 'https://pokeapi.co/api/v2/stat/2/' } }
      ]
    },
    {
      id: 2,
      name: 'ivysaur',
      abilities: [{
        ability: { name: 'chlorophyll', url: 'https://pokeapi.co/api/v2/ability/66/' },
        is_hidden: false,
        slot: 1
      }],
      base_experience: 142,
      height: 10,
      weight: 130,
      sprites: {
        front_default: 'ivysaur_sprite_url',
        back_default: 'ivysaur_back_sprite_url',
        front_shiny: 'ivysaur_shiny_sprite_url',
        back_shiny: 'ivysaur_back_shiny_sprite_url'
      },
      species: { name: 'ivysaur', url: 'https://pokeapi.co/api/v2/pokemon-species/2/' },
      types: [{ type: { name: 'grass', url: 'https://pokeapi.co/api/v2/type/12/' } }],
      stats: [
        { base_stat: 60, effort: 0, stat: { name: 'hp', url: 'https://pokeapi.co/api/v2/stat/1/' } },
        { base_stat: 62, effort: 0, stat: { name: 'attack', url: 'https://pokeapi.co/api/v2/stat/2/' } }
      ]
    }
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CommonModule, RouterModule, CapturedPokemonsComponent]
    });

    fixture = TestBed.createComponent(CapturedPokemonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should initialize capturedPokemons from localStorage', () => {
    spyOn(localStorage, 'getItem').and.returnValue(JSON.stringify(mockCapturedPokemons));

    component.ngOnInit();

    expect(component.capturedPokemons).toEqual(mockCapturedPokemons);
  });

  it('should update capturedPokemons and localStorage when a pokemon is removed', () => {
    spyOn(localStorage, 'getItem').and.returnValue(JSON.stringify(mockCapturedPokemons));
    spyOn(localStorage, 'setItem');

    component.ngOnInit();

    component.removeCapturedPokemon('bulbasaur');

    expect(localStorage.setItem).toHaveBeenCalledWith(
      'capturedPokemons',
      JSON.stringify([
        {
          id: 2,
          name: 'ivysaur',
          abilities: [{
            ability: { name: 'chlorophyll', url: 'https://pokeapi.co/api/v2/ability/66/' },
            is_hidden: false,
            slot: 1
          }],
          base_experience: 142,
          height: 10,
          weight: 130,
          sprites: {
            front_default: 'ivysaur_sprite_url',
            back_default: 'ivysaur_back_sprite_url',
            front_shiny: 'ivysaur_shiny_sprite_url',
            back_shiny: 'ivysaur_back_shiny_sprite_url'
          },
          species: { name: 'ivysaur', url: 'https://pokeapi.co/api/v2/pokemon-species/2/' },
          types: [{ type: { name: 'grass', url: 'https://pokeapi.co/api/v2/type/12/' } }],
          stats: [
            { base_stat: 60, effort: 0, stat: { name: 'hp', url: 'https://pokeapi.co/api/v2/stat/1/' } },
            { base_stat: 62, effort: 0, stat: { name: 'attack', url: 'https://pokeapi.co/api/v2/stat/2/' } }
          ]
        }
      ])
    );

    expect(component.capturedPokemons).toEqual([
      {
        id: 2,
        name: 'ivysaur',
        abilities: [{
          ability: { name: 'chlorophyll', url: 'https://pokeapi.co/api/v2/ability/66/' },
          is_hidden: false,
          slot: 1
        }],
        base_experience: 142,
        height: 10,
        weight: 130,
        sprites: {
          front_default: 'ivysaur_sprite_url',
          back_default: 'ivysaur_back_sprite_url',
          front_shiny: 'ivysaur_shiny_sprite_url',
          back_shiny: 'ivysaur_back_shiny_sprite_url'
        },
        species: { name: 'ivysaur', url: 'https://pokeapi.co/api/v2/pokemon-species/2/' },
        types: [{ type: { name: 'grass', url: 'https://pokeapi.co/api/v2/type/12/' } }],
        stats: [
          { base_stat: 60, effort: 0, stat: { name: 'hp', url: 'https://pokeapi.co/api/v2/stat/1/' } },
          { base_stat: 62, effort: 0, stat: { name: 'attack', url: 'https://pokeapi.co/api/v2/stat/2/' } }
        ]
      }
    ]);
  });


  it('should not remove pokemon if it does not exist in localStorage', () => {
    spyOn(localStorage, 'getItem').and.returnValue(JSON.stringify(mockCapturedPokemons));
    spyOn(localStorage, 'setItem');

    component.ngOnInit();

    component.removeCapturedPokemon('charizard');

    expect(localStorage.setItem).not.toHaveBeenCalled();

    expect(component.capturedPokemons).toEqual(mockCapturedPokemons);
  });


  it('should handle case when localStorage is empty', () => {
    spyOn(localStorage, 'getItem').and.returnValue(null);

    component.ngOnInit();

    expect(component.capturedPokemons).toEqual([]);
  });

  it('should handle case when localStorage is unavailable', () => {
    spyOn(localStorage, 'getItem').and.callFake(() => {
      throw new Error('localStorage is not available');
    });

    component.ngOnInit();

    expect(component.capturedPokemons).toEqual([]);
  });

  afterEach(() => {
    localStorage.clear();
  });
});
