import { Component, OnInit, Input } from '@angular/core';
import { TriviaQuestion } from '../core/models';

@Component({
  selector: 'app-trivia-questions',
  templateUrl: './trivia-questions.component.html',
  styleUrls: ['./trivia-questions.component.css']
})
export class TriviaQuestionsComponent implements OnInit {

  tally = {
    correct: 0,
    total: 0
  };
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
    let allAnswered = true;
    for (let question of this.triviaQuestions) {
      if (!question.selectedAnswer) {
        allAnswered = false;
      }
    }
    if (!allAnswered) {
      alert('you must answer all questions to check answers!');
    } else {
      this.revealAnswers = true;
      this.tally.total += this._triviaQuestions.length;
    }

    // update the score:
    this.tally.correct += this.triviaQuestions.map(question => question.score || 0)
    .reduce((accumulator, score) => accumulator + score);
  }

}
