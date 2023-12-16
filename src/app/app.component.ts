import { Component } from '@angular/core';
import { HighlightDirective } from './highlight.directive';
import { PipelineService } from './pipeline.service';
import { Annotation } from './annotation.model';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Item } from 'src/Item.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  
  
})
export class AppComponent {
  title = 'ang_app';

  formData: Item = {
    text: '',
    candidate_labels: []
  };



  annotation: Annotation = 
  { start: 0, end: 6, label: 'groceries', text: 'clothes' }

  scores: number[] = [];

  constructor(private pipelineService: PipelineService) {
   }

  selectedLabels: string[] = [];

  onLabelAdded(label: string) {
    this.selectedLabels.push(label);
  }


  onSendToBackend(annotation: Annotation) {
    // You can perform additional logic here if needed
    this.pipelineService.sendAnnotation(this.annotation).subscribe(
      response => {
        console.log('Annotation sent successfully:', response);
      },
      error => {
        console.error('Error sending annotation:', error);
      }
    );
  }

  onSendToBackendClick() {
    console.log('Annotation to be sent:', this.annotation);
    this.pipelineService.sendAnnotation(this.annotation).subscribe(
      (response) => {
        console.log('Annotation sent successfully:', response);
      },
      (error) => {
        console.error('Error sending annotation:', error);
      }
    );
    }
    makeApiCall() {
      this.pipelineService.makeApiCall(this.formData)
        .subscribe(
          (response: any) => {
            // Handle the response from Django
            console.log(response);
            // Extract and store scores
          this.scores = response.scores;
          },
          (error: any) => {
            // Handle errors
            console.error('Error:', error);
          }
        );
    }
    

}
