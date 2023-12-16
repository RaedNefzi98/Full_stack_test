import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Annotation } from './annotation.model';
import { Item } from 'src/Item.model';

@Injectable({
  providedIn: 'root'
})
export class PipelineService {

  private backendUrl = 'http://localhost:8000';

  constructor(private http: HttpClient) { }

  

  sendAnnotation(annotation: Annotation): Observable<any> {

     // Convert the annotation object to form data
     const formData = new FormData();
     formData.append('start', annotation.start.toString());
     formData.append('end', annotation.end.toString());
     formData.append('label', annotation.label);
     formData.append('text', annotation.text);

      // Set headers for form data
    const headers = new HttpHeaders();
    
    const apiUrl = `${this.backendUrl}/export-annotations/`; 
    return this.http.post(apiUrl, formData, { headers });
  }


  makeApiCall(requestData: Item): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
      // Add any other headers as needed
    });

    const apiUrl = `${this.backendUrl}/pipeline_api/`; 
    return this.http.post(apiUrl, requestData, { headers });
  }

}
