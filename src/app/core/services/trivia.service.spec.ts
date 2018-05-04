import { async, TestBed, inject } from '@angular/core/testing';
import { HttpRequest, HttpParams } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TriviaService } from './trivia.service';

describe('TriviaService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [TriviaService]
    });
  });

  it('should be created', inject([TriviaService], (service: TriviaService) => {
    expect(service).toBeTruthy();
  }));

  it('should reference correct URL to retrieve categories', async(inject([TriviaService, HttpTestingController], (service: TriviaService, backend: HttpTestingController) => {
    service.getCategories()
    .subscribe();
    backend.expectOne((request: HttpRequest<any>) => {
      return request.url === 'https://opentdb.com/api_category.php';
    });
  })));

  it('should reference correct URL to retrieve questions', async(inject([TriviaService, HttpTestingController], (service: TriviaService, backend: HttpTestingController) => {
    let mock_options = {};
    service.getQuestions(mock_options)
    .subscribe();
    backend.expectOne((request: HttpRequest<any>) => {
      return request.urlWithParams === 'https://opentdb.com/api.php?amount=10';
    });

    mock_options = {amount: 10, category: '20', difficulty: 'medium', type: 'boolean'};
    service.getQuestions(mock_options)
    .subscribe();
    backend.expectOne((request: HttpRequest<any>) => {
      return request.urlWithParams === 'https://opentdb.com/api.php?amount=10&category=20&difficulty=medium&type=boolean';
    });
  })));

});
