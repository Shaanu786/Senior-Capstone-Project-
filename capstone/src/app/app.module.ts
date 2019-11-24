import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from './login/login.component';
import { HomepageComponent } from './homepage/homepage.component';
import { TaskComponent } from './task/task.component';
import { ProjectTabComponent } from './project-tab/project-tab.component';
import { TaskColumnComponent } from './task-column/task-column.component';
import { TaskFloatComponent } from './task-float/task-float.component';
import { ProjectPageComponent } from './project-page/project-page.component';
import { ProfilePageComponent } from './profile-page/profile-page.component';
import { NavComponent } from './nav/nav.component';
import { MatTableModule} from '@angular/material';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FrameComponent } from './frame/frame.component';
import { KanbanComponent } from './kanban/kanban.component';

import { FusionChartsModule } from 'angular-fusioncharts';
import * as FusionCharts from 'fusioncharts';
import * as Charts from 'fusioncharts/fusioncharts.charts';
import * as TimeSeries from 'fusioncharts/fusioncharts.timeseries';

// Add dependencies to FusionChartsModule
FusionChartsModule.fcRoot(
  FusionCharts, 
  Charts,
  TimeSeries
)

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomepageComponent,
    TaskComponent,
    ProjectTabComponent,
    TaskColumnComponent,
    TaskFloatComponent,
    ProjectPageComponent,
    ProfilePageComponent,
    NavComponent,
    FrameComponent,
    KanbanComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    BrowserAnimationsModule,
    MatTableModule,
    DragDropModule,
    FusionChartsModule // include in imports
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
