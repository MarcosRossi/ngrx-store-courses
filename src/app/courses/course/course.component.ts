import { AfterViewInit, ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Course } from '../model/course';
import { Observable, of } from 'rxjs';
import { Lesson } from '../model/lesson';
import { concatMap, delay, filter, first, map, shareReplay, tap, withLatestFrom } from 'rxjs/operators';
import { CoursesHttpService } from '../services/courses-http.service';
import { CourseEntityService } from '../services/course-entity.service';
import { LessonEntityService } from '../services/lesson-entity.-service';


@Component({
  // tslint:disable-next-line: component-selector
  selector: 'course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CourseComponent implements OnInit {

  course$: Observable<Course>;

  lessons$: Observable<Lesson[]>;

  loading$: Observable<boolean>;

  displayedColumns = ['seqNo', 'description', 'duration'];

  nextPage = 0;

  constructor(
    // private coursesService: CoursesHttpService,
    private courseEntityService: CourseEntityService,
    private lessonEntityService: LessonEntityService,
    private route: ActivatedRoute) {

  }

  ngOnInit() {

    const courseUrl = this.route.snapshot.paramMap.get('courseUrl');
    // common service
    // this.course$ = this.coursesService.findCourseByUrl(courseUrl);

    // ngrx data
    this.course$ = this.courseEntityService.entities$
      .pipe(
        map(courses => courses.find(course => course.url === courseUrl))
      );

    // common service
    // this.lessons$ = this.course$.pipe(
    //   concatMap(course => this.coursesService.findLessons(course.id)),
    //   tap(console.log)
    // );

    this.lessons$ = this.lessonEntityService.entities$
      .pipe(
        withLatestFrom(this.course$),
        tap(([lessons, course]) => {
          if (this.nextPage === 0) {
            this.loadLessonsPage(course);
          }
        }),
        map(([lessons, course]) => lessons.filter(l => l.courseId === course.id))
      );

    this.loading$ = this.lessonEntityService.loading$.pipe(delay(0));
  }


  loadLessonsPage(course: Course) {
    this.lessonEntityService.getWithQuery({
      'courseId': course.id.toString(),
      'pageNumber': this.nextPage.toString(),
      'pageSize': '3'
    });
    this.nextPage += 1;
  }

}
