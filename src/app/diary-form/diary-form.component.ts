import { Component } from '@angular/core';
import {FormGroup, FormControl, Validators} from "@angular/forms";
import { Router, ActivatedRoute } from '@angular/router';
import { DiaryDataService } from '../shared/diary-data.component';
import { DiaryEntry } from '../shared/diary-entry.model';

@Component({
  selector: 'app-diary-form',
  templateUrl: './diary-form.component.html',
  styleUrls: ['./diary-form.component.css']
})
export class DiaryFormComponent {

  diaryEntries: DiaryDataService[]
  diaryForm: FormGroup;
  editMode = false;
  diaryEntry: DiaryEntry;
  paramId: number; 
  constructor(private diaryDataService: DiaryDataService,private activatedRoute: ActivatedRoute ,private router: Router){}

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(paramMap =>{
      if(paramMap.has("id")){
         this.editMode = true;
         this.paramId = +paramMap.get("id")!;
         this.diaryEntry = this.diaryDataService.getDiaryEntry(this.paramId)

      }else{
        this.editMode = false;
      }
           
    })
    this.diaryForm = new FormGroup({
      "date": new FormControl(this.editMode ? this.diaryEntry.date : null,[Validators.required]),
      "entry": new FormControl(this.editMode ? this.diaryEntry.entry :null,[Validators.required]),
    })
  };
  onSubmit(): void{
    const newEntry = new DiaryEntry(1,this.diaryForm.value.date, this.diaryForm.value.entry);
    if(this.editMode){
      newEntry.id = +this.paramId;
      this.diaryDataService.onUpdateEntry(this.paramId, newEntry)
      
      this.router.navigateByUrl("");

    }else{
      this.diaryDataService.onAddEntry(newEntry);

      this.router.navigateByUrl("");
    }
  }
}
