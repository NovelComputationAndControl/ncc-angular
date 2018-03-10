import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import {AppComponent} from './app.component';
import { FooterComponent } from './shared/footer/footer.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { IndexPageComponent } from './pages/index-page/index-page.component';
import { AboutPageComponent } from './pages/about-page/about-page.component';
import { AuthorCardComponent } from './shared/author-card/author-card.component';
import { LoginPageComponent } from './authentication/login-page/login-page.component';


const appRoutes: Routes = [
  // { path: 'crisis-center', component: CrisisListComponent },
  // { path: 'hero/:id',      component: HeroDetailComponent },
  {
    path: '',
    component: IndexPageComponent,
    data: { title: 'Novel Computation & Control' },
  },
  {
    path: 'account/login',
    component: LoginPageComponent,
    data: { title: 'Novel Computation & Control' }
  },
  {
    path: 'about',
    component: AboutPageComponent,
    data: { title: 'About Us: Novel Computation & Control' }
  },
  { path: '**', component: PageNotFoundComponent }
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
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule.forRoot(),
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    )
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
