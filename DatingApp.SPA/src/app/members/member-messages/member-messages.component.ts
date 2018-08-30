// this component is a CHILD of member detail component
import { Component, OnInit, Input } from '@angular/core';
import { Message } from '../../_models/message';
import { AuthService } from '../../_services/auth.service';
import { UserService } from '../../_services/user.service';
import { AlertifyService } from '../../_services/alertify.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-member-messages',
  templateUrl: './member-messages.component.html',
  styleUrls: ['./member-messages.component.css']
})
export class MemberMessagesComponent implements OnInit {
  @Input()
  userId: number; // we will get the userId[recipientId] from the parent component
  messages: Message[];
  newMessage: any = {};

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private alertify: AlertifyService
  ) {}

  ngOnInit() {
    this.loadMessages();
  }

  loadMessages() {
    this.userService
      .getMessageThread(this.authService.decodedToken.nameid, this.userId)
      .subscribe(
        messages => (this.messages = messages),
        error => {
          this.alertify.error(error);
        }
      );
  }

  sendMessage() {
    this.newMessage.recipientId = this.userId;
    this.userService
      .sendMessage(this.authService.decodedToken.nameid, this.newMessage)
      .subscribe(
        message => {
          this.messages.unshift(message); // we want to show the last message on the first
          this.newMessage.content = ''; // reset the form
        },
        error => {
          this.alertify.error(error);
        }
      );
  }
}
