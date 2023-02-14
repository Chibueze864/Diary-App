import {Injectable} from "@angular/core";
import { DiaryEntry } from "./diary-entry.model";
import { Subject } from "rxjs";
import { HttpClient } from "@angular/common/http";

@Injectable({providedIn: "root"})
export class DiaryDataService{

    diarySubject = new Subject<DiaryEntry[]>();
    public maxId: number
    constructor(private http: HttpClient){}
    diaryEntries: DiaryEntry[] = [
        new DiaryEntry(1,"Jan 1st", "Entry 2"),
        new DiaryEntry(2,"Jan 2nd", "Entry 2"),
        new DiaryEntry(3, "Jan 2nd", "Entry 2"),
        new DiaryEntry(4, "Jan 1st", "Hello World")
    ]

    onDelete(index: number){
        this.http.delete<{message: string}>("http://localhost:3000/remove-entry/" + index).subscribe((jsonData)=>{
            this.getDiaryEntries()
        })
    }
    onAddEntry(diaryEntry: DiaryEntry){
        this.http.get<{maxId: number}>("http://localhost:3000/max-id").subscribe((jsonData)=>{
                diaryEntry.id = jsonData.maxId + 1;
                this.http.post<{message: string}>("http://localhost:3000/add-entry",diaryEntry).subscribe((jsonData)=>{
                    console.log(diaryEntry)
                    this.getDiaryEntries();
                    // this.diarySubject.next(this.diaryEntries);
                })
        })
      

        // this.diaryEntries.push(diaryEntry);
        // this.diarySubject.next(this.diaryEntries);
    }
    
    onUpdateEntry(paramId: number, newEntry: DiaryEntry){
        this.http.put<{message: string}>("http://localhost:3000/update-entry/" + paramId, newEntry).subscribe((jsonData)=>{
            this.getDiaryEntries()
        })
    }
    getDiaryEntries(){
        this.http.get<{diaryEntries: DiaryEntry[]}>("http://localhost:3000/diary-entries").subscribe((jsonData)=>{
            this.diaryEntries = jsonData.diaryEntries;
            this.diarySubject.next(this.diaryEntries);
        });
    }
    getDiaryEntry(id: number){
        const index = this.diaryEntries.findIndex(el =>{
            return el.id == id;
        })
        return this.diaryEntries[index];
    }
}