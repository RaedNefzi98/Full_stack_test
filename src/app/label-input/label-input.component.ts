import { Component, EventEmitter, Injectable, Output } from '@angular/core';
import { PipelineService } from '../pipeline.service';

@Component({
  selector: 'app-label-input',
  template: `
  <div class="label-input-container">
  <input type="text" [(ngModel)]="label" placeholder="Enter label" class="label-input" />
  <button (click)="addLabel()" class="add-label-button">Add Label</button>
</div>

<select [(ngModel)]="selectedLabel" class="select-box">
  <option *ngFor="let lbl of labels" [value]="lbl">{{ lbl }}</option>
</select>
`,
styleUrls: ['./label-input.component.css']
})


export class LabelInputComponent {
  @Output() labelAdded = new EventEmitter<string>();
  label: string = '';
  selectedLabel: string = '';
  labels: string[] = [];
  constructor(private service: PipelineService ) {}

  addLabel() {
    if (this.label) {
      this.labels.push(this.label);
      this.labelAdded.emit(this.label);
      this.label = '';
    }
  }
  
  

}
