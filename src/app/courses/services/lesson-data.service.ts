import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DefaultDataService, HttpUrlGenerator } from '@ngrx/data';
import { environment } from '../../../environments/environment';
import { Course } from '../model/course';

@Injectable()
export class LessonsDataService extends DefaultDataService<Course> {
    apiurL = environment.apiUrl;
    constructor(http: HttpClient,
        httpUrlGenerator: HttpUrlGenerator) {
        super('Lesson', http, httpUrlGenerator, { root: environment.apiUrl });
    }
}
