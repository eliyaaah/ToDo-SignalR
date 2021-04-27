import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TodoListComponent } from './todo-list/todo-list.component';
import { TodoComponent } from './todo/todo.component';

const routes: Routes = [
  { path: 'todo', component: TodoListComponent },
  { path: 'todo/:id', component: TodoComponent },
  { path: '',   redirectTo: '/todo', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
