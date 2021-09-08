import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutInitialComponent } from './layout/layout-initial/layout-initial.component';
import { NavbarModule } from './components/navbar/navbar.module';
// import { SidebarModule, SidebarContentModule } from './components/sidebar/sidebar.module';
import { OptionsModule } from './components/options/options.module';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { InterceptorJwt } from './services/_codemono/interceptor.jwt.service';
import { InterceptorError } from './services/_codemono/interceptor.error.service';
import { AuthGuard } from './guards/auth.guard';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {SidebarModule} from 'primeng/sidebar';
import { SidebarContentModule } from './components/sidebar/sidebar.module';

@NgModule({
  declarations: [
    AppComponent,
    LayoutInitialComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    NavbarModule,
    SidebarModule,
    SidebarContentModule,
    OptionsModule,
    NgbModule,
    HttpClientModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: InterceptorJwt, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: InterceptorError, multi: true },
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
