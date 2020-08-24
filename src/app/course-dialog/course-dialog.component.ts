import {
  AfterViewInit,
  Component,
  ElementRef,
  Inject,
  OnInit,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Course } from '../model/course';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import * as moment from 'moment';
import { fromEvent } from 'rxjs';
import {
  concatMap,
  distinctUntilChanged,
  exhaustMap,
  filter,
  mergeMap,
} from 'rxjs/operators';
import { fromPromise } from 'rxjs/internal-compatibility';
import { throwToolbarMixedModesError } from '@angular/material/toolbar';
import { saveCourse } from '../../../server/save-course.route';

@Component({
  selector: 'course-dialog',
  templateUrl: './course-dialog.component.html',
  styleUrls: ['./course-dialog.component.css'],
})
export class CourseDialogComponent implements OnInit, AfterViewInit {
  form: FormGroup;
  course: Course;

  @ViewChild('saveButton', { static: true }) saveButton: ElementRef;

  @ViewChild('searchInput', { static: true }) searchInput: ElementRef;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<CourseDialogComponent>,
    @Inject(MAT_DIALOG_DATA) course: Course
  ) {
    this.course = course;

    this.form = fb.group({
      description: [course.description, Validators.required],
      category: [course.category, Validators.required],
      releasedAt: [moment(), Validators.required],
      longDescription: [course.longDescription, Validators.required],
    });
  }

  ngOnInit() {
    // this.form.valueChanges
    //   .pipe(
    //     filter(() => this.form.valid),
    //     concatMap(changes => this.saveCourse(changes))
    //     // saves will hapeen sequentially, check this in the waterfall in the network tab in chrome devtools
    //   )
    //   .subscribe();

    this.form.valueChanges
      .pipe(
        filter(() => this.form.valid),
        mergeMap(changes => this.saveCourse(changes))
        // saves will hapeen in parallel, check this in the waterfall in the network tab in chrome devtools
      )
      .subscribe();
  }

  ngAfterViewInit() {
    fromEvent(this.saveButton.nativeElement, 'click')
      .pipe(exhaustMap(() => this.saveCourse(this.form.value)))
      .subscribe();
  }

  saveCourse(changes: any) {
    return fromPromise(
      fetch(`/api/courses/${this.course.id}`, {
        method: 'PUT',
        body: JSON.stringify(changes),
        headers: {
          'content-type': 'application/json',
        },
      })
    );
  }

  close() {
    this.dialogRef.close();
  }
}
