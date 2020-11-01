import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WordDisplayComponent } from './word-display/word-display.component';
import { CountdownClockComponent } from './countdown-clock/countdown-clock.component';
import { CategoryChipComponent } from './category-chip/category-chip.component';
import { CategoryListComponent } from './category-list/category-list.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgScrollbarModule } from 'ngx-scrollbar';

@NgModule({
  declarations: [
    AppComponent,
    WordDisplayComponent,
    CountdownClockComponent,
    CategoryChipComponent,
    CategoryListComponent
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    NgScrollbarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
// https://github.com/MurhafSousli/ngx-scrollbar/wiki/usage