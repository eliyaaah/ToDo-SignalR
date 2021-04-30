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
    this.todoService.getLists();
    this.todoService.events.on("updateToDoList", (values) => {
      this.lists = values.result;
    });
  }

}
