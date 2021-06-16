import { Component, OnInit } from '@angular/core';
import { Test } from 'src/app/shared/models/test.model';
import { TestService } from 'src/app/shared/services/test.service';

@Component({
  selector: 'app-testing-area',
  templateUrl: './testing-area.component.html',
  styleUrls: ['./testing-area.component.scss']
})
export class TestingAreaComponent implements OnInit {

  typed: string;
  test: Test;
  constructor(private testService: TestService) {
    testService.currentTest.subscribe(test => this.test = test);
  }

  ngOnInit(): void {
  }

  updateTyped(event: any) {
    this.test.typed = this.typed;
    this.testService.setTest(this.test);
  }
}
