import { Component, OnInit, Input } from '@angular/core';
import { TriviaQuestion } from '../core/models';

@Component({
  selector: 'app-trivia-questions',
  templateUrl: './trivia-questions.component.html',
  styleUrls: ['./trivia-questions.component.css']
})
export class TriviaQuestionsComponent implements OnInit {
  // TODO: refactor the three below into a single object or Map:
  correctAnswers: Map<string, string> = new Map<string, string>();
  selectedAnswers: Map<string, string> = new Map<string, string>();
  scoreMap = {};

  score: Number = 0;
  private _triviaQuestions;
  revealAnswers = false;

  @Input()
  set triviaQuestions(triviaQuestions: TriviaQuestion[]) {
    this.revealAnswers = false;
    this._triviaQuestions = triviaQuestions;
    this.correctAnswers.clear();
    this.selectedAnswers.clear();
    for (let i = 0; triviaQuestions && i < triviaQuestions.length; i++) {
      this.correctAnswers.set(triviaQuestions[i].questionId, triviaQuestions[i].correctAnswer);
      this.selectedAnswers.set(triviaQuestions[i].questionId, '');
      this.scoreMap[triviaQuestions[i].questionId] = 0;
      console.log('selected answers so far: ', this.selectedAnswers);
    }
  }
  get triviaQuestions(): TriviaQuestion[] { return this._triviaQuestions; }

  constructor() { }

  ngOnInit() {
  }

  updateSelection(id, answer) {
    this.selectedAnswers.set(id, answer);
    // update tally:
    if (answer === this.correctAnswers.get(id)) {
      this.scoreMap[id] = 1;
    } else {
      this.scoreMap[id] = 0;
    }
  }

  checkAnswers() {
    // if not all answers submitted yet, alert.

    // else, reveal the answers:
    console.log('selected answers: ', this.selectedAnswers);
    this.revealAnswers = true;

    // Update the score:
    // NB: putting this in checkAnswers means that this.score is NOT up to date all the time.
    // Doing this to prevent on-screen score from updating when user selects answers.
    this.score = 0;
    for (let key of Object.keys(this.scoreMap)) {
      this.score += this.scoreMap[key];
    }
  }

}
