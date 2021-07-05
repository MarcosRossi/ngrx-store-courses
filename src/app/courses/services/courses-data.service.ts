import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DefaultDataService, HttpUrlGenerator } from '@ngrx/data';
import { Update } from '@ngrx/entity';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { Course } from '../model/course';

@Injectable()
export class CoursesDataService extends DefaultDataService<Course> {
    apiurL = environment.apiUrl;
    constructor(http: HttpClient,
        httpUrlGenerator: HttpUrlGenerator) {
        super('Course', http, httpUrlGenerator, { root: environment.apiUrl });
    }

    getAll(): Observable<Course[]> {
        return this.http.get(`${this.apiurL}/courses`)
            .pipe(
                tap(resp => { console.log(resp['payload']); return resp; }),
                map(resp => resp['payload'])
            );
    }

    // update(update: Update<Course>): Observable<Course> {
    //     return this.http.put<Course>(`http://localhost:9000/api/course/${update.id}`, update.changes)
    //         .pipe(
    //             tap(resp => console.log('SQL', resp)),
    //             map(resp => resp['payload'])
    //         );
    // }

    // add(entity: Course): Observable<Course> {
    //     return this.http.post<Course>('http://localhost:9000/api/course/', entity);
    // }
}
