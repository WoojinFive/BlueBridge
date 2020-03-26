import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { LayoutModule } from "@angular/cdk/layout";
import { FlexLayoutModule } from "@angular/flex-layout";
import { ChartsModule } from "ng2-charts";

// Material
import { MaterialModule } from "./material/material.module";

// Routing
import { AppRoutingModule } from "./app-routing.module";

// Component
import { AppComponent } from "./app.component";
import { MainNavComponent } from "./components/main-nav/main-nav.component";
import { SidevarCardComponent } from "./components/main-nav/sidevar/sidevar-card/sidevar-card.component";
import { WageOverviewComponent } from "./components/wage/wage-overview/wage-overview.component";
import { ChartComponent } from "./components/wage/wage-overview/chart/chart.component";
import { OverviewComponent } from "./components/wage/wage-overview/overview/overview.component";
import { SearchComponent } from "./components/wage/wage-overview/search/search.component";
import { DetailComponent } from "./components/wage/wage-overview/detail/detail.component";
import { HistoryComponent } from "./components/wage/wage-overview/detail/history/history.component";
import { TotalWageComponent } from "./components/wage/wage-overview/detail/total-wage/total-wage.component";
import { UserButtonComponent } from "./components/main-nav/sidevar/user-button/user-button.component";
import { AdminButtonComponent } from "./components/main-nav/sidevar/admin-button/admin-button.component";
import { IndividualButtonComponent } from "./components/main-nav/sidevar/individual-button/individual-button.component";
import { ToolbarComponent } from "./components/main-nav/toolbar/toolbar.component";
import { HomeComponent } from "./components/home/home.component";
import { HomeInputComponent } from "./components/home/home-input/home-input.component";
import { HomeFeedComponent } from "./components/home/home-feed/home-feed.component";
import { SigninComponent } from "./components/signin/signin.component";
import { LoginBoxComponent } from "./components/signin/login-box/login-box.component";
import { RegisterComponent } from "./components/register/register.component";
import { RegisterBoxComponent } from "./components/register/register-box/register-box.component";
import { StaffComponent } from "./components/user-menus/staff/staff.component";
import { NewUserComponent } from "./components/main-nav/sidevar/admin-button/new-user/new-user.component";
import { NoteComponent } from "./components/main-nav/sidevar/user-button/note/note.component";
import { NoteHistoryComponent } from "./components/main-nav/sidevar/user-button/note/note-history/note-history.component";
import { NoteInputComponent } from "./components/main-nav/sidevar/user-button/note/note-input/note-input.component";
import { NoteDatepickerComponent } from "./components/main-nav/sidevar/user-button/note/note-datepicker/note-datepicker.component";
import { CalendarModule, DateAdapter } from "angular-calendar";
import { adapterFactory } from "angular-calendar/date-adapters/date-fns";
import { CalendarComponent } from "./components/main-nav/sidevar/user-button/calendar/calendar.component";
import { CalendarMainComponent } from "./components/main-nav/sidevar/user-button/calendar/calendar-main/calendar-main.component";
import { CalendarHeaderComponent } from "./components/main-nav/sidevar/user-button/calendar/calendar-header/calendar-header.component";
import { CalendarNewScheduleComponent } from "./components/main-nav/sidevar/user-button/calendar/calendar-new-schedule/calendar-new-schedule.component";
import { MeetingComponent } from "./components/main-nav/sidevar/user-button/calendar/calendar-new-schedule/meeting/meeting.component";
import { VacationComponent } from "./components/main-nav/sidevar/user-button/calendar/calendar-new-schedule/vacation/vacation.component";
import { EventComponent } from "./components/main-nav/sidevar/user-button/calendar/calendar-new-schedule/event/event.component";
import { PermissionComponent } from "./components/main-nav/sidevar/admin-button/permission/permission.component";
import { PermissionDetailComponent } from "./components/main-nav/sidevar/admin-button/permission/permission-detail/permission-detail.component";
import { MyInfoComponent } from './components/user-menus/my-info/my-info.component';
import { WageListOfStaffComponent } from './components/user-menus/wage-list-of-staff/wage-list-of-staff.component';
import { UserinfoComponent } from './components/main-nav/sidevar/userinfo/userinfo.component';
import { StatusChangeComponent } from './components/main-nav/sidevar/status-change/status-change.component';

@NgModule({
  declarations: [
    AppComponent,
    SidevarCardComponent,
    UserButtonComponent,
    AdminButtonComponent,
    IndividualButtonComponent,
    HomeComponent,
    HomeInputComponent,
    HomeFeedComponent,
    ToolbarComponent,
    MainNavComponent,
    WageOverviewComponent,
    ChartComponent,
    OverviewComponent,
    SearchComponent,
    DetailComponent,
    HistoryComponent,
    TotalWageComponent,
    SigninComponent,
    LoginBoxComponent,
    RegisterComponent,
    RegisterBoxComponent,
    StaffComponent,
    NewUserComponent,
    NoteComponent,
    NoteHistoryComponent,
    NoteInputComponent,
    NoteDatepickerComponent,
    CalendarComponent,
    CalendarMainComponent,
    CalendarHeaderComponent,
    CalendarNewScheduleComponent,
    MeetingComponent,
    VacationComponent,
    EventComponent,
    PermissionComponent,
    PermissionDetailComponent,
    MyInfoComponent,
    WageListOfStaffComponent,
    UserinfoComponent,
    StatusChangeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    LayoutModule,
    FlexLayoutModule,
    ChartsModule,
    ReactiveFormsModule,
    AppRoutingModule,

    // Material
    MaterialModule,

    CalendarModule.forRoot({ provide: DateAdapter, useFactory: adapterFactory })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
