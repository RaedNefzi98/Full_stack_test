import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HighlightDirective } from './highlight.directive';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LabelInputComponent } from './label-input/label-input.component';
import { PipelineService } from './pipeline.service';




@NgModule({
  declarations: [
    AppComponent,
    HighlightDirective,
    LabelInputComponent,
    
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    
    FormsModule,
    
    
    
    
    
    
    
  ],
  providers: [PipelineService],
  bootstrap: [AppComponent]
})
export class AppModule { }
