import { Component, OnInit } from '@angular/core';
import { TriviaService } from '../core/services';
import { TriviaQuestion } from '../core/models';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  constructor(private triviaService: TriviaService) {
  }

  triviaQuestions: TriviaQuestion[];

  ngOnInit() {
  }

    // on click "Generate Questions":
    getQuestions(options) {
      this.triviaService.getQuestions(options).subscribe(response => {
        this.triviaQuestions = <TriviaQuestion[]>response;
      });
    }
}
