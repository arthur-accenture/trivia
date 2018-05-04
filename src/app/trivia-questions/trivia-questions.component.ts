import { Component, OnInit, Input } from '@angular/core';
import { TriviaQuestion } from '../core/models';

@Component({
  selector: 'app-trivia-questions',
  templateUrl: './trivia-questions.component.html',
  styleUrls: ['./trivia-questions.component.css']
})
export class TriviaQuestionsComponent implements OnInit {

  score = 0;
  // private triviaQuestions to prevent infinite loop in setter below
  private _triviaQuestions;
  revealAnswers = false;

  @Input()
  set triviaQuestions(triviaQuestions: TriviaQuestion[]) {
    this.revealAnswers = false;
    this._triviaQuestions = triviaQuestions;
  }
  get triviaQuestions(): TriviaQuestion[] { return this._triviaQuestions; }

  constructor() { }

  ngOnInit() {
  }

  updateSelection(question, answer) {
    question.selectedAnswer = answer;
    question.score = (answer === question.correctAnswer) ? 1 : 0;
  }

  checkAnswers() {
    // if not all answers submitted yet, alert.

    // else, reveal the answers:
    this.revealAnswers = true;

    // update the score:
    this.score = 0;
    this.score = this.triviaQuestions.map(question => question.score || 0)
    .reduce((accumulator, score) => accumulator + score);
  }

}
