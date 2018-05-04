import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { TriviaQuestionsComponent } from './trivia-questions.component';
import { TriviaQuestion } from '../core/models';
import { FormsModule } from '@angular/forms';

describe('TriviaQuestionsComponent', () => {
  let component: TriviaQuestionsComponent;
  let fixture: ComponentFixture<TriviaQuestionsComponent>;
  let mockQuestions: TriviaQuestion[];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TriviaQuestionsComponent],
      imports: [FormsModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TriviaQuestionsComponent);
    component = fixture.componentInstance;
    mockQuestions = [{
      category: 'Science & Nature',
      type: 'multiple',
      difficulty: 'easy',
      question: 'What is the hottest planet in the Solar System?',
      correctAnswer: 'Venus',
      incorrectAnswers: ['Mars', 'Mercury', 'Jupiter'],
      allAnswers: ['Mars', 'Venus', 'Mercury', 'Jupiter'],
      questionId: '11111111-2222-3333-4444-555566667777'
    },
    {
      category: 'Mythology',
      type: 'multiple',
      difficulty: 'hard',
      question: 'Which Greek & Roman god was known as the god of music, truth and prophecy etc?',
      correctAnswer: 'Apollo',
      incorrectAnswers: ['Aphrodite', 'Artemis', 'Athena'],
      allAnswers: ['Aphrodite', 'Artemis', 'Athena', 'Apollo'],
      questionId: '11111111-2222-3333-4444-555566668888'
    }];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render questions when supplied a model', () => {
    // Test before model is ready
    let control = fixture.debugElement.query(By.css('.question'));
    // Not doing expect(control).toBeFalsy() due to a bug
    // https://github.com/angular/angular/issues/14235
    expect(control == null).toBe(true);

    // Assign some question data, expect DOM to update:
    component.triviaQuestions = [mockQuestions[0]];
    fixture.detectChanges();
    control = fixture.debugElement.query(By.css('.question'));
    expect(control != null).toBe(true);
  });

  it('should assign a unique ID to the radio input', () => {
    // Test before model is ready
    let inputControl = fixture.debugElement.query(By.css('input[id]'));
    let labelControl = fixture.debugElement.query(By.css('label[for]'));
    expect(inputControl == null).toBe(true);
    expect(labelControl == null).toBe(true);

    // Assign test data, expect DOM to update properly:
    component.triviaQuestions = mockQuestions;
    fixture.detectChanges();
    let inputControl2 = fixture.debugElement.queryAll(By.css('input[id="11111111-2222-3333-4444-555566668888-2"]'));
    let labelControl2 = fixture.debugElement.queryAll(By.css('label[for="11111111-2222-3333-4444-555566668888-2"]'));
    expect(inputControl2.length).toBe(1);
    expect(labelControl2.length).toBe(1);
  });

  it('should render "check answers" button after questions are populated', () => {
    // Expect no button in DOM before triviaQuestions populated:
    let buttons = fixture.debugElement.queryAll(By.css('button#check-answers-button'));
    expect(component.triviaQuestions).toBeFalsy();
    expect(buttons.length).toEqual(0);

    component.triviaQuestions = mockQuestions;
    fixture.detectChanges();
    // set triviaQuestions and expect one button to exist:
    let buttons2 = fixture.debugElement.queryAll(By.css('button#check-answers-button'));
    expect(component.triviaQuestions).toBeTruthy();
    expect(buttons2.length).toEqual(1);
  });

  it('should call the checkAnswers function when "check answers" button is pressed', () => {

    spyOn(component, 'checkAnswers');
    // Mock data to render button:
    component.triviaQuestions = mockQuestions;
    fixture.detectChanges();

    // Expect checkAnswers not to have been called yet:
    let button = fixture.debugElement.query(By.css('button#check-answers-button'));
    let buttonElement = button.nativeElement;
    expect(component.checkAnswers).not.toHaveBeenCalled();

    // Expect checkAnswers to have been called once:
    buttonElement.click();
    expect(component.checkAnswers).toHaveBeenCalledTimes(1);

  });

  it('should should update score and selectedAnswer properties when an answer is selected', () => {
    component.triviaQuestions = [mockQuestions[0]];
    fixture.detectChanges();
    let firstId = mockQuestions[0].questionId;

    // Expect score, selectedAnswer to not exist on the question:
    expect(component.triviaQuestions[0].score).toBeUndefined();
    expect(component.triviaQuestions[0].selectedAnswer).toBeUndefined();

    let radio0 = fixture.debugElement.query(By.css(`input[id="${firstId}-0"]`)).nativeElement; // 'Mars', incorrect
    radio0.click();

    // Expect score to be 0, selectedAnswer to be 'Mars':
    expect(component.triviaQuestions[0].score).toBe(0);
    expect(component.triviaQuestions[0].selectedAnswer).toBe('Mars');

    let radio1 = fixture.debugElement.query(By.css(`input[id="${firstId}-1"]`)).nativeElement; // 'Venus', correct
    radio1.click();

    // Expect score to be 1, selectedAnswer to be 'Venus':
    expect(component.triviaQuestions[0].score).toBe(1);
    expect(component.triviaQuestions[0].selectedAnswer).toBe('Venus');

  });

  it('should calculate correct score when "check answers" button pressed', () => {

    // Mock some data to force check-answers button to render:
    component.triviaQuestions = mockQuestions;
    fixture.detectChanges();
    component.triviaQuestions[0].score = 1;
    component.triviaQuestions[0].selectedAnswer = 'some answer';
    component.triviaQuestions[1].score = 1;
    component.triviaQuestions[1].selectedAnswer = 'some other answer';

    expect(component.tally.correct).toEqual(0);
    expect(component.tally.correct).not.toEqual(2);
    expect(component.tally.total).toEqual(0);

    let button = fixture.debugElement.query(By.css('button#check-answers-button')).nativeElement;
    button.click();

    expect(component.tally.correct).toEqual(2);
    expect(component.tally.correct).not.toEqual(0);
    expect(component.tally.total).toEqual(2);

  });

  it('should only show score on screen after "check answers" button pressed', () => {

    // Mock some data to force check-answers button to render:
    component.triviaQuestions = [mockQuestions[0]];
    let firstId = mockQuestions[0].questionId;
    fixture.detectChanges();

    // Expect score not shown before "check answers":
    // error thrown when querying for null, so queryAll instead and expect empty result:
    let scoreElement = fixture.debugElement.queryAll(By.css('.score-wrapper'));
    expect(scoreElement.length).toBe(0);

    // Expect score to be shown after "check answers"
    let radio0 = fixture.debugElement.query(By.css(`input[id="${firstId}-0"]`)).nativeElement;
    radio0.click();
    let button = fixture.debugElement.query(By.css('button#check-answers-button')).nativeElement;
    button.click();
    fixture.detectChanges();

    let scoreElement2 = fixture.debugElement.queryAll(By.css('.score-wrapper'));
    expect(scoreElement2.length).toBe(1);

  });

  it('should alert user if check answers button pressed before all questions have been answered', () => {
    spyOn(window, 'alert');

    component.triviaQuestions = mockQuestions;
    let firstId = component.triviaQuestions[0].questionId;
    let secondId = component.triviaQuestions[1].questionId;
    fixture.detectChanges();

    let button = fixture.debugElement.query(By.css('button#check-answers-button')).nativeElement;
    button.click();

    expect(window.alert).toHaveBeenCalledWith('you must answer all questions to check answers!');
  });

  it('should apply correct-answer and selected-answer classes when "check answer" button is pressed', () => {

    // Mock data to force check-answers button to render:
    component.triviaQuestions = [mockQuestions[0]];
    let firstId = mockQuestions[0].questionId;
    fixture.detectChanges();

    // Select an incorrect answer, then check answers:
    let radio0 = fixture.debugElement.query(By.css(`input[id="${firstId}-0"]`)).nativeElement; // incorrect
    radio0.click();
    let checkAnswersButton = fixture.debugElement.query(By.css('button#check-answers-button')).nativeElement;
    checkAnswersButton.click();
    fixture.detectChanges();

    // expect correct-answer and selected-answer classes applied to the appropriate answers:
    // Identify answer directly, then find by class, and expect to match up:
    let answer0 = fixture.debugElement.query(By.css(`label[for="${firstId}-0"]`)).nativeElement; // selected
    let answer1 = fixture.debugElement.query(By.css(`label[for="${firstId}-1"]`)).nativeElement; // correct
    let answer2 = fixture.debugElement.query(By.css(`label[for="${firstId}-2"]`)).nativeElement;
    let answer3 = fixture.debugElement.query(By.css(`label[for="${firstId}-3"]`)).nativeElement;

    let selectedByClass = fixture.debugElement.query(By.css('.selected-answer')).nativeElement;
    let correctByClass = fixture.debugElement.query(By.css('.correct-answer')).nativeElement;

    expect(answer0).toEqual(selectedByClass);
    expect(answer1).toEqual(correctByClass);

    // expect the other 2 answers have neither class applied:
    expect(answer2).not.toEqual(correctByClass);
    expect(answer2).not.toEqual(selectedByClass);
    expect(answer3).not.toEqual(correctByClass);
    expect(answer3).not.toEqual(selectedByClass);

    // Select the correct answer, then check answers:
    let radio1 = fixture.debugElement.query(By.css(`input[id="${firstId}-1"]`)).nativeElement; // First question, correct answer ('Venus')
    radio1.click();
    checkAnswersButton.click();
    fixture.detectChanges();

    // expect correct-answer and selected-answer classes applied to the same answer:
    selectedByClass = fixture.debugElement.query(By.css('.selected-answer')).nativeElement;
    correctByClass = fixture.debugElement.query(By.css('.correct-answer')).nativeElement;

    expect(answer1).toEqual(selectedByClass);
    expect(answer1).toEqual(correctByClass);
    expect(selectedByClass).toEqual(correctByClass);

    // expect the other 3 answers have neither class applied:
    expect(answer0).not.toEqual(correctByClass);
    expect(answer0).not.toEqual(selectedByClass);
    expect(answer2).not.toEqual(correctByClass);
    expect(answer2).not.toEqual(selectedByClass);
    expect(answer3).not.toEqual(correctByClass);
    expect(answer3).not.toEqual(selectedByClass);
  });

});
