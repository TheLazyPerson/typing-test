import { Component,  OnInit, Output, EventEmitter } from '@angular/core';
import { interval,  Observable } from 'rxjs';
import { takeWhile } from 'rxjs/operators';
import { TestService } from 'src/app/shared/services/test.service';


@Component({
  selector: 'app-countdown',
  templateUrl: './countdown.component.html',
  styleUrls: ['./countdown.component.scss']
})
export class CountdownComponent implements OnInit {

  seconds: number = 0;
  secondsToShow: number = 0;
  minutes: number = 0;

  @Output() complete: EventEmitter<string> = new EventEmitter<string>()

  constructor(private testService: TestService) {
    testService.currentTest.subscribe(test => this.seconds = test.time);
    this.transform(this.seconds);
  }

  transform(value: number): void {
    const minutes: number = Math.floor(value / 60);
    this.minutes = minutes;
    this.secondsToShow = (value - minutes * 60);
  }


  ngOnInit(): void {
    var countdown: Observable<number> = interval(1000);
    countdown.pipe(takeWhile(() => this.seconds > 0)).subscribe(() => {
      this.seconds = this.seconds - 1;
      this.testService.setTime(this.seconds);
      this.transform(this.seconds);

    },
      (err) => {
        console.log("ERROR", err);
      },
      () => {
        this.complete.emit("complete");
    });

  }

}
