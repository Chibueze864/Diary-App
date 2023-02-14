import { Component, OnDestroy, OnInit,  } from '@angular/core';
import {DiaryEntry} from "../shared/diary-entry.model";
import { DiaryDataService } from '../shared/diary-data.component';
import { Subscription, Subject } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-diary',
  templateUrl: './diary.component.html',
  styleUrls: ['./diary.component.css'],
})
export class DiaryComponent implements OnInit , OnDestroy{

  diaryEntries: DiaryEntry[];
  diarySubscription = new Subscription();
  constructor(private diaryDataService: DiaryDataService, private router: Router){}

  
  ngOnInit(): void{
    this.diaryDataService.getDiaryEntries()
    this.diarySubscription = this.diaryDataService.diarySubject.subscribe((diaryEntry) =>{
        this.diaryEntries = diaryEntry;
        console.log(diaryEntry)
    });
    // this.diaryEntries = this.diaryDataService.diaryEntries;
  };
  ngOnDestroy(): void{
    this.diarySubscription.unsubscribe();
  }

  onDelete(index: number){
    this.diaryDataService.onDelete(index);

  };
  onEdit(index: number){
    this.router.navigate(['edit', index + 1]); 

  }
  
};
