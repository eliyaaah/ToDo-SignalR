import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr'; 
import * as EventEmitter from 'events';
 
@Injectable({
  providedIn: 'root'
})
export class TodoServiceService {
  connection: signalR.HubConnection;
  events: EventEmitter;

  constructor() {
    this.events = new EventEmitter();

    this.connection = new signalR.HubConnectionBuilder()
                          .configureLogging(signalR.LogLevel.Trace)
                          .withAutomaticReconnect()
                          .withUrl("/hubs/todo")
                          .build();
    
    this.connection.on("UpdateToDoList", (values) => {
      this.events.emit("UpdateToDoList", values);
    });
    this.connection.on("UpdatedListData", (values) => {
      this.events.emit("UpdatedListData", values);
    });
  }

  async start() {
    await this.connection.start();
  }

  async stop() {
    await this.connection.stop();
  }

  getLists() {
    if (this.connection.state === signalR.HubConnectionState.Connected) {
      this.connection.send("GetLists");
    }
    else {
      setTimeout(() => this.getLists(), 500);
    }
  }

  getListData(id: number) {
    if (this.connection.state === signalR.HubConnectionState.Connected) {
      this.connection.send("GetList", id);
    }
    else {
      setTimeout(() => this.getListData(id), 500);
    }
  }

  addToDoItem(listId: number, text: string) {
    if (this.connection.state === signalR.HubConnectionState.Connected) {
      this.connection.send("AddToDoItem", listId, text);
    }
    else {
      setTimeout(() => this.addToDoItem(listId, text), 500);
    }
  }

  toggleToDoItem(listId: number, itemId: number) {
    if (this.connection.state === signalR.HubConnectionState.Connected) {
      this.connection.send("ToggleToDoItem", listId, itemId);
    }
    else {
      setTimeout(() => this.toggleToDoItem(listId, itemId), 500);
    }
  }

  subsribeToCountUpdates() {
    if (this.connection.state === signalR.HubConnectionState.Connected) {
      this.connection.send("SubscribeToCountUpdates");
    }
    else {
      setTimeout(() => this.subsribeToCountUpdates(), 500);
    }
  }

  unsubsribeFromCountUpdates() {
    if (this.connection.state === signalR.HubConnectionState.Connected) {
      this.connection.send("UnsubscribeFromCountUpdates");
    }
    else {
      setTimeout(() => this.unsubsribeFromCountUpdates(), 500);
    }
  }

  subsribeToListUpdates(id: number) {
    if (this.connection.state === signalR.HubConnectionState.Connected) {
      this.connection.send("SubscribeToListUpdates", id);
    }
    else {
      setTimeout(() => this.subsribeToListUpdates(id), 500);
    }
  }

  unsubsribeFromListUpdates(id: number) {
    if (this.connection.state === signalR.HubConnectionState.Connected) {
      this.connection.send("UnsubscribeFromListUpdates", id);
    }
    else {
      setTimeout(() => this.unsubsribeFromListUpdates(id), 500);
    }
  }
}
