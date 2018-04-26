import { Component, OnInit, Input } from '@angular/core';
import { TriviaQuestions } from '../core/models';

@Component({
  selector: 'app-trivia-questions',
  templateUrl: './trivia-questions.component.html',
  styleUrls: ['./trivia-questions.component.css']
})
export class TriviaQuestionsComponent implements OnInit {
  correctAnswers: Map<string, string> = new Map<string, string>();
  selectedAnswer: Map<string, string> = new Map<string, string>();
  private _triviaQuestions;

  @Input()
  set triviaQuestions(triviaQuestions: TriviaQuestions[]) {
    this._triviaQuestions = triviaQuestions;
    for (let i = 0; triviaQuestions && i < triviaQuestions.length; i++) {
      this.correctAnswers.set(triviaQuestions[i].questionId, triviaQuestions[i].correctAnswer);
    }
  }
  get triviaQuestions(): TriviaQuestions[] { return this._triviaQuestions; }

  constructor() { }

  ngOnInit() {
  }

}
