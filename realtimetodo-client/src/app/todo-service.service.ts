import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr'; 
 
@Injectable({
  providedIn: 'root'
})
export class TodoServiceService {
  connection: signalR.HubConnection;

  constructor() {
    console.log("Hello");

    this.connection = new signalR.HubConnectionBuilder()
                          .configureLogging(signalR.LogLevel.Trace)
                          .withAutomaticReconnect()
                          .withUrl("/hubs/todo")
                          .build();
  }

  async start() {
    await this.connection.start();
  }

  async getLists() {
    const results = await this.connection.invoke("GetLists");

    return results;
  }
}
