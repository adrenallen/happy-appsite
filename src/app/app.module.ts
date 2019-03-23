import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material';
import { CookieService } from 'ngx-cookie-service';
import { RouterModule, Routes } from '@angular/router';
import { FileSaverModule } from 'ngx-filesaver';


import {
  MatButtonModule,
  MatProgressSpinnerModule
} from '@angular/material';
import { AppRoutingModule } from './app-routing.module';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { RatingModalComponent } from './components/ratings/rating-modal/rating-modal.component';
import { MatStepperModule } from '@angular/material/stepper';
import { RatingFormComponent } from './components/ratings/rating-form/rating-form.component';
import { MatSliderModule } from '@angular/material/slider';
import { MatChipsModule } from '@angular/material/chips';
import { RatingFactorsFormComponent } from './components/ratings/rating-factors-form/rating-factors-form.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';
import { LoadingCardComponent } from './modals/loading-card/loading-card.component';
import { FactorFormComponent } from './components/factors/factor-form/factor-form.component';
import { MatDialogModule } from '@angular/material/dialog';
import { ErrorDialogComponent } from './dialogs/error-dialog/error-dialog.component';
import { RatingFactorOrderByRankPipe } from './pipes/rating-factor-order-by-rank.pipe';
import { BasicDailyGraphComponent } from './components/reports/basic-daily-graph/basic-daily-graph.component';

import { ChartsModule } from 'ng2-charts';
import { BasicListComponent } from './components/reports/basic-list/basic-list.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { RatingFactorsFilterByTypePipe } from './pipes/rating-factors-filter-by-type.pipe';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BasicWeekGraphComponent } from './components/reports/basic-week-graph/basic-week-graph.component';

import { PromptDialogComponent } from './dialogs/prompt-dialog/prompt-dialog.component';
import { LoadingDialogComponent } from './dialogs/loading-dialog/loading-dialog.component';
import { SignupComponent } from './components/signup/signup.component';
import { InputDialogComponent } from './dialogs/input-dialog/input-dialog.component';
import { PasswordResetComponent } from './components/password-reset/password-reset.component';
import { MainFrameComponent } from './components/main-frame/main-frame.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { NavMenuComponent } from './components/main-frame/nav-menu/nav-menu.component';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { NavMenuSheetComponent } from './components/main-frame/nav-menu-sheet/nav-menu-sheet.component';
import { AuthGuard } from './guards/auth.guard';
import { ReportsComponent } from './components/reports/reports.component';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { DateTimePickerComponent } from './components/generic/date-time-picker/date-time-picker.component';
import { DragDropModule, CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { ChangelogDialogComponent } from './dialogs/changelog-dialog/changelog-dialog.component';
import { SkipSanitizeHtmlPipe } from './pipes/skip-sanitize-html.pipe';

import { Angulartics2Module } from 'angulartics2';
import { Angulartics2GoogleTagManager } from 'angulartics2/gtm';
import { SettingsComponent } from './components/settings/settings.component';
import { MatTabsModule } from '@angular/material/tabs';
import { AssistantSettingsComponent } from './components/settings/assistant-settings/assistant-settings.component';
import { FactorSettingsComponent } from './components/settings/factor-settings/factor-settings.component';
import { UserSettingsComponent } from './components/settings/user-settings/user-settings.component';
import { EditFactorDialogComponent } from './dialogs/edit-factor-dialog/edit-factor-dialog.component';
import { FactorArchivedPipe } from './pipes/factor-archived.pipe';

import { MatCheckboxModule } from '@angular/material/checkbox';
import { SelectFactorAspectDialogComponent } from './dialogs/select-factor-aspect-dialog/select-factor-aspect-dialog.component';
import { EditFactorAspectDialogComponent } from './dialogs/edit-factor-aspect-dialog/edit-factor-aspect-dialog.component';
import { FactorAspectSettingsComponent } from './components/settings/factor-aspect-settings/factor-aspect-settings.component';
import { FactorAspectArchivedPipe } from './pipes/factor-aspect-archived.pipe';
import { EditRatingComponent } from './components/ratings/edit-rating/edit-rating.component';
import { FactorImpactComponent } from './components/reports/factor-impact/factor-impact.component';
import { RatingFactorOccurrencesComponent } from './components/reports/rating-factor-occurrences/rating-factor-occurrences.component';
import { GenericHelpComponent } from './components/reports/help/generic-help/generic-help.component';
import { NotificationSettingsComponent } from './components/settings/notification-settings/notification-settings.component';
import { ReminderSettingsComponent } from './components/settings/notification-settings/reminder-settings/reminder-settings.component';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import { ReminderSettingRowComponent } from './components/settings/notification-settings/reminder-settings/reminder-setting-row/reminder-setting-row.component';

const appRoutes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginFormComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'password-reset', component: PasswordResetComponent },
  {
    path: 'main',
    component: MainFrameComponent,
    canActivateChild: [AuthGuard],
    canActivate: [AuthGuard],
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent,
        data: {
          title: 'Dashboard'
        }
      },
      {
        path: 'rate',
        component: RatingModalComponent,
        data: {
          title: 'Rating'
        }
      },
      {
        path: 'editrating/:id',
        component: EditRatingComponent,
        data: {
          title: 'Edit Rating'
        }
      },
      {
        path: 'reports',
        component: ReportsComponent,
        data: {
          title: 'Reports'
        },
        children: [
          {
            path: 'last-week-graph',
            component: BasicWeekGraphComponent,
            data: {
              title: "Daily Rating Graph"
            }
          },
          {
            path: 'factor-impact',
            component: FactorImpactComponent,
            data: {
              title: "Factor Impacts"
            }
          },
          {
            path:'rating-factor-occurrences',
            component: RatingFactorOccurrencesComponent,
            data: {
              title: "Rating Factor Occurrences"
            }
          }
        ]
      },
      {
        path: 'settings',
        component: SettingsComponent,
        data: {
          title: 'Settings'
        },
        children: [
          {
            path: '',
            redirectTo: 'factors',
            pathMatch: 'full'
          },
          {
            path: 'user',
            component: UserSettingsComponent,
            data: {
              title: "User Settings"
            }
          },
          {
            path: 'assistant',
            component: AssistantSettingsComponent,
            data: {
              title: "Assistant Settings"
            }
          },
          {
            path: 'notifications',
            component: NotificationSettingsComponent,
            data: {
              title: "Notification Settings"
            }
          },
          {
            path: 'factors',
            component: FactorSettingsComponent,
            data: {
              title: "Factor Settings"
            }
          },
          {
            path: 'factoraspects/:id',
            component: FactorAspectSettingsComponent,
            data: {
              title: "Factor Aspect Settings"
            }
          },
        ]
      },
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      }
    ]
  },

  //path not found
  { path: '**', redirectTo: '/login' },
];


