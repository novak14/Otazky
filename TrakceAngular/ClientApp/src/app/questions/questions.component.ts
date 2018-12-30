import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { TractionService } from './tractions.service';
import { Questions } from './questions.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Answers } from './answers.model';


@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css']
})
export class QuestionsComponent implements OnInit {
  questions: Questions[];
  question: Questions;
  answerForm: FormGroup;
  showAnswerResults = false;
  choosedAnswer: boolean;
  answer: Answers;
  wrongQuestions: Questions[] = [];
  correct = 0;
  wrong = 0;
  allQuestions: number;
  percentageSuccess: number;
  endTest = false;

  color = 'primary';
  mode = 'indeterminate';
  value = 50;

  public pieChartLabels: string[] = ['Správné odpovědi', 'Špatné odpovědi'];
  public pieChartData: number[] = [3, 4];
  public pieChartType = 'pie';

  constructor(private tractionService: TractionService) { }

  ngOnInit() {
    this.generateQuestions();
  }

  generateQuestions() {
    this.tractionService.getTractionsQuestions().then((res: Questions[]) => {
      this.questions = res;
      this.allQuestions = this.questions.length;
      this.question = this.questions[0];
    });
    this.answerForm = new FormGroup({
      chosedAnswer: new FormControl(null, Validators.required)
    });
  }

  onSubmitAnswer(quest: Questions) {
    this.answer = this.answerForm.value.chosedAnswer;
    this.showAnswerResults = true;

    if (this.answer.isCorrect) {
      this.correct++;
      this.choosedAnswer = true;
    } else {
      this.wrong++;
      this.choosedAnswer = false;
      this.wrongQuestions.push(quest);
    }
    this.answer.choosed = true;

    if (this.questions.length < 2) {
      this.percentageSuccess = this.correct / this.allQuestions * 100;
      this.endTest = true;
      this.pieChartData = [this.correct, this.wrong];
    }
  }

  nextQuestion() {
    const index = this.questions.indexOf(this.question);
    this.questions.splice(index, 1);
    this.question = this.questions[0];
    this.showAnswerResults = false;
  }

  onlyWrongQuestions() {
    this.wrongQuestions.forEach(w => {
      w.answers.forEach(a => {
        a.choosed = false;
      });
    });

    this.questions = this.wrongQuestions;
    this.allQuestions = this.questions.length;
    this.correct = 0;
    this.wrong = 0;
    this.wrongQuestions = [];
    this.question = this.questions[0];
    this.showAnswerResults = false;
  }

  againTest() {
    this.generateQuestions();
    this.correct = 0;
    this.wrong = 0;
    this.wrongQuestions = [];
  }

  public chartClicked(e: any): void {
    console.log(e);
  }

  public chartHovered(e: any): void {
    console.log(e);
  }

}
