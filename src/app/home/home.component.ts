import { Component, OnInit } from '@angular/core';
import { TriviaService } from '../core/services';
import { TriviaQuestions } from '../core/models';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  constructor(private triviaService: TriviaService) {
  }

  triviaQuestions: TriviaQuestions[];

  ngOnInit() {
  }

    // on click "Generate Questions":
    getQuestions(options) {
      console.log('user options at button click: ', options);
      this.triviaService.getQuestions(options).subscribe(response => {
        this.triviaQuestions = <TriviaQuestions[]>response;
        //console.log(response);
      });
    }
}
