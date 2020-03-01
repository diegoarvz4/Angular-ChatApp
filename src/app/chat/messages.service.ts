import { Message } from './message.model';
import * as io from 'socket.io-client';

import { Subject, Observable } from 'rxjs';

export class MessagesService {
  private messages: Message[] = [];
  private messagesUpdated = new Subject<Message[]>();
  socket: any;
  uri: string = 'localhost:3000';

  constructor() {
    this.socket = io(this.uri);
  }

  getUpdatedMessagesListener() {
    return this.messagesUpdated.asObservable();
  }

  addMessage(msg: any) {
    const message: Message = {
      ...msg
    }
    this.messages.push(message);
    this.messagesUpdated.next([...this.messages]);
  }

  listen(eventName: string){
    return new Observable((subscriber) => {
      this.socket.on(eventName, (data) => {
        subscriber.next(data);
      })
    })
  }

  emit(eventName: string, data: string){
    this.socket.emit(eventName, data)
  }
}