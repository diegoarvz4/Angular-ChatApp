import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { ChatComponent } from './chat/chat.component';
import { CreateMessageComponent } from './chat/create-message/create-message.component';
import { MessagesService } from './chat/messages.service';

@NgModule({
  declarations: [
    AppComponent,
    ChatComponent,
    CreateMessageComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [
    MessagesService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
