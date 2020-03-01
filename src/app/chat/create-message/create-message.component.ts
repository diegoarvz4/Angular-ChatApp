import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MessagesService } from '../../chat/messages.service';

@Component({
  selector: 'app-create-message',
  templateUrl: './create-message.component.html',
  styleUrls: ['./create-message.component.sass']
})
export class CreateMessageComponent implements OnInit {

  messageService: MessagesService;

  constructor(messageService: MessagesService) {
    this.messageService = messageService;
   }

  ngOnInit() {
  }

  onReceiveMsg(content: string){
    this.messageService.addMessage(content);
  }

  onSendMsg(form: NgForm) {
    this.messageService.emit('SendMsg', form.value.content);
    form.reset()
  }

}
