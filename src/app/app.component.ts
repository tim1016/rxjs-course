import { Component } from "@angular/core";
import { interval, timer, fromEvent } from "rxjs";
import { shareReplay } from "rxjs/operators";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent {
  title = "app";
  num = 0;
  ngOnInit() {
    const interval$ = timer(3000, 1000);

    const sub = interval$.subscribe((val) => {
      console.log(`Stream 1 : ${val}`);
    });

    const click$ = fromEvent(document, "click");

    click$.subscribe(
      (event) => {
        console.log(event);
      },
      (error) => {
        console.log(error);
      },
      () => {
        console.log("completed");
      }
    );

    setTimeout(() => {
      sub.unsubscribe();
    }, 16000);
  }
}
