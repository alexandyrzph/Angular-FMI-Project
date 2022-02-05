import { NgModule } from "@angular/core";
import { Route, RouterModule } from "@angular/router";
import { AclGuard } from "../guards/acl.guard";
import { ApplicationsComponent } from "./components/applications/applications.component";
import { CreateComponent } from "./components/create/create.component";
import { HomeComponent } from "./components/home/home.component";
import { JobsComponent } from "./components/jobs/jobs.component";
import { ProfileComponent } from "./components/profile/profile.component";
import { MainComponent } from "./main/main.component";

const routes: Route[] = [
    {
        path: '',
        component: MainComponent,
        children: [
            {
                path: 'jobs',
                component: JobsComponent,
            },
            {
                path: 'edit',
                component: CreateComponent,
                canActivate: [AclGuard]
            },
            {
                path: 'edit/:id',
                component: CreateComponent,
                canActivate: [AclGuard]
            },
            {
                path: '',
                component: HomeComponent,
            },
            {
                path: 'profile',
                component: ProfileComponent,
            },
            {
                path: 'applications',
                component: ApplicationsComponent
            }
        ]
    }
]

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [
        RouterModule
    ]
})

export class SharedRoutingModule {

}