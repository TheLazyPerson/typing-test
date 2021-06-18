import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Test } from 'src/app/shared/models/test.model';
import { TestService } from 'src/app/shared/services/test.service';


export class Option {
  value: string;
  text: string;
}
@Component({
  selector: 'app-start-test-form',
  templateUrl: './start-test-form.component.html',
  styleUrls: ['./start-test-form.component.scss']
})
export class StartTestFormComponent implements OnInit {
  isSubmitted: boolean = false;
  startTestForm: FormGroup;
  timeOptions: Option[];
  difficultyOptions: Option[];
  loading: boolean = false;
  test: Test;
  constructor(private formBuilder: FormBuilder, private testService: TestService) {
    this.timeOptions = [
      { value: '1', text: "1 Minute" },
      { value: '2', text: "2 Minute" },
      { value: '3', text: "3 Minute" },
      { value: '4', text: "4 Minute" },
      { value: '5', text: "5 Minute" },

    ];
    this.difficultyOptions = [
      { value: 'easy', text: "Easy" },
      { value: 'medium', text: "Medium" },
      { value: 'hard', text: "Hard" },
    ];

    this.startTestForm = this.formBuilder.group({
      time: [ "", [Validators.required] ],
      difficulty: [ "" , [Validators.required]],
    });
    this.testService.currentTest.subscribe(test => this.test = test);
  }

  ngOnInit(): void {
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.startTestForm.controls;
  }

  startTest() {
    if (this.startTestForm.invalid) {
      this.isSubmitted = false;
      return;
    }
    this.testService.startTest(this.f.time.value, this.f.difficulty.value);
  }
}
