import { Component, OnInit } from '@angular/core';
import { Course } from '../model/course';
import { interval, Observable, of, timer, noop, throwError } from 'rxjs';
import {
  catchError,
  delayWhen,
  map,
  retryWhen,
  shareReplay,
  tap,
  filter,
  finalize,
  debounceTime,
} from 'rxjs/operators';
import { createHttpObservable } from '../../utils';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  beginnerCourses$: Observable<Course[]>;
  advancedCourses$: Observable<Course[]>;

  constructor() {}

  ngOnInit() {
    const http$ = createHttpObservable('/api/courses');
    const courses$ = http$.pipe(
      map(res => <Course[]>Object.values(res['payload'])),
      shareReplay(),
      retryWhen(errors => errors.pipe(delayWhen(() => timer(2000))))
    );
    // const courses$ = http$.pipe(
    //   catchError(err => {
    //     // console.log('Error occured' + err);
    //     return throwError(err);
    //     // of([]) // this is recovery observable strategy
    //   }),
    //   finalize(() => {
    //     console.log('finalize');
    //   }),
    //   map(res => <Course[]>Object.values(res['payload'])),
    //   shareReplay()
    // );

    this.beginnerCourses$ = courses$.pipe(
      map(courses => {
        return courses.filter(course => course.category === 'BEGINNER');
      })
    );
    this.advancedCourses$ = courses$.pipe(
      map(courses => {
        return courses.filter(course => course.category === 'ADVANCED');
      })
    );
  }
}
