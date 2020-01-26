import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule, RouterLink } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { JobService } from '../app/shared/services/job.service';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { LoginBossComponent } from './login/login-boss/login-boss.component';
import { AdvComponent } from './home/adv/adv.component';
import { JobTableComponent } from './home/job-table/job-table.component';
import { LoginUserComponent } from './login/login-user/login-user.component';
import { HttpClientModule } from "@angular/common/http";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AboutComponent } from './about/about.component';
import { InformationComponent } from './information/information.component';
import { SmartAgentComponent } from './smart-agent/smart-agent.component';
import { FormsModule } from '@angular/forms';
import {
  MatButtonModule, MatFormFieldModule, MatCardModule, MatDialogModule, MatInputModule, MatTableModule,
  MatToolbarModule, MatMenuModule, MatIconModule, MatProgressSpinnerModule, MatPaginatorModule, MatDialogRef, MAT_CHECKBOX_CLICK_ACTION, ErrorStateMatcher
} from '@angular/material';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatListModule } from '@angular/material/list';
import { MatCheckboxModule } from '@angular/material/checkbox';

import { MatTooltipModule } from '@angular/material/tooltip';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { NgxDocViewerModule } from 'ngx-doc-viewer'
import { BossRegisterComponent } from './login/boss-register/boss-register.component';
import { UserRegisterComponent } from './login/user-register/user-register.component';
import { UserService } from './shared/services';
import { ShortStringPipe } from './short-string.pipe';
import { AddJobComponent } from './add-job/add-job.component';
import { AddCompanyComponent } from './add-company/add-company.component';
import { SurveyComponent } from './survey/survey.component';
import { ConnectComponent } from './connect/connect.component';

import { SignToJobComponent } from './sign-to-job/sign-to-job.component';
import { JobToCheckComponent } from './manager/job-to-check/job-to-check.component';
import { ManagerService } from './shared/services/manager.service';
import { AuthGuard } from './auth.guard';
import { HeaderManagerComponent } from './manager/header-manager/header-manager.component';
import { SignToJobManagerComponent } from './manager/sign-to-job-manager/sign-to-job-manager.component';
import { WatchingCompaniesComponent } from './manager/watching-companies/watching-companies.component';
import { RecomendComponent } from './recomend/recomend.component';
import { from } from 'rxjs';
import { ForumComponent } from './forum/forum.component';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { AnswerFromRavComponent } from './manager/answer-from-rav/answer-from-rav.component';
import { RecommendsShowComponent } from './recommends-show/recommends-show.component';
import { AutocomleteValidateDirective } from './directives/autocomlete-validate.directive';
import { CityPipePipe } from './city-pipe.pipe';
import { ShowOneJobComponent } from './show-one-job/show-one-job.component';
import { NumbersComponent } from './home/numbers/numbers.component';
import { GetStatisticsComponent } from './manager/get-statistics/get-statistics.component';
import { CvToSendComponent } from './manager/cv-to-send/cv-to-send.component';
// import { BlodPipe } from './blod.pipe';
// import { LoaderComponent } from './loader/loader.component';
// import { BlobPipe } from './blob.pipe';
import { BlodPipe } from '../app/blod.pipe';
import { EnterManagerComponent } from './manager/enter-manager/enter-manager.component'
// import { ForumComponent } from './shared/models/forum/forum.component';

import { RatingModule } from 'ng-starrating';
import { PersonalAreaComponent } from './personal-area/personal-area.component';
import { ResetComponent } from './login/reset/reset.component';
import { ResetPasswordComponent } from './login/reset-password/reset-password.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { DatabaseComponent } from './manager/database/database.component';
import { BossdetailsComponent } from './manager/database/bossdetails/bossdetails.component';
import { EditJobComponent } from './manager/database/edit-job/edit-job.component';
import { EditUsersComponent } from './manager/database/edit-users/edit-users.component';
import { JobsListComponent } from './manager/database/jobs-list/jobs-list.component';
import { UpdateBossComponent } from './manager/database/update-boss/update-boss.component';
import { UserdetailsComponent } from './manager/database/userdetails/userdetails.component';
import { EditAdvComponent } from './manager/edit-adv/edit-adv.component';
import { TermsComponent } from './terms/terms.component';

