import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { TodoServiceService } from '../todo-service.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit, OnDestroy {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private toDoService: TodoServiceService
  ) { }

  list: any = {
    name: "",
    items: []
  };
  id: number;
  newItemText: string = "";

  ngOnInit(): void {
    this.toDoService.start();
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.id = +params.get("id");
      this.toDoService.getListData(this.id);
      this.toDoService.subsribeToListUpdates(this.id);
    });

    this.toDoService.events.on("UpdatedListData", data => {
      this.list = data;
    })
  }

  addNewItem() {
    if (this.newItemText == "") return;

    this.toDoService.addToDoItem(this.id, this.newItemText);
    this.newItemText = "";
  }

  toggleToDoItem(itemId: any) {
    this.toDoService.toggleToDoItem(this.id, itemId);
  }

  ngOnDestroy() {

  }

}
