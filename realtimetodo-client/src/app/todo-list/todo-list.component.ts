import { Component, OnDestroy, OnInit } from '@angular/core';
import { TodoServiceService } from '../todo-service.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit, OnDestroy {
  lists: any[] = [];

  constructor(private todoService: TodoServiceService) { }

  ngOnInit(): void {
    this.todoService.start();
    this.todoService.getLists();
    this.todoService.subsribeToCountUpdates();
    this.todoService.events.on("UpdateToDoList", (values) => {
      this.lists = values.result;
    });


  }

  ngOnDestroy() {
    this.todoService.unsubsribeFromCountUpdates();
  }

}
