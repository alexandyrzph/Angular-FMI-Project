import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { of, Subject, switchMap, takeUntil } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';
import { iJob } from 'src/app/interfaces/job.model';
import { JobsService } from '../../services/job.service';

@Component({
    selector: 'app-create',
    templateUrl: './create.component.html',
    styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit, OnDestroy {

    formGroup!: FormGroup;

    destroy$ = new Subject<boolean>();

    constructor(private authService: AuthService,
        private fb: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private jobService: JobsService
    ) { }


    ngOnInit(): void {
        this.buildForm();


        this.route.params.pipe(
            switchMap((params) => {
                const id = params['id'];

                if (id) {
                    return this.jobService.getJobById$(id);
                }
                return of(null);
            }),
            takeUntil(this.destroy$)
        ).subscribe({
            next: (response) => {
                this.buildForm(response!);
            }
        });

    }

    ngOnDestroy(): void {
        this.destroy$.next(true);
        this.destroy$.unsubscribe();
    }

    onSubmit(): void {
        const job = this.formGroup.value as iJob;
        job.ownerId = this.authService.getLoggedUser()?.id as number;
        let request$;
        if (job.id) {
            request$ = this.jobService.putJob$(job);
        } else {
            request$ = this.jobService.postJob$(job);
        }

        request$.subscribe({
            next: () => {
                this.router.navigate(['/main', 'jobs']);
            }
        });
    }

    private buildForm(job?: iJob): void {
        this.formGroup = this.fb.group({
            id: job?.id,
            title: [job?.title || '', [Validators.required]],
            description: [job?.description || '', [Validators.required]],
            type: [job?.type || '', [Validators.required]],
            category: [job?.category || '', [Validators.required]],
            img: [job?.img || '', [Validators.required]],
            likes: [[]],
            applied: [[]],
            hired: [[]],
        });
    }



}
