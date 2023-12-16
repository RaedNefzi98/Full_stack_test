import { Directive, ElementRef, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { PipelineService } from './pipeline.service';
import { Annotation } from './annotation.model';

@Directive({
  selector: '[appHighlight]'
})
export class HighlightDirective {

  @Input() highlightColor!: string;
  @Input() labels!: string[];
  @Output() sendToBackend = new EventEmitter<Annotation>(); 


  constructor(private el: ElementRef , private service: PipelineService) {}

  @HostListener('click') onClick() {
   
    this.addLabelsToSelectedText();
    
  }
  @HostListener('mouseup') onMouseUp() {
    const selectedText = this.getSelectedText();
    if (selectedText) {
      console.log('Selected text:', selectedText);
    }
  }

  private exportJson() {
    const selectedText = this.getSelectedText();
    if (selectedText) {
      const annotation: Annotation = {
        start: 0, // You need to set the start and end positions accordingly
        end: selectedText.length,
        label: this.labels[0], // Assuming only one label is selected for simplicity
        text: selectedText
      };

      this.sendToBackend.emit(annotation); // Emit the event with the annotation data
    }
  }

  private addLabelsToSelectedText() {
    const selection = window.getSelection();
    if (selection && selection.rangeCount > 0) {
      const range = selection.getRangeAt(0);
      const selectedText = selection.toString();

      if (selectedText) {
        const sentenceContainer = document.createElement('button');
        sentenceContainer.style.backgroundColor = this.getBackgroundColor();

        const selectedTextNode = document.createTextNode(` [${this.labels[this.labels.length - 1]}]${selectedText}`);
        sentenceContainer.appendChild(selectedTextNode);

        range.deleteContents();
        range.insertNode(sentenceContainer);

        selection.removeAllRanges();
      }
    }
  }
  

 
  private getBackgroundColor(): string {
    return this.getRandomColor(); 
  }

  private getRandomColor(): string {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
 
  

  private getSelectedText(): string | null {
    const selectedText = window.getSelection()?.toString().trim();
    return selectedText || null;
  }

  

}
