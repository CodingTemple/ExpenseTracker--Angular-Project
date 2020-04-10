import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service'
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';
@Component({
  selector: 'app-expense-entry',
  templateUrl: './expense-entry.component.html',
  styleUrls: ['./expense-entry.component.scss']
})
export class ExpenseEntryComponent implements OnInit {

  userId: string;
  constructor(private auth: AuthService, private afs:AngularFirestore) { }

  getUid(){
    this.auth.getUserUid().subscribe(user => {
      this.userId = user.uid
    })
  }

  expenseForm = new FormGroup({
    firstName : new FormControl('', [Validators.required]),
    lastName: new FormControl('',[Validators.required]),
    travelAir: new FormControl('',[Validators.required]),
    hotelName: new FormControl('',[Validators.required]),
    totalExpenses: new FormControl('',[Validators.required])
  })

  onSubmit(){
    this.afs.collection('expenses').add({
      firstName: this.expenseForm.value.firstName,
      lastName: this.expenseForm.value.lastName,
      travelAir: this.expenseForm.value.travelAir,
      hotelName: this.expenseForm.value.hotelName,
      totalExpenses: this.expenseForm.value.totalExpenses,
      uid: this.userId
    })
  }




  ngOnInit(): void {
    this.getUid()
  }

}
