import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { CoursesCardListComponent } from './courses-card-list/courses-card-list.component';
import { EditCourseDialogComponent } from './edit-course-dialog/edit-course-dialog.component';
import { CoursesHttpService } from './services/courses-http.service';
import { CourseComponent } from './course/course.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { ReactiveFormsModule } from '@angular/forms';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule, Routes } from '@angular/router';
import { EntityDataService, EntityDefinitionService, EntityMetadataMap } from '@ngrx/data';
import { compareCourses, Course } from './model/course';

import { compareLessons, Lesson } from './model/lesson';
import { CoursesResolver } from './courses.resolver';
import { EffectsModule } from '@ngrx/effects';
import { CoursesEffects } from './courses.effects';
import { StoreModule } from '@ngrx/store';
import { coursesReducer } from './reducers/courses.reducers';
import { CourseEntityService } from './services/course-entity.service';
import { CourseResolver } from './services/course.resolver';
import { CoursesDataService } from './services/courses-data.service';
import { LessonEntityService } from './services/lesson-entity.-service';
import { LessonsDataService } from './services/lesson-data.service';


export const coursesRoutes: Routes = [
  {
    path: '',
    component: HomeComponent,
    resolve: {
      // courses: CoursesResolver
      courses: CourseResolver
    }
  },
  {
    path: ':courseUrl',
    component: CourseComponent
  }
];

const entityMetadata: EntityMetadataMap = {
  Course: {
    sortComparer: compareCourses,
    // optimistics (Actualiza instaneo la UI a pesar que el BE esta en pending para update.)
    entityDispatcherOptions: {
      optimisticUpdate: true
    }
  },
  Lesson: {
    sortComparer: compareLessons
  }
};
@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatTabsModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatProgressSpinnerModule,
    MatSlideToggleModule,
    MatDialogModule,
    MatSelectModule,
    MatDatepickerModule,
    MatMomentDateModule,
    ReactiveFormsModule,
    RouterModule.forChild(coursesRoutes),
    EffectsModule.forFeature([CoursesEffects]),
    StoreModule.forFeature('courses', coursesReducer)
  ],
  declarations: [
    HomeComponent,
    CoursesCardListComponent,
    EditCourseDialogComponent,
    CourseComponent
  ],
  exports: [
    HomeComponent,
    CoursesCardListComponent,
    EditCourseDialogComponent,
    CourseComponent
  ],
  entryComponents: [EditCourseDialogComponent],
  providers: [
    CoursesHttpService,
    // ngrx entity data service
    CourseEntityService,
    LessonEntityService,
    // CoursesResolver,
    CourseResolver,
    CoursesDataService,
    LessonsDataService
  ]
})
export class CoursesModule {

  constructor(
    private eds: EntityDefinitionService,
    private entityDataService: EntityDataService,
    private courseDataService: CoursesDataService,
    private lessonsDataService: LessonsDataService) {
    eds.registerMetadataMap(entityMetadata);
    // no usar el por default behiveour
    entityDataService.registerService('Course', courseDataService);
    entityDataService.registerService('Lesson', lessonsDataService);
  }
}
