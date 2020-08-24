import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { interval } from 'rxjs/internal/observable/interval';
import { fromEvent, Observable, noop, of, concat, merge } from 'rxjs';
import { createHttpObservable } from '../../utils';
import { map } from 'rxjs/operators';
import { Course } from '../model/course';
import { create } from 'domain';

@Component({
  selector: 'about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css'],
})
export class AboutComponent implements OnInit {
  baseUrl = 'http://localhost:9000';
  courses = '/api/courses';
  constructor() {}

  ngOnInit() {
    // concat example
    // const source1$ = of(1, 2, 3);
    // const source2$ = of(4, 5, 6);
    // const source3$ = of(7, 8, 9);
    // concat(source1$, source2$, source3$).subscribe(console.log);
    //merge example
    // const interval1$ = interval(1000);
    // const interval2$ = interval(2000).pipe(map(val => val * 10));
    // merge(interval1$, interval2$).subscribe(console.log);
    // cancellable observable
    // const interval1$ = interval(1000);
    // const sub = interval1$.subscribe(console.log);
    // setTimeout(() => {
    //   sub.unsubscribe();
    // }, 5000);
    //Try cancellable http observable

    const http$ = createHttpObservable('/api/courses');
    const sub = http$.subscribe(console.log);
    setTimeout(() => {
      sub.unsubscribe();
    }, 0);
  }
}
