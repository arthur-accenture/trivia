import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TriviaOptions } from '../core/models';

import { TriviaOptionsComponent } from './trivia-options.component';
import { By } from '@angular/platform-browser';
import { TriviaService } from '../core/services';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('TriviaOptionsComponent', () => {
  let component: TriviaOptionsComponent;
  let fixture: ComponentFixture<TriviaOptionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TriviaOptionsComponent],
      imports: [
        FormsModule,
        HttpClientTestingModule
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

  it('should bind amount property with input with name "options-number"', () => {
    // When stable makes sure test is run after:
    // 1) Bindings are ready
    // 2) Any default values are loaded
    fixture.whenStable().then(() => {
      const TEST_VALUE_1 = 30;
      const control = fixture.debugElement.query(By.css('.question-number'));
      const element = control.nativeElement;
      element.value = TEST_VALUE_1;
      element.dispatchEvent(new Event('input'));
      expect(component.options.amount).toBe(TEST_VALUE_1);

      // Put in a second update for good measure
      const TEST_VALUE_2 = 50;
      element.value = TEST_VALUE_2;
      element.dispatchEvent(new Event('input'));
      expect(component.options.amount).toBe(TEST_VALUE_2);
    }).catch(error => {
      expect(error).toBeFalsy();
    });
  });

  it('should bind difficulty with the radios named "options-difficulty"', () => {
    fixture.whenStable().then(() => {
      // Initial value should be nothing
      expect(component.options.difficulty).toBeFalsy();
      const TEST_VALUE = 'easy';
      const control = fixture.debugElement.query(By.css(`.options-difficulty input[value=${TEST_VALUE}]`));
      const element = control.nativeElement;
      element.dispatchEvent(new Event('change'));
      expect(component.options.difficulty).toBe(TEST_VALUE);
    }).catch(error => {
      expect(error).toBeFalsy();
    });
  });

  it('should bind category with the select named "options-category"', () => {
    fixture.whenStable().then(() => {
      expect(component.options.category).toBeFalsy();

      const control = fixture.debugElement.query(By.css('select[name=options-category]'));
      const element = control.nativeElement;

      const TEST_VALUE = element.querySelector('option:last-child').value; // Get last option in select
      element.value = TEST_VALUE;
      element.dispatchEvent(new Event('change'));
      expect(component.options.category).toBe(TEST_VALUE);
    }).catch(error => {
      expect(error).toBeFalsy();
    });
  });

  it('should bind type with the select named "options-type"', () => {
    fixture.whenStable().then(() => {
      expect(component.options.type).toBeFalsy();

      const control = fixture.debugElement.query(By.css('select[name=options-type]'));
      const element = control.nativeElement;

      const TEST_VALUE = element.querySelector('option:last-child').value; // Get last option in select
      element.value = TEST_VALUE;
      element.dispatchEvent(new Event('change'));
      expect(component.options.type).toBe(TEST_VALUE);
    }).catch(error => {
      expect(error).toBeFalsy();
    });
  });

  it('should invoke getOptions() method when "generate questions" button is pressed', ()  =>  {
    fixture.whenStable().then(()  =>  {
      spyOn(component,  'getOptions');

      const  buttonControl  =  fixture.debugElement.query(By.css('.get-questions'));
      const  buttonElement  =  buttonControl.nativeElement;

      buttonElement.click();
      expect(component.getOptions).toHaveBeenCalledTimes(1);

      // Test a second button press for repeat call:
      buttonElement.click();
      expect(component.getOptions).toHaveBeenCalledTimes(2);

    }).catch(error  =>  {
      expect(error).toBeFalsy();
    });
  });

  it('should emit the trivia options when getOptions is called', () => {
    // Spy on our event emitter
    spyOn(component.optionsModel, 'emit');

    // Load in some options to test
    component.options.amount = 100;
    component.options.category = 'Test category';

    // Call function that emits event
    component.getOptions();

    expect(component.optionsModel.emit).toHaveBeenCalledWith(component.options);
  });
});
