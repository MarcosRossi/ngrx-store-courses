import { Component, OnInit } from '@angular/core';
import { compareCourses, Course } from '../model/course';
import { Observable } from 'rxjs';
import { defaultDialogConfig } from '../shared/default-dialog-config';
import { EditCourseDialogComponent } from '../edit-course-dialog/edit-course-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { map, shareReplay } from 'rxjs/operators';
import { CoursesHttpService } from '../services/courses-http.service';
import { select, Store } from '@ngrx/store';
import { AppState } from '../../reducers';
import { selectAdvancedCourses, selectBeginnerCourses, selectPromoTotal } from '../courses.selectors';



@Component({
  // tslint:disable-next-line: component-selector
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  promoTotal$: Observable<number>;
  beginnerCourses$: Observable<Course[]>;
  advancedCourses$: Observable<Course[]>;

  constructor(
    private dialog: MatDialog,
    private store: Store<AppState>) { }

  ngOnInit() {
    this.reload();
  }

  reload() {
    this.beginnerCourses$ = this.store.select(selectBeginnerCourses);
    // this.beginnerCourses$ = courses$
    //   .pipe(
    //     map(courses => courses.filter(course => course.category === 'BEGINNER'))
    //   );

    this.advancedCourses$ = this.store.select(selectAdvancedCourses);
    // this.advancedCourses$ = courses$
    //   .pipe(
    //     map(courses => courses.filter(course => course.category === 'ADVANCED'))
    //   );
    this.promoTotal$ = this.store.select(selectPromoTotal);
    // this.promoTotal$ = courses$
    //   .pipe(
    //     map(courses => courses.filter(course => course.promo).length)
    //   );

  }

  onAddCourse() {
    const dialogConfig = defaultDialogConfig();
    dialogConfig.data = {
      dialogTitle: 'Create Course',
      mode: 'create'
    };
    this.dialog.open(EditCourseDialogComponent, dialogConfig);
  }
}
