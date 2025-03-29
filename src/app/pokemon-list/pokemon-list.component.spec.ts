import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PokemonListComponent } from './pokemon-list.component';
import { DataService } from "../services/data.service";
import { of } from 'rxjs';
import { Pokemon, PokemonApiResponse } from "../models/pokemon.model";

describe('PokemonListComponent', () => {
  let component: PokemonListComponent;
  let fixture: ComponentFixture<PokemonListComponent>;
  let mockDataService: jasmine.SpyObj<DataService>;

  beforeEach(() => {
    spyOn(localStorage, 'getItem').and.callFake(() => null);  // Mock pentru getItem
    spyOn(localStorage, 'setItem').and.callFake(() => {});    // Mock pentru setItem

    mockDataService = jasmine.createSpyObj('DataService', ['getPokemons', 'getDataAboutPokemons']);

    // Mock data for getPokemons
    mockDataService.getPokemons.and.returnValue(of({
      count: 1,
      next: null,
      previous: null,
      results: [{ name: 'bulbasaur' }]
    } as PokemonApiResponse)); // Cast the response to PokemonApiResponse type

    // Mock for getDataAboutPokemons
    const mockPokemonResponse: Pokemon = {
      id: 1,
      name: 'bulbasaur',
      abilities: [
        {
          ability: { name: 'overgrow', url: 'https://pokeapi.co/api/v2/ability/65/' },
          is_hidden: false,
          slot: 1
        }
      ],
      base_experience: 64,
      height: 7,
      weight: 69,
      sprites: {
        front_default: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png',
        back_default: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/1.png',
        front_shiny: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/1.png',
        back_shiny: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/shiny/1.png'
      },
      species: {
        name: 'bulbasaur',
        url: 'https://pokeapi.co/api/v2/pokemon-species/1/'
      },
      types: [
        {
          type: { name: 'grass', url: 'https://pokeapi.co/api/v2/type/12/' }
        },
        {
          type: { name: 'poison', url: 'https://pokeapi.co/api/v2/type/4/' }
        }
      ],
      stats: [
        {
          base_stat: 45,
          effort: 0,
          stat: { name: 'hp', url: 'https://pokeapi.co/api/v2/stat/1/' }
        },
        {
          base_stat: 49,
          effort: 0,
          stat: { name: 'attack', url: 'https://pokeapi.co/api/v2/stat/2/' }
        },
        {
          base_stat: 49,
          effort: 0,
          stat: { name: 'defense', url: 'https://pokeapi.co/api/v2/stat/3/' }
        }
      ]
    };


    mockDataService.getDataAboutPokemons.and.returnValue(of(mockPokemonResponse));

    TestBed.configureTestingModule({
      imports: [PokemonListComponent],
      providers: [
        { provide: DataService, useValue: mockDataService }
      ]
    });

    fixture = TestBed.createComponent(PokemonListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should capture the pokemon and store it in localStorage', () => {
    component.getPokemons();
    fixture.detectChanges();

    fixture.whenStable().then(() => {
      expect(localStorage.setItem).toHaveBeenCalled();
      expect(localStorage.setItem).toHaveBeenCalledWith(
        'capturedPokemons',
        JSON.stringify([{
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
            front_default: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png',
            back_default: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/1.png',
            front_shiny: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/1.png',
            back_shiny: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/shiny/1.png'
          },
          species: {
            name: 'bulbasaur',
            url: 'https://pokeapi.co/api/v2/pokemon-species/1/'
          }
        }])
      );
    });
  });

  it('should fetch pokemons on init', () => {
    component.getPokemons();
    fixture.detectChanges();

    fixture.whenStable().then(() => {
      expect(mockDataService.getPokemons).toHaveBeenCalled();
      expect(component.pokemons.length).toBe(1);
      expect(component.pokemons[0].name).toBe('bulbasaur');
    });
  });

  it('should display no pokemons if none are returned from the service', () => {
    mockDataService.getPokemons.and.returnValue(of({
      count: 0,
      next: null,
      previous: null,
      results: []
    } as PokemonApiResponse));

    component.getPokemons();
    fixture.detectChanges();

    expect(component.pokemons.length).toBe(0);
    expect(component.filteredPokemons.length).toBe(0);
  });

  afterEach(() => {
    mockDataService.getPokemons.calls.reset();
    mockDataService.getDataAboutPokemons.calls.reset();
  });
});
