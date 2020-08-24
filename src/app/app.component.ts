import { Component } from "@angular/core";
import { interval, timer, fromEvent, Observable, noop } from "rxjs";
import { shareReplay, map } from "rxjs/operators";
import { createHttpObservable } from "../utils";
import { Course } from "./model/course";

interface T {
  payload: object;
}

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent {
  title = "app";
  num = 0;
  ngOnInit() {
    const http$ = createHttpObservable("/api/courses");
    const courses$ = http$.pipe(
      map((value: T) => <Course[]>Object.values(value.payload))
    );
    courses$.subscribe(console.log, noop, () => {
      console.log("Completed");
    });
  }
}
