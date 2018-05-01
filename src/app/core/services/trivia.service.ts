import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { UUID } from 'angular2-uuid';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';

import { TriviaCategory, TriviaQuestion } from '../models';


@Injectable()
export class TriviaService {
  constructor(private http: HttpClient) { }

  public getCategories(): Observable<TriviaCategory> {
    const CATEGORY_URL = 'https://opentdb.com/api_category.php';

    return this.http.get(CATEGORY_URL)
    .map((response: any) => {
      return response.trivia_categories;
    })
    .catch(error => {
      console.error('ERROR: ', error);
      return error;
    });
  }

  public getQuestions(options): Observable<Object> {
    const URL = 'https://opentdb.com/api.php';
    let params = new HttpParams();
    options = Object.assign({amount: 10},  options);
    for (let i in options) {
      if (options[i] != null && options[i] !== undefined) {
        params = params.append(i, options[i]);
      }
    }
    console.log(params);
    return this.http.get(URL, {params})
    .map((response: any) => {
      console.log(this.http.get(URL, {params: params}));
      return response.results.map((result) => {
        let allAnswers = [];
        let uuid = UUID.UUID();
        if (result.type === 'boolean') {
          allAnswers = ['True', 'False'];
        } else {
          allAnswers = allAnswers.concat(result.incorrect_answers, result.correct_answer).sort(function() { return 0.5 - Math.random(); });
        }
        return <TriviaQuestion>{
          question: result.question,
          correctAnswer: result.correct_answer,
          incorrectAnswers: result.incorrect_answers,
          allAnswers: allAnswers,
          category: result.category,
          difficulty: result.difficulty,
          type: result.type,
          questionId: uuid,
        };
      });
    });
  }
}
