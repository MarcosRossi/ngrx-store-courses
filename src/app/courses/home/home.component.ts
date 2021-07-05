import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
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
import { CourseEntityService } from '../services/course-entity.service';
import { changeSetItemFactory } from '@ngrx/data';



@Component({
  // tslint:disable-next-line: component-selector
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent implements OnInit {
  promoTotal$: Observable<number>;
  beginnerCourses$: Observable<Course[]>;
  advancedCourses$: Observable<Course[]>;

  constructor(
    private dialog: MatDialog,
    private store: Store<AppState>,
    private courseService: CourseEntityService) { }

  ngOnInit() {
    this.reload();
  }

  reload() {
    // ngrx Data
    this.beginnerCourses$ = this.courseService.entities$
      .pipe(
        map(courses => courses.filter(c => c.category === 'BEGINNER'))
      );
    // ngrx Entity
    // this.beginnerCourses$ = this.store.select(selectBeginnerCourses);
    // services comun
    // this.beginnerCourses$ = courses$
    //   .pipe(
    //     map(courses => courses.filter(course => course.category === 'BEGINNER'))
    //   );

    // ngrx Data
    this.advancedCourses$ = this.courseService.entities$
      .pipe(
        map(courses => courses.filter(course => course.category === 'ADVANCED'))
      );

    // ngrx Entity
    // this.advancedCourses$ = this.store.select(selectAdvancedCourses);
    // services comun
    // this.advancedCourses$ = courses$
    //   .pipe(
    //     map(courses => courses.filter(course => course.category === 'ADVANCED'))
    //   );

    // ngrx Data
    this.promoTotal$ = this.courseService.entities$
      .pipe(
        map(courses => courses.filter(course => course.promo).length)
      );

    // ngrx Entity
    // this.promoTotal$ = this.store.select(selectPromoTotal);
    // services comun
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
