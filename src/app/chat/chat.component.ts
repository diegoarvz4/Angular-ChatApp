import { Component, OnInit, OnDestroy, AfterViewChecked, ElementRef, ViewChild } from '@angular/core';
import { MessagesService } from '../chat/messages.service';
import { Message } from './message.model';
import { HttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.sass']
})

export class ChatComponent implements OnInit, OnDestroy, AfterViewChecked {
  @ViewChild('ScrollDown', null) private ScrollContainer: ElementRef;
  messages: Message[] = [];
  clientID: string = null;
  name: string = null;
  numOfUsers: string = '0';
  private messagesSub: Subscription;
  private numUsersSub: Subscription;
  messagesService: MessagesService;
  httpClient: HttpClient

  constructor(messagesService: MessagesService,   httpClient: HttpClient) {
    this.messagesService = messagesService;
    this.httpClient = httpClient;
   }

  ngOnInit() {
    this.messagesSub = this.messagesService.getUpdatedMessagesListener()
      .subscribe((messages: Message[]) => {
        this.messages = messages;
      });
    this.messagesService.listen('Message').subscribe((data: Object) => {
      this.messagesService.addMessage(data);
    })
    this.messagesService.listen('ClientID').subscribe((data: string) => {
      this.clientID = data;
      this.name = data;
    })
    this.messagesService.listen('fetchNumUsers').subscribe(() => {
      this.fetchNumUsers();
    })
    this.scrollToBottom();
  }

  fetchNumUsers() {
    this.httpClient.get<{totalUsers: string}>('http://localhost:3000/getTotalUsers')
      .subscribe((data) => {
        console.log(data)
        this.numOfUsers = data.totalUsers;
      });
  }

  ngAfterViewChecked() {        
    this.scrollToBottom();        
  }
  
  ngOnDestroy() {
    this.messagesSub.unsubscribe();
    this.numUsersSub.unsubscribe();
  }

  scrollToBottom(): void {
    try {
        this.ScrollContainer.nativeElement.scrollTop = this.ScrollContainer.nativeElement.scrollHeight;
    } catch(err) { }                 
  }

}
