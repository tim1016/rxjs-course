import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { interval } from "rxjs/internal/observable/interval";
import { fromEvent, Observable, noop } from "rxjs";
import { createHttpObservable } from "../../utils";

@Component({
  selector: "about",
  templateUrl: "./about.component.html",
  styleUrls: ["./about.component.css"],
})
export class AboutComponent implements OnInit {
  baseUrl = "http://localhost:9000";
  courses = "/api/courses";
  constructor() {}

  ngOnInit() {
    const http$ = createHttpObservable(this.courses);

    http$.subscribe(console.log);
  }
}
