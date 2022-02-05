import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { User } from "src/app/auth/models/user.model";
import { environment } from "src/environments/environment";
import { iJob } from "../../interfaces/job.model";

@Injectable({
    providedIn: 'root'
})
export class JobsService {

    constructor(private http: HttpClient) {
    }

    getJobs$(): Observable<iJob[]> {
        return this.http.get<iJob[]>(`${environment.apiUrl}/jobs`);
    }

    getJobById$(id: number): Observable<iJob> {
        return this.http.get<iJob>(`${environment.apiUrl}/jobs/${id}`);
    }

    postJob$(job: iJob): Observable<iJob> {
        return this.http.post<iJob>(`${environment.apiUrl}/jobs`, job);
    }

    putJob$(job: iJob): Observable<iJob> {
        return this.http.put<iJob>(`${environment.apiUrl}/jobs/${job.id}`, job);
    }

    deleteJob(id: number): Observable<void> {
        return this.http.delete<void>(`${environment.apiUrl}/jobs/${id}`);
    }

}