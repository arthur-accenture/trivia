import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { TriviaQuestionsComponent } from './trivia-questions.component';

describe('TriviaQuestionsComponent', () => {
  let component: TriviaQuestionsComponent;
  let fixture: ComponentFixture<TriviaQuestionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TriviaQuestionsComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TriviaQuestionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render questions when supplied a model', () => {
    // Test before model is ready
    let control = fixture.debugElement.query(By.css('.question'));
    console.log(control);
    // Not doing expect(control).toBeFalsy() due to a bug
    // https://github.com/angular/angular/issues/14235
    expect(control == null).toBe(true);

    // Set model up for another test
    component.triviaQuestions = [{
      category: 'Science & Nature',
      type: 'multiple',
      difficulty: 'easy',
      question: 'What is the hottest planet in the Solar System?',
      correctAnswer: 'Venus',
      incorrectAnswers: ['Mars', 'Mercury', 'Jupiter'],
      allAnswers: ['Mars', 'Venus', 'Mercury', 'Jupiter'],
      questionId: '11111111-2222-3333-4444-555566667777',
    }];

    // Test after model is ready
    fixture.detectChanges();
    control = fixture.debugElement.query(By.css('.question'));
    console.log(control);
    expect(control != null).toBe(true);
  });

  it('should assign a unique ID to the radio input', () => {
    // Test before model is ready
    let inputControl = fixture.debugElement.query(By.css('input[id]'));
    let labelControl = fixture.debugElement.query(By.css('label[for]'));
    expect(inputControl == null).toBe(true);
    expect(labelControl == null).toBe(true);

    component.triviaQuestions = [{
      category: 'Science & Nature',
      type: 'multiple',
      difficulty: 'easy',
      question: 'What is the hottest planet in the Solar System?',
      correctAnswer: 'Venus',
      incorrectAnswers: ['Mars', 'Mercury', 'Jupiter'],
      allAnswers: ['Mars', 'Venus', 'Mercury', 'Jupiter'],
      questionId: '11111111-2222-3333-4444-555566667777',
    },
    {
      category: 'Mythology',
      type: 'multiple',
      difficulty: 'hard',
      question: 'Which Greek & Roman god was known as the god of music, truth and prophecy, healing, the sun and light, plague, poetry, and more?',
      correctAnswer: 'Apollo',
      incorrectAnswers: ['Aphrodite', 'Artemis', 'Athena'],
      allAnswers: ['Aphrodite', 'Artemis', 'Athena', 'Apollo'],
      questionId: '11111111-2222-3333-4444-555566668888',
    }];

    fixture.detectChanges();
    let inputControl2 = fixture.debugElement.queryAll(By.css('input[id="11111111-2222-3333-4444-555566668888-2"]'));
    let labelControl2 = fixture.debugElement.queryAll(By.css('label[for="11111111-2222-3333-4444-555566668888-2"]'));
    expect(inputControl2.length).toBe(1);
    expect(labelControl2.length).toBe(1);
  });

  fit('should populate correctAnswers array when _triviaQuestions is set', () => {
    // Expect no trivia questions or correct answers
    expect(component.correctAnswers.size).toEqual(0);
    expect(component.triviaQuestions).toBeFalsy();

    // Expect when trivia questions returned, then correct answers are populated.
    component.triviaQuestions = [{
      category: 'Science & Nature',
      type: 'multiple',
      difficulty: 'easy',
      question: 'What is the hottest planet in the Solar System?',
      correctAnswer: 'Venus',
      incorrectAnswers: ['Mars', 'Mercury', 'Jupiter'],
      allAnswers: ['Mars', 'Venus', 'Mercury', 'Jupiter'],
      questionId: '11111111-2222-3333-4444-555566667777',
    },
    {
      category: 'Mythology',
      type: 'multiple',
      difficulty: 'hard',
      question: 'Which Greek & Roman god was known as the god of music, truth and prophecy, healing, the sun and light, plague, poetry, and more?',
      correctAnswer: 'Apollo',
      incorrectAnswers: ['Aphrodite', 'Artemis', 'Athena'],
      allAnswers: ['Aphrodite', 'Artemis', 'Athena', 'Apollo'],
      questionId: '11111111-2222-3333-4444-555566668888',
    }];
    // Expect exact values of correctAnswers match our mock data.
    expect(component.correctAnswers.size).toEqual(2);
    expect(component.triviaQuestions).toBeTruthy();
    expect(component.correctAnswers.get('11111111-2222-3333-4444-555566667777')).toEqual('Venus');
    expect(component.correctAnswers.get('11111111-2222-3333-4444-555566668888')).toEqual('Apollo');

  });

});
