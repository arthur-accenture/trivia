import { Component, OnInit, Input } from '@angular/core';
import { TriviaQuestion } from '../core/models';

@Component({
  selector: 'app-trivia-questions',
  templateUrl: './trivia-questions.component.html',
  styleUrls: ['./trivia-questions.component.css']
})
export class TriviaQuestionsComponent implements OnInit {
  correctAnswers: Map<string, string> = new Map<string, string>();
  selectedAnswers: Map<string, string> = new Map<string, string>();
  answers = {};
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
      console.log('selected answers so far: ', this.selectedAnswers);
    }
  }
  get triviaQuestions(): TriviaQuestion[] { return this._triviaQuestions; }

  constructor() { }

  ngOnInit() {
  }

  updateSelection(id, answer) {
    this.selectedAnswers.set(id, answer);
    console.log('updating answer with ID: ', id, ' and answer: ', answer);
  }
  checkAnswers() {
    // if not all answers submitted yet, alert.

    // else, reveal the answers:
    console.log('selected answers: ', this.selectedAnswers);
    this.revealAnswers = true;
  }

}


// [ngClass]="{correct-answer: answer===this.correctAnswers[triviaQuestion.questionId]}"
