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

  //Case sensitive and does not allow any mistakes.
  //Hard

// Case sensitive, allows you to miss one word.
// Medium

// Case insensitive, allows you to miss one word, and punctuation marks.
// Easy
  calculateScore(event) {
    if (event === "complete") {
      let typedArray = this.test.typed.split(' ');
      let textArray = this.test.text.split(' ');
      let score = 0;
      let typos = 0;
      let totalScore = 0;
      let wpm = 0;
      totalScore = (textArray.length * 10);
      typedArray.forEach((element, index) => {
        if (element === textArray[index] && textArray[index] !== undefined) {
          score += 10;
        } else {
          score -= 5;
          typos++;
        }
      });
      score = score < 0 ? 0 : score;
      wpm = Math.floor(score === 0 ? 0 : score / 10);
      this.testService.setScore(score, typos, totalScore, wpm);
      this.testService.setStatus("complete");

    }
  }

}
