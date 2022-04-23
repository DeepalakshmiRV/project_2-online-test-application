import { Component, OnInit } from '@angular/core';
import { QuestionService } from '../service/question.service';
import { interval } from 'rxjs';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {
  
  public name : string="";
  public questionList : any =[];
  public currentQuestion:number= 0;
  // public options : string ="";
  // public correct : any;
  public points:number=0;
  counter=60;
  correctAnswer:number=0;
  inCorrectAnswer:number = 0;
  interval$:any;
  progress:string="0";
  isTestCompleted : boolean = false;
  constructor(private questionService : QuestionService) { }

  ngOnInit(): void {
    this.name = localStorage.getItem("name")!;
    this.getAllQuestion();
    this.startCounter();
  }
  getAllQuestion(){
     this.questionService.getQuestionJSon()
     .subscribe(res=>{
      this.questionList = res.questions;//json file name
      
     })
  }

  nextQuestion(){
     this.currentQuestion++;
  }
  previousQuestion(){
    this.currentQuestion--;
  }
  answer(currentQno:number,option:any){

    if(currentQno === this.questionList.length){
      this.isTestCompleted = true;
      this.stopCounter();
    }
    

    if(option.correct){
      this.points+=1;
      this.currentQuestion++;
      this.correctAnswer++;
      this.getProgressPercent();
    }else{
      
       this.currentQuestion++;
       this.inCorrectAnswer++;
       this.resetCounter();
       this.getProgressPercent();
       this.points-=1;
    }
  }
  startCounter(){
      this.interval$ = interval(1000)
      .subscribe(val=>{
        this.counter--;
        if(this.counter===0){
          this.currentQuestion++;
          this.counter=60;
          this.points-=1;
        }
      });
      setTimeout(() => {
       this.interval$.unsubscribe()
      },6000000);
  }
  stopCounter(){
     this.interval$.unsubscribe();
     this.counter=0;
  }
  resetCounter(){
     this.stopCounter();
     this.counter=60;
     this.startCounter();
  }
  /*resetTest(){
    this.resetCounter();
    this.getAllQuestion();
    this.points=0;
    this.counter=60;
    this.currentQuestion=0;
    this.progress ="0";
  }*/
  getProgressPercent(){
    this.progress=((this.currentQuestion/this.questionList.length)*100).toString();
    return this.progress;
    }

}
