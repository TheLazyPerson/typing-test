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
      let result: Array<object> = [ ];
      let score = 0;
      let typos = 0;
      let totalScore = 0;
      let wpm = 0;
      totalScore = (textArray.length * 10);
      textArray.forEach((element, index) => {
        let isTypo: boolean = false;
        let state: "" | "typo" | "missing" = "";
        let matchType:string = "";

        //cases
        // 2. If the word is a perfect match with punctuation and case
        // 3. If the word is match without case,
        // 4. If the word is match without punctuation
        // 5. if the word is a complete miss match
        // 6. If the word is does not match and matches the next word

        if (index >= typedArray.length) {
          return false;
        }
        if (typedArray[index] === undefined) {
          throw new Error("Invalid");
        }
        // If the word is a perfect match with punctuation and case
        if (
          element === typedArray[index]
        ) {
          matchType = "perfect-match-with-punctuation";
        }
        // If the word is match without case
        else if (
          element.toLowerCase() === typedArray[index].toLowerCase()
        ) {
          matchType = "match-without-case";
        }
        // If the word is match without punctuation and lower cased
        else if(
           element.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "").toLowerCase() === typedArray[index]
        ) {
          matchType = "perfect-match-without-punctuation";
        }

        // if the word is a complete miss match
        else if(
           element.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "").toLowerCase() !== typedArray[index].toLowerCase()
        ) {
          matchType = "total-mismatch";
          // if the current element is not a match and next one is then missinng
          if (
            textArray[index + 1] !== undefined
            && typedArray[index].replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "").toLowerCase() === textArray[index + 1].replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "").toLowerCase()
          ) {
              matchType = "next-word-matched";
              typedArray.splice(index, 0, "__");
          }
        }
         // Hard
        //Case sensitive and does not allow any mistakes.
        if (
          this.test.difficulty === "hard"
          && matchType !== "perfect-match-with-punctuation"
          && matchType !== "next-word-matched"
        ) {
          isTypo = true;
          state = "typo";
        } else if(matchType === "next-word-matched"){
          isTypo = true;
          state = "missing";
        }
        // Medium
        // Case sensitive, allows you to miss one word.
        if (
          this.test.difficulty === "medium"
          && matchType !== "perfect-match-with-punctuation"
          && matchType !== "next-word-matched"
        ) {
          isTypo = true;
          state = "typo";
        } else if (matchType === "next-word-matched") {
          isTypo = false;
          state = "";
        }

        // Easy
        // Case insensitive, allows you to miss one word, and punctuation marks.
        if (
          this.test.difficulty === "easy"
          && matchType !== "perfect-match-with-punctuation"
          && matchType !== "match-without-case"
          && matchType !== "perfect-match-without-punctuation"
          && matchType !== "next-word-matched"
        ) {
          isTypo = true;
          state = "typo";
        } else if (matchType === "next-word-matched") {
          isTypo = true;
          state = "missing";
        }

        result.push({
            value: typedArray[index], state: state, matchType: matchType
        });
        if (!isTypo) {

          score += 10;
        } else {
          score -= 5;
          typos++;
        }
      });

      score = score < 0 ? 0 : score;
      wpm = Math.floor(score === 0 ? 0 : score / 10);
      this.test.typed = typedArray.join(" ");
      this.testService.setTest(this.test);
      this.testService.setResult(result);

      this.testService.setScore(score, typos, totalScore, wpm);
      this.testService.setStatus("complete");

    }
  }

}
