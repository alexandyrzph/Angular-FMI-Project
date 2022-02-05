import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';
import { iJob } from 'src/app/interfaces/job.model';
import { JobsService } from '../../services/job.service';

@Component({
    selector: 'app-applications',
    templateUrl: './applications.component.html',
    styleUrls: ['./applications.component.css']
})
export class ApplicationsComponent implements OnInit {

    jobs!: iJob[];
    ownerId!: number;
    constructor(private jobsService: JobsService,
        private authService: AuthService
        ) { }

    ngOnInit(): void {
        this.ownerId = this.authService.getLoggedUser()?.id as number;

        this.jobsService.getJobs$().subscribe({
            next: (resp) => {
                this.jobs = resp.filter((j) => j.ownerId == this.ownerId);
            } 
        });
    }

    onDelete(): void {

    }

}
