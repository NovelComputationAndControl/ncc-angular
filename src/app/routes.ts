import {AboutPageComponent} from './pages/about-page/about-page.component';
import {IndexPageComponent} from './pages/index-page/index-page.component';
import {AuthGuard} from './authentication/auth-guard.service';
import {PageNotFoundComponent} from './pages/page-not-found/page-not-found.component';
import {RegistrationPageComponent} from './authentication/registration-page/registration-page.component';
import {PaperSubmissionComponent} from './pages/paper-submission/paper-submission.component';
import {StaffGuard} from './authentication/staff-guard.service';
import {ReviewSubmissionComponent} from './pages/dashboard/review-submission/review-submission.component';
import {SettingsPageComponent} from './pages/settings-page/settings-page.component';
import {PapersWithEditorComponent} from './pages/dashboard/papers-with-editor/papers-with-editor.component';
import {PapersEditorSelfComponent} from './pages/dashboard/papers-editor-self/papers-editor-self.component';
import {LoginPageComponent} from './authentication/login-page/login-page.component';
import {ContactPageComponent} from './pages/contact-page/contact-page.component';
import {PolicyPageComponent} from './pages/policy-page/policy-page.component';
import {PapersToReviewComponent} from './pages/dashboard/papers-to-review/papers-to-review.component';
import {PapersSubmittedComponent} from './pages/dashboard/papers-submitted/papers-submitted.component';
import {DashboardComponent} from './pages/dashboard/dashboard/dashboard.component';
import {Routes} from '@angular/router';
import {PaperDetailComponent} from './pages/dashboard/paper-detail/paper-detail.component';
import {PapersWithoutEditorComponent} from './pages/dashboard/papers-without-editor/papers-without-editor.component';

export const appRoutes: Routes = [
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
    path: 'paper/:id',
    canActivate: [AuthGuard],
    component: DashboardComponent,
    children: [
      {
        path: 'review',
        canActivate: [AuthGuard],
        component: ReviewSubmissionComponent
      },
      {
        path: '',
        canActivate: [AuthGuard],
        component: PaperDetailComponent
      }
    ]
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
        path: 'editor-is-self',
        canActivate: [AuthGuard],
        component: PapersEditorSelfComponent,
      },
      {
        path: 'to-review',
        canActivate: [AuthGuard],
        component: PapersToReviewComponent,
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
