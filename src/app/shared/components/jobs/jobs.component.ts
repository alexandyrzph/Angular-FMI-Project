import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from "@angular/common/http";
import { JobsService } from 'src/app/shared/services/job.service';
import { iJob } from 'src/app/interfaces/job.model';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
    selector: 'app-jobs',
    templateUrl: './jobs.component.html',
    styleUrls: ['./jobs.component.css']
})
export class JobsComponent implements OnInit {

    jobs!: iJob[];
    jobsCount: number = 0;
    hasPermission!: boolean;

    constructor(
        private jobsService: JobsService,
        private authService: AuthService
    ) {
    }

    hiddenClass: string = 'hidden';

    ngOnInit(): void {
        this.hasPermission = this.authService.hasPermission('organization');

        this.jobsService.getJobs$().subscribe({
            next: (response) => {
                this.jobs = response;
                this.jobsCount = this.jobs.length;
            },
            error: (response: HttpErrorResponse) => {
                console.log(response);
            }
        })
    }

    onDelete(id: number): void {
        this.jobsService.deleteJob(id).subscribe({
            next: () => {
                this.jobs = this.jobs.filter(job => job.id !== id);
            }
        });
    }

    onApply(id: number): void {
        console.log('Apply Clicked');
    }

    onLike(id: number): void {
        console.log('Like clicked');
    }
}