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
    console.log("Hello");

    this.connection = new signalR.HubConnectionBuilder()
                          .configureLogging(signalR.LogLevel.Trace)
                          .withAutomaticReconnect()
                          .withUrl("/hubs/todo")
                          .build();
    
    this.connection.on("updateToDoList", (values) => {
      this.events.emit("updateToDoList", values);
    });
  }

  async start() {
    await this.connection.start();
  }

  async getLists() {
    if (this.connection.state === signalR.HubConnectionState.Connected) {
      const results = await this.connection.send("GetLists");

      return results;
    }
    else {
      setTimeout(() => this.getLists());
    }
  }
}