const routes: Routes = [
  {
    path: 'login', component: LoginComponent,
    children: [
      { path: 'login-user', component: LoginUserComponent },
      { path: 'login-boss', component: LoginBossComponent },
      { path: 'register-user', component: UserRegisterComponent },
      { path: 'register-boss', component: BossRegisterComponent },
      { path: 'reset', component: ResetComponent },
      { path: 'reset-password', component: ResetPasswordComponent },
    ]
  },
  //
  {
    path: 'register', component: LoginComponent,
    children: [
      { path: 'register-user', component: UserRegisterComponent },
      { path: 'register-boss', component: BossRegisterComponent },
    ]
  },
  {
    path: 'home', component: HomeComponent,
    children: [
      { path: 'job-table', component: JobTableComponent },
      { path: 'adv', component: AdvComponent }
    ]
  },
  { path: 'information', component: InformationComponent },
  { path: 'about', component: AboutComponent },
  { path: 'forum', component: ForumComponent },
  { path: 'smart-agent', component: SmartAgentComponent },
  { path: 'add-job', component: AddJobComponent },
  { path: 'add-company', component: AddCompanyComponent },
  { path: 'survey', component: SurveyComponent },
  { path: 'connect', component: ConnectComponent },
  { path: 'recomend', component: RecomendComponent },
  { path: 'show-recommend/:id', component: RecommendsShowComponent },
  { path: 'sign-to-job/:id', component: SignToJobComponent },
  { path: 'show-jobs/:str', component: ShowOneJobComponent },
  { path: 'personal-area', component: PersonalAreaComponent },
  { path: "terms", component: TermsComponent },
  { path: '', component: HomeComponent },
  // {path: '404', component: NotFoundComponent},
  // {path: '**', redirectTo: '/404'},
  //manager
  { path: 'nbvladmin', component: EnterManagerComponent },
  { path: 'check', component: JobToCheckComponent, canActivate: [AuthGuard] },
  // { path: 'check', component: JobToCheckComponent,canActivate:[AuthGuard] },
  { path: 'answer-from-rav', component: AnswerFromRavComponent, canActivate: [AuthGuard] },
  { path: 'statistic', component: GetStatisticsComponent, canActivate: [AuthGuard] },
  { path: 'sign-to-job-manager', component: SignToJobManagerComponent, canActivate: [AuthGuard] },
  { path: 'header-manager', component: HeaderManagerComponent, canActivate: [AuthGuard] },
  { path: 'watching-companies', component: WatchingCompaniesComponent, canActivate: [AuthGuard] },
  { path: 'cvUserToSend', component: CvToSendComponent, canActivate: [AuthGuard] },
  { path: 'adv', component: EditAdvComponent, canActivate: [AuthGuard] },
  {
    path: 'database', component: DatabaseComponent,
    children: [
      { path: 'edit-users', component: EditUsersComponent },
      { path: 'userdetails', component: UserdetailsComponent },
      { path: 'bossdetails', component: BossdetailsComponent },
      { path: 'update-boss', component: UpdateBossComponent },
      // { path: 'subject-list', component: SubjectListComponent ,canActivate:[AuthGuard]},
      { path: 'jobs-list', component: JobsListComponent },
      { path: 'edit-job', component: EditJobComponent },
    ]
  }
  // { path: 'cvUserToSend/:userId', component: CvToSendComponent,canActivate:[AuthGuard] },
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    LoginBossComponent,
    AdvComponent,
    NumbersComponent,
    JobTableComponent,
    LoginUserComponent,
    AboutComponent,
    InformationComponent,
    SmartAgentComponent,
    BossRegisterComponent,
    UserRegisterComponent,
    UserRegisterComponent,
    ShortStringPipe,
    AddJobComponent,
    AddCompanyComponent,
    SurveyComponent,
    ConnectComponent,
    SignToJobComponent,
    JobToCheckComponent,
    HeaderManagerComponent,
    SignToJobManagerComponent,
    WatchingCompaniesComponent,
    RecomendComponent,
    ForumComponent,
    AnswerFromRavComponent,
    RecommendsShowComponent,
    AutocomleteValidateDirective,
    CityPipePipe,
    ShowOneJobComponent,
    GetStatisticsComponent,
    CvToSendComponent,
    //  LoaderComponent,
    BlodPipe,
    EnterManagerComponent,
    PersonalAreaComponent,
    ResetComponent,
    ResetPasswordComponent,
    NotFoundComponent,
    DatabaseComponent,
    BossdetailsComponent,
    EditJobComponent,
    EditUsersComponent,
    JobsListComponent,
    UpdateBossComponent,
    UserdetailsComponent,
    EditAdvComponent,
    TermsComponent,





  ],
  imports: [
    BrowserAnimationsModule,
    MatCheckboxModule,
    MatPaginatorModule,
    MatAutocompleteModule,
    MatBottomSheetModule,
    BrowserModule,
    HttpClientModule,
    MatToolbarModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    MatDialogModule,
    MatTableModule,
    MatMenuModule,
    MatIconModule,
    MatFormFieldModule,
    MatProgressSpinnerModule,
    FormsModule,
    MatSelectModule,
    MatSnackBarModule,
    MatTooltipModule,
    MatSelectModule,
    BrowserAnimationsModule,
    MatListModule,
    RouterModule.forRoot(
      routes,
      {
        enableTracing: true,
        onSameUrlNavigation: 'reload'
      }
    ),
    ReactiveFormsModule,
    PdfViewerModule,
    NgxDocViewerModule,
    RatingModule,
    // ErrorStateMatcher

  ],
  // exports:[

  //   MatToolbarModule,
  //   MatButtonModule,
  //   MatCardModule,
  //   MatInputModule,
  //   MatDialogModule,
  //   MatTableModule,
  //   MatMenuModule,
  //   MatIconModule,
  //   MatProgressSpinnerModule
  // ],
  providers: [
    { provide: MAT_CHECKBOX_CLICK_ACTION, useValue: 'check' },
    JobTableComponent,
    UserService,
    JobService,
    ManagerService,
    AddCompanyComponent,
    BossRegisterComponent,
    HeaderComponent,
    AuthGuard,
    ForumComponent,
    RecommendsShowComponent,
    SignToJobManagerComponent,
    CvToSendComponent,
    { provide: MatDialogRef, useValue: {} }

    ,
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