@NgModule({
  declarations: [
    AppComponent,
    LoginFormComponent,
    DashboardComponent,
    RatingModalComponent,
    RatingFormComponent,
    RatingFactorsFormComponent,
    LoadingCardComponent,
    FactorFormComponent,
    ErrorDialogComponent,
    RatingFactorOrderByRankPipe,
    BasicDailyGraphComponent,
    BasicListComponent,
    RatingFactorsFilterByTypePipe,
    BasicWeekGraphComponent,
    PromptDialogComponent,
    LoadingDialogComponent,
    SignupComponent,
    InputDialogComponent,
    PasswordResetComponent,
    MainFrameComponent,
    NavMenuComponent,
    NavMenuSheetComponent,
    ReportsComponent,
    DateTimePickerComponent,
    ChangelogDialogComponent,
    SkipSanitizeHtmlPipe,
    SettingsComponent,
    AssistantSettingsComponent,
    FactorSettingsComponent,
    UserSettingsComponent,
    EditFactorDialogComponent,
    FactorArchivedPipe,
    SelectFactorAspectDialogComponent,
    EditFactorAspectDialogComponent,
    FactorAspectSettingsComponent,
    FactorAspectArchivedPipe,
    EditRatingComponent,
    FactorImpactComponent,
    RatingFactorOccurrencesComponent,
    GenericHelpComponent,
    NotificationSettingsComponent,
    ReminderSettingsComponent,
    ReminderSettingRowComponent,
  ],
  imports: [
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true }
    ),

    MatProgressSpinnerModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatIconModule,
    BrowserModule,
    MatInputModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    MatSnackBarModule,
    AppRoutingModule,
    MatStepperModule,
    MatSliderModule,
    MatChipsModule,
    MatAutocompleteModule,
    MatListModule,
    MatSelectModule,
    MatDialogModule,
    ChartsModule,
    MatExpansionModule,
    MatToolbarModule,
    ReactiveFormsModule,
    MatSidenavModule,
    MatBottomSheetModule,
    MatCheckboxModule,
    MatButtonToggleModule,

    OwlDateTimeModule,
    OwlNativeDateTimeModule,

    DragDropModule,
    MatTabsModule,

    Angulartics2Module.forRoot(),
    FileSaverModule,
  ],
  exports: [
    MatFormFieldModule,
    MatIconModule
  ],
  entryComponents: [
    FactorFormComponent,
    ErrorDialogComponent,
    PromptDialogComponent,
    LoadingDialogComponent,
    InputDialogComponent,
    NavMenuSheetComponent,
    ChangelogDialogComponent,
    EditFactorDialogComponent,
    SelectFactorAspectDialogComponent,
    EditFactorAspectDialogComponent,
    GenericHelpComponent
  ],
  providers: [CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
