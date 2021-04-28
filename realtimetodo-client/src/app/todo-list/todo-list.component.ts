import { Component, OnInit } from '@angular/core';
import { TodoServiceService } from '../todo-service.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {
  lists: any[] = [];

  constructor(private todoService: TodoServiceService) { }

  ngOnInit(): void {
    this.todoService.start();
  }

  demoList() {
    this.lists.push({ id: 0, listname: "Foo", completed: 5, pending: 10 });
    this.lists.push({ id: 1, listname: "Bar", completed: 16, pending: 10 });
    this.lists.push({ id: 2, listname: "Faa", completed: 0, pending: 2 });
    this.lists.push({ id: 3, listname: "Laa", completed: 30, pending: 20 });
  }

}
