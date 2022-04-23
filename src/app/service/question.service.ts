import { Injectable } from '@angular/core';
import{ HttpClient } from '@angular/common/http'
@Injectable({
  providedIn: 'root'
})
export class QuestionService {
    
   //url='http://localhost:4000';
  constructor(private http : HttpClient) { }

  getQuestionJSon(){
    return this.http.get<any>("assets/questions.json")
  }
}
