import { Injectable } from '@angular/core';
import { BehaviorSubject, interval, Observable } from 'rxjs';
import { Test } from '../models/test.model';
import { v4 as uuidv4 } from 'uuid';

@Injectable({
  providedIn: 'root'
})
export class TestService {
  private currentTestSubject: BehaviorSubject<Test>;
  public currentTest: Observable<Test>;
  private test: Test;
  constructor() {
    this.currentTestSubject = new BehaviorSubject<Test>(
      this.generate()
    );
    this.currentTest = this.currentTestSubject.asObservable();
    this.currentTest.subscribe((test: Test) => this.test = test);
  }

  generate(): Test {
    return {
      text: '',
      timeInMinutes: 0,
      difficulty: 'none',
      score: 0,
      totalTypedWords: 0,
      typos: 0,
      time: 0,
      typed: '',
      status: 'none'
    };
  }

  startTest(timeInMinutes: number, difficulty: 'easy' | 'medium' | 'hard') {
    this.currentTestSubject.next({
      text: this.getRandomParagraph(),
      timeInMinutes: timeInMinutes,
      difficulty: difficulty,
      score: 0,
      totalTypedWords: 0,
      typos: 0,
      time: (timeInMinutes * 60),
      typed: '',
      status: 'ongoing'
    });
  }

  getRandomParagraph() {
    let paragraphs = [
      "She tried to explain that love wasn't like pie. There wasn't a set number of slices to be given out. There wasn't less to be given to one person if you wanted to give more to another. That after a set amount was given out it would all disappear. She tried to explain this, but it fell on deaf ears.",

      "She's asked the question so many times that she barely listened to the answers anymore. The answers were always the same. Well, not exactly the same, but the same in a general sense. A more accurate description was the answers never surprised her. So, she asked for the 10,000th time, What's your favorite animal? But this time was different. When she heard the young boy's answer, she wondered if she had heard him correctly.",

      "Sitting in the sun, away from everyone who had done him harm in the past, he quietly listened to those who roamed by. He felt at peace in the moment, hoping it would last, but knowing the reprieve would soon come to an end. He closed his eyes, the sun beating down on face and he smiled. He smiled for the first time in as long as he could remember."
    ];
    //TODO: update the paragraph geneartor
    return paragraphs[Math.floor(Math.random() * paragraphs.length)];

  }

  update(test: Test) {
    this.currentTestSubject.next(test);
  }

  setTime(time: number) {
    this.test.time = time;
    this.currentTestSubject.next(this.test);
  }

  setScore(score: number, typos: number) {

  }


}
