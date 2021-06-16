import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Test } from 'src/app/shared/models/test.model';
import { TestService } from 'src/app/shared/services/test.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  test: Test;
  @Output() countdownComplete: EventEmitter<string> = new EventEmitter<string>();

  constructor(testService: TestService) {
    testService.currentTest.subscribe(test => this.test = test);
  }

  ngOnInit(): void {
  }

  testOver(event) {
    this.countdownComplete.emit(event);
  }

}
