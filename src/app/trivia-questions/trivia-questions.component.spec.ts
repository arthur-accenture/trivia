import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { TriviaQuestionsComponent } from './trivia-questions.component';

describe('TriviaQuestionsComponent', () => {
  let component: TriviaQuestionsComponent;
  let fixture: ComponentFixture<TriviaQuestionsComponent>;
  const mockQuestions = [{
    category: 'Science & Nature',
    type: 'multiple',
    difficulty: 'easy',
    question: 'What is the hottest planet in the Solar System?',
    correctAnswer: 'Venus',
    incorrectAnswers: ['Mars', 'Mercury', 'Jupiter'],
    selectedAnswer: '',
    allAnswers: ['Mars', 'Venus', 'Mercury', 'Jupiter'],
    questionId: '11111111-2222-3333-4444-555566667777'
  },
  {
    category: 'Mythology',
    type: 'multiple',
    difficulty: 'hard',
    question: 'Which Greek & Roman god was known as the god of music, truth and prophecy, healing, the sun and light, plague, poetry, and more?',
    correctAnswer: 'Apollo',
    incorrectAnswers: ['Aphrodite', 'Artemis', 'Athena'],
    selectedAnswer: '',
    allAnswers: ['Aphrodite', 'Artemis', 'Athena', 'Apollo'],
    questionId: '11111111-2222-3333-4444-555566668888'
  }];

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

    // Not doing expect(control).toBeFalsy() due to a bug
    // https://github.com/angular/angular/issues/14235
    expect(control == null).toBe(true);

    // Set model up for another test
    component.triviaQuestions = [mockQuestions[0]];

    // Test after model is ready
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

    component.triviaQuestions = mockQuestions;

    fixture.detectChanges();
    let inputControl2 = fixture.debugElement.queryAll(By.css('input[id="11111111-2222-3333-4444-555566668888-2"]'));
    let labelControl2 = fixture.debugElement.queryAll(By.css('label[for="11111111-2222-3333-4444-555566668888-2"]'));
    expect(inputControl2.length).toBe(1);
    expect(labelControl2.length).toBe(1);
  });

  it('should populate correctAnswers array when _triviaQuestions is set', () => {
    // Expect no trivia questions or correct answers
    expect(component.correctAnswers.size).toEqual(0);
    expect(component.triviaQuestions).toBeFalsy();

    // Expect when trivia questions returned, then correct answers are populated.
    component.triviaQuestions = mockQuestions;
    // Expect exact values of correctAnswers match our mock data.
    expect(component.correctAnswers.size).toEqual(2);
    expect(component.triviaQuestions).toBeTruthy();
    expect(component.correctAnswers.get('11111111-2222-3333-4444-555566667777')).toEqual('Venus');
    expect(component.correctAnswers.get('11111111-2222-3333-4444-555566668888')).toEqual('Apollo');

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

  it('should update the selectedAnswers Map when an answer is selected', () => {

    // Mock data to render button:
    component.triviaQuestions = mockQuestions;
    let firstId = mockQuestions[0].questionId;
    fixture.detectChanges();

    // Expect selectedAnswers to be hold key only:
    expect(component.selectedAnswers.size).toEqual(2);
    expect(component.selectedAnswers.has(firstId)).toBe(true);
    expect(component.selectedAnswers.get(firstId)).toBe('');

    // Expect selectedAnswers to update when answer selected:
    let radio = fixture.debugElement.query(By.css(`input[id="${firstId}-0"]`)); // First radio button
    let radioElement = radio.nativeElement;
    radioElement.click();

    expect(component.selectedAnswers.has(firstId)).toBe(true);
    expect(component.selectedAnswers.get(firstId)).toBe('Mars');

    // Now select another radio button on same question:
    let radio2 = fixture.debugElement.query(By.css(`input[id="${firstId}-1"]`)); // Second radio button
    let radioElement2 = radio2.nativeElement;
    radioElement2.click();

    expect(component.selectedAnswers.has(firstId)).toBe(true);
    expect(component.selectedAnswers.get(firstId)).not.toBe('Mars');
    expect(component.selectedAnswers.get(firstId)).toBe('Venus');

  });

  it('should update the scoreMap object when an answer is selected', () => {
    // correct indices: 1,3
    // Mock data to render button:
    component.triviaQuestions = mockQuestions;
    let firstId = mockQuestions[0].questionId;
    let secondId = mockQuestions[1].questionId;
    fixture.detectChanges();

    // Expect no scores yet:
    expect(component.scoreMap[firstId]).toBe(0);
    expect(component.scoreMap[secondId]).toBe(0);

    // Expect scores to be {1, 0} if first question correct only:
    let radio = fixture.debugElement.query(By.css(`input[id="${firstId}-1"]`)); // First question, correct answer ('Venus')
    let radioElement = radio.nativeElement;
    radioElement.click();

    let radio2 = fixture.debugElement.query(By.css(`input[id="${secondId}-1"]`)); // Second question, incorrect answer ('Artemis')
    let radioElement2 = radio2.nativeElement;
    radioElement2.click();

    expect(component.scoreMap[firstId]).toBe(1);
    expect(component.scoreMap[secondId]).toBe(0);

    // Expect scores to be {1, 1} if both questions correct:
    let radio3 = fixture.debugElement.query(By.css(`input[id="${firstId}-1"]`)); // First question, correct answer ('Venus')
    let radioElement3 = radio3.nativeElement;
    radioElement3.click();

    let radio4 = fixture.debugElement.query(By.css(`input[id="${secondId}-3"]`)); // Second question, correct answer ('Apollo')
    let radioElement4 = radio4.nativeElement;
    radioElement4.click();

    expect(component.scoreMap[firstId]).toBe(1);
    expect(component.scoreMap[secondId]).toBe(1);

    // Expect scores to go back to {0, 0} if both questions incorrect:
    let radio5 = fixture.debugElement.query(By.css(`input[id="${firstId}-2"]`)); // First question, incorrect answer ('Mercury')
    let radioElement5 = radio5.nativeElement;
    radioElement5.click();

    let radio6 = fixture.debugElement.query(By.css(`input[id="${secondId}-2"]`)); // Second question, incorrect answer ('Athena')
    let radioElement6 = radio6.nativeElement;
    radioElement6.click();

    expect(component.scoreMap[firstId]).toBe(0);
    expect(component.scoreMap[secondId]).toBe(0);

  });

  it('should calculate correct score when "check answers" button pressed', () => {

    // Mock some data to force check-answers button to render:
    component.triviaQuestions = mockQuestions;
    fixture.detectChanges();

    // Mock scores:
    component.scoreMap = {
      'firstID': 1,
      'secondID': 0,
      'thirdID': 1,
      'fourthID': 0,
      'fifthID': 1,
      'sixthID': 1,
      'seventhID': 1,
      'eighthID': 0,
      'ninethID': 1,
      'tenthID': 0,
    };

    expect(component.score).toEqual(0);
    expect(component.score).not.toEqual(6);

    let button = fixture.debugElement.query(By.css('button#check-answers-button')).nativeElement;
    button.click();

    expect(component.score).toEqual(6);
    expect(component.score).not.toEqual(0);

  });

  it('should only show score on screen after "check answers" button pressed', () => {

    // Mock some data to force check-answers button to render:
    component.triviaQuestions = mockQuestions;
    fixture.detectChanges();

    // Expect score not shown before "check answers":
    // error thrown when querying for null, so queryAll instead and expect empty result:
    let scoreElement = fixture.debugElement.queryAll(By.css('.score-wrapper'));
    expect(scoreElement.length).toBe(0);

    // Expect score to be shown after "check answers"
    let button = fixture.debugElement.query(By.css('button#check-answers-button')).nativeElement;
    button.click();
    fixture.detectChanges();

    let scoreElement2 = fixture.debugElement.queryAll(By.css('.score-wrapper'));
    expect(scoreElement2.length).toBe(1);

  });

  it('should apply correct-answer and selected-answer classes when "check answer" button is pressed', () => {

    // Mock some data to force check-answers button to render:
    component.triviaQuestions = [mockQuestions[0]];
    let firstId = mockQuestions[0].questionId;
    fixture.detectChanges();

    // Select an incorrect answer, then check answers:
    let radio0 = fixture.debugElement.query(By.css(`input[id="${firstId}-0"]`)).nativeElement; // First question, incorrect answer ('Mars')
    radio0.click();
    let checkAnswersButton = fixture.debugElement.query(By.css('button#check-answers-button')).nativeElement;
    checkAnswersButton.click();
    fixture.detectChanges();

    // expect correct-answer and selected-answer classes applied to the correct answers:
    // Identify answer directly, then find by class, and expect to be the same object:
    let answer0 = fixture.debugElement.query(By.css(`label[for="${firstId}-0"]`)).nativeElement; // Selected
    let answer1 = fixture.debugElement.query(By.css(`label[for="${firstId}-1"]`)).nativeElement; // Correct
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
