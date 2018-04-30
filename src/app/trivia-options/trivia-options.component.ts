import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { TriviaOptions, TriviaCategory } from '../core/models';
import { NgForm } from '@angular/forms';
import { TriviaService } from '../core/services';

@Component({
  selector: 'app-trivia-options',
  templateUrl: './trivia-options.component.html',
  styleUrls: ['./trivia-options.component.css'],
  providers: [TriviaService],
})
export class TriviaOptionsComponent implements OnInit {
  public trivia_categories;
  options: TriviaOptions;

  @Output()
  optionsModel: EventEmitter<TriviaOptions> = new EventEmitter<TriviaOptions>();

  constructor(private triviaService: TriviaService) { }

  ngOnInit() {
    this.options = <TriviaOptions> {};
    this.triviaService.getCategories().subscribe(
      response => this.trivia_categories = response);
  }

  getOptions() {
    // We will emit this event to any attached event handlers
    this.optionsModel.emit(this.options);
  }


}
