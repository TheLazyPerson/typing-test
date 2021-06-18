import { Component, OnInit } from '@angular/core';
import { Test } from 'src/app/shared/models/test.model';
import { TestService } from 'src/app/shared/services/test.service';


@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  test: Test;
  constructor(private testService: TestService) { }

  ngOnInit(): void {
    this.testService.currentTest.subscribe(test => this.test = test);
  }

  calculateScore(event) {
    if (event === "complete") {
      let typedArray = this.test.typed.split(' ');
      let textArray = this.test.text.split(' ');
      let score = 0;
      let typos = 0;
      typedArray.forEach((element, index) => {
        if (element === textArray[index] && textArray[index] !== undefined) {
          score += 10;
        } else {
          score -= 5;
          typos++;
        }
      });
      this.testService.setScore(score, typos);
      this.testService.setStatus("complete");

      console.log("Total Score", score);


    }
  }

}
