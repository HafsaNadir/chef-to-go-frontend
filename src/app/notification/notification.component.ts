import { LoginService } from './../core/services/login.service';
import { environment } from './../../environments/environment';
import { Component, OnInit } from '@angular/core';
import * as io from 'socket.io-client'

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {
  socket;
  userId: string;
  constructor() { 
    console.log('constructor')
    this.socket = io(environment.SOCKET_ENDPOINT)
    const token =  localStorage.getItem('token');
    this.socket.emit('user', token);
    console.log('environment.SOCKET_ENDPOINT  not',environment.SOCKET_ENDPOINT);

  }

  ngOnInit(): void {
    this.socket.on('notification', (message) => {
      console.log(message)
      alert(message)
    })
    
  }
  sendNotification() {
    this.socket.emit('send', this.userId);
    this.userId = '';
 }

}
