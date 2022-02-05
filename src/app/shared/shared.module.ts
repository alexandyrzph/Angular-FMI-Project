import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CreateComponent } from './components/create/create.component';
import { HomeComponent } from './components/home/home.component';
import { JobTemplateComponent } from './components/job-template/job-template.component';
import { JobsComponent } from './components/jobs/jobs.component';
import { MainComponent } from './main/main.component';
import { SharedRoutingModule } from './shared-routing.module';
import { ProfileComponent } from './components/profile/profile.component';
import { ApplicationsComponent } from './components/applications/applications.component';



@NgModule({
    declarations: [
        HomeComponent,
        JobsComponent,
        JobTemplateComponent,
        CreateComponent,
        MainComponent,
        ProfileComponent,
        ApplicationsComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        HttpClientModule,
        SharedRoutingModule
    ],
    providers: [],
})
export class SharedModule { }
