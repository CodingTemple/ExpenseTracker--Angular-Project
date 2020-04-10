import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserComponent } from './user/user.component';
import { ExpenseEntryComponent } from './expense-entry/expense-entry.component';


const routes: Routes = [
  {
    path: 'login',
    component: UserComponent
  },
  {
    path: 'expenses',
    component: ExpenseEntryComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
