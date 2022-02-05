import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';
import { iJob } from 'src/app/interfaces/job.model';

@Component({
    selector: 'app-job-template',
    templateUrl: './job-template.component.html',
    styleUrls: ['./job-template.component.css']
})
export class JobTemplateComponent implements OnInit {

    @Input() job!: iJob;
    ownerID!: number;
    @Output() likeClicked = new EventEmitter<number>();
    @Output() deleteClicked = new EventEmitter<number>();
    @Output() applyClicked = new EventEmitter<number>();

    hasPermission!: boolean;

    constructor(private authService: AuthService) {
    }

    ngOnInit(): void {
        this.hasPermission = this.authService.hasPermission('organization');
        this.ownerID = this.authService.getLoggedUser()?.id as number;
    }

    onDelete(): void {
        this.deleteClicked.emit(this.job.id);
    }

    onApply(): void {
        this.applyClicked.emit(this.job.id);
    }

    onLike(): void {
        this.likeClicked.emit(this.job.id);
    }
}
