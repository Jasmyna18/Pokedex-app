import { TestBed } from '@angular/core/testing';
import { DataService } from './data.service';
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";

describe('DataService', () => {
  let service: DataService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [DataService]
    });
    service = TestBed.inject(DataService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should fetch pokemons from the API', () => {
    const mockPokemons = {
      results: [
        { name: 'bulbasaur' },
        { name: 'ivysaur' },
        { name: 'venusaur' }
      ],
      count: 3
    };

    // Call getPokemons from DataService
    service.getPokemons(3, 0).subscribe((response: any) => {
      expect(response).toEqual(mockPokemons);
    });

    // Check if the HTTP request was made correctly
    const req = httpMock.expectOne('https://pokeapi.co/api/v2/pokemon?limit=3&offset=0');

    // Verify that the request method is GET
    expect(req.request.method).toBe('GET');

    // Simulate a server response by returning mockPokemons
    req.flush(mockPokemons);

    httpMock.verify();
  });

  afterEach(() => {
    httpMock.verify();
  });
});
