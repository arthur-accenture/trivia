import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TriviaOptions } from '../core/models';

import { TriviaOptionsComponent } from './trivia-options.component';
import { By } from '@angular/platform-browser';

describe('TriviaOptionsComponent', () => {
  let component: TriviaOptionsComponent;
  let fixture: ComponentFixture<TriviaOptionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TriviaOptionsComponent],
      imports: [
        FormsModule
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TriviaOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should bind numOfQuestions property with input with name "options-number"', () => {
    // When stable makes sure test is run after:
    // 1) Bindings are ready
    // 2) Any default values are loaded
    fixture.whenStable().then(() => {
      const TEST_VALUE_1 = 30;
      let control = fixture.debugElement.query(By.css('.question-number'));
      let element = control.nativeElement;
      element.value = TEST_VALUE_1;
      element.dispatchEvent(new Event('input'));
      expect(component.options.numQuestions).toBe(TEST_VALUE_1);

      // Put in a second update for good measure
      const TEST_VALUE_2 = 50
      element.value = TEST_VALUE_2;
      element.dispatchEvent(new Event('input'));
      expect(component.options.numQuestions).toBe(TEST_VALUE_2);
    }).catch(error => {
      expect(error).toBeFalsy();
    });;
  });

  it('should bind difficulty with the checkboxes named "options-difficulty"', () => {
    // When stable makes sure test is run after:
    // 1) Bindings are ready
    // 2) Any default values are loaded
    fixture.whenStable().then(() => {
      // Before we start, value should be nothing
      expect(component.options.difficulty).toBeFalsy();
      const TEST_VALUE = 'easy';
      let control = fixture.debugElement.query(By.css(`.options-difficulty input[value=${TEST_VALUE}]`));
      let element = control.nativeElement;
      element.dispatchEvent(new Event('change'));
      expect(component.options.difficulty).toBe(TEST_VALUE);
    }).catch(error => {
      expect(error).toBeFalsy();
    });
  });

  it('should bind category with the select named "options-category"', () => {
    // When stable makes sure test is run after:
    // 1) Bindings are ready
    // 2) Any default values are loaded
    fixture.whenStable().then(() => {
      expect(component.options.category).toBeFalsy();
  
      let control = fixture.debugElement.query(By.css('select[name=options-category]'));
      let element = control.nativeElement;

      const TEST_VALUE = element.querySelector('option:last-child').value; // Get last option in select
      element.value = TEST_VALUE;
      element.dispatchEvent(new Event('change'));
      expect(component.options.category).toBe(TEST_VALUE);
    }).catch(error => {
      expect(error).toBeFalsy();
    });
  });

  it('should bind type with the select named "options-type"', () => {
    // When stable makes sure test is run after:
    // 1) Bindings are ready
    // 2) Any default values are loaded
    fixture.whenStable().then(() => {
      expect(component.options.questionType).toBeFalsy();
  
      let control = fixture.debugElement.query(By.css('select[name=options-type]'));
      let element = control.nativeElement;

      const TEST_VALUE = element.querySelector('option:last-child').value; // Get last option in select
      element.value = TEST_VALUE;
      element.dispatchEvent(new Event('change'));
      expect(component.options.questionType).toBe(TEST_VALUE);
    }).catch(error => {
      expect(error).toBeFalsy();
    });
  });
});
