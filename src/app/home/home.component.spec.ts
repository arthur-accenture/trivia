import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import { FormsModule } from '@angular/forms';
import { TriviaService } from '../core/services';
import { TriviaOptionsComponent } from '../trivia-options/trivia-options.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TriviaQuestionsComponent } from '../trivia-questions/trivia-questions.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeComponent, TriviaOptionsComponent, TriviaQuestionsComponent ],
      imports: [FormsModule, HttpClientTestingModule ],
      providers: [TriviaService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
