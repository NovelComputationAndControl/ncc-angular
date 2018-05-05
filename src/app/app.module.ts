import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule, Routes} from '@angular/router';

import {AppComponent} from './app.component';
import {FooterComponent} from './shared/footer/footer.component';
import {NavbarComponent} from './shared/navbar/navbar.component';
import {PageNotFoundComponent} from './pages/page-not-found/page-not-found.component';
import {IndexPageComponent} from './pages/index-page/index-page.component';
import {AboutPageComponent} from './pages/about-page/about-page.component';
import {AuthorCardComponent} from './shared/author-card/author-card.component';
import {LoginPageComponent} from './authentication/login-page/login-page.component';
import {AuthenticationService} from './authentication/authentication.service';
import {RegistrationPageComponent} from './authentication/registration-page/registration-page.component';
import {PolicyPageComponent} from './pages/policy-page/policy-page.component';
import {ContactPageComponent} from './pages/contact-page/contact-page.component';
import {SettingsPageComponent} from './pages/settings-page/settings-page.component';
import {AuthGuard} from './authentication/auth-guard.service';
import {ProfileService} from './pages/settings-page/profile.service';
import {PaperSubmissionComponent} from './pages/paper-submission/paper-submission.component';
import {PapersSubmittedComponent} from './pages/dashboard/papers-submitted/papers-submitted.component';
import {StaffGuard} from './authentication/staff-guard.service';
import {PapersWithEditorComponent} from './pages/dashboard/papers-with-editor/papers-with-editor.component';
import {DashboardComponent} from './pages/dashboard/dashboard/dashboard.component';
import {PapersWithoutEditorComponent} from './pages/dashboard/papers-without-editor/papers-without-editor.component';


const appRoutes: Routes = [
  // { path: 'crisis-center', component: CrisisListComponent },
  // { path: 'hero/:id',      component: HeroDetailComponent },
  {
    path: '',
    component: IndexPageComponent,
  },
  // Authentication
  {
    path: 'login',
    component: LoginPageComponent,
  },
  {
    path: 'register',
    component: RegistrationPageComponent,
  },
  // Static Pages
  {
    path: 'about',
    component: AboutPageComponent,
  },
  {
    path: 'policy',
    component: PolicyPageComponent,
  },
  {
    path: 'contact',
    component: ContactPageComponent,
  },
  // User Profile
  {
    path: 'settings',
    canActivate: [AuthGuard],
    component: SettingsPageComponent,
  },
  // Journal Related Pages
  {
    path: 'submit',
    canActivate: [AuthGuard],
    component: PaperSubmissionComponent
  },
  {
    path: 'dashboard',
    canActivate: [AuthGuard],
    component: DashboardComponent,
    children: [
      {
        path: 'with-editor',
        canActivate: [StaffGuard],
        component: PapersWithEditorComponent,
      },
      {
        path: 'no-editor',
        canActivate: [StaffGuard],
        component: PapersWithoutEditorComponent,
      },
      {
        path: '',
        canActivate: [],
        component: PapersSubmittedComponent,
      },
    ]
  },
  {
    path: 'with-editor',
    canActivate: [StaffGuard],
    component: PapersWithEditorComponent,
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
];

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    NavbarComponent,
    PageNotFoundComponent,
    IndexPageComponent,
    AboutPageComponent,
    AuthorCardComponent,
    LoginPageComponent,
    RegistrationPageComponent,
    PolicyPageComponent,
    ContactPageComponent,
    SettingsPageComponent,
    PaperSubmissionComponent,
    PapersSubmittedComponent,
    PapersWithEditorComponent,
    DashboardComponent,
    PapersWithoutEditorComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule.forRoot(),
    RouterModule.forRoot(
      appRoutes,
      {enableTracing: false} // <-- debugging purposes only
    )
  ],
  providers: [
    AuthenticationService,
    ProfileService,
    AuthGuard,
    StaffGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
