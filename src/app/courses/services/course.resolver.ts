import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, first, map, tap } from 'rxjs/operators';
import { CourseEntityService } from './course-entity.service';

@Injectable()
export class CourseResolver implements Resolve<boolean>   {

    constructor(private courseService: CourseEntityService) { }

    resolve(route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
        return this.courseService.loaded$
            .pipe(
                tap(loaded => {
                    if (!loaded) {
                        this.courseService.getAll();
                    }
                }),
                filter(loaded => !!loaded),
                first()
            );
        // return this.courseService.getAll()
        // .pipe(
        //     map(courses => !!courses)
        // );
    }

}
