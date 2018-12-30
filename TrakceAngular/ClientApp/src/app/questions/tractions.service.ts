import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Questions } from './questions.model';

@Injectable()
export class TractionService {
    baseUrl: string;
    tractions: Questions[];

    constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
        this.baseUrl = baseUrl;
    }

    getTractionsQuestions() {
        return this.http.get<Questions[]>(this.baseUrl + 'api/Traction/GetAll').toPromise();
    }
}
