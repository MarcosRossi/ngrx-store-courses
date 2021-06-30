import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import { CourseAction } from '../action-types';
import { compareCourses, Course } from '../model/course';

export interface CoursesState extends EntityState<Course> {
    allCoursesLoaded: boolean;
    // (1) forma course: Course[];
    // (2) forma
    // ids: number[];
    // entities: { [key: number]: Course };
    // (3) forma y mejor
    // extends EntityState<Course> que ya agrega lo anterior.
}


export const adapter = createEntityAdapter<Course>({
    sortComparer: compareCourses,
    // selectId: course => course.courseId
});

export const initialCoursestate = adapter.getInitialState({
    allCoursesLoaded: false
});


export const coursesReducer = createReducer(
    initialCoursestate,
    on(CourseAction.allCoursesLoaded, (state, action) =>
        adapter.addAll(
            action.courses,
            { ...state, allCoursesLoaded: true }
        )
    ),
    on(CourseAction.courseUpdated, (state, action) =>
        adapter.updateOne(action.update, state)
    )
);

export const { selectAll } = adapter.getSelectors();
