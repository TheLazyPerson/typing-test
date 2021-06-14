import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Test } from 'src/app/shared/models/test.model';
import { TestService } from 'src/app/shared/services/test.service';

@Component({
  selector: 'app-countdown',
  templateUrl: './countdown.component.html',
  styleUrls: ['./countdown.component.scss']
})
export class CountdownComponent implements OnInit {

  seconds: number = 0;
  @Output() complete: EventEmitter<string> = new EventEmitter<string>()

  constructor(testService: TestService) {
    testService.currentTest.subscribe(test => this.seconds = test.time);

  }

  ngOnInit(): void {
  }

}
