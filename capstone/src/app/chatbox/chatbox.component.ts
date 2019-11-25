import { Component } from '@angular/core';
import Chatkit from '@pusher/chatkit-client';
import axios from 'axios';


@Component({
  selector: 'app-chatbox',
  templateUrl: './chatbox.component.html',
  styleUrls: ['./chatbox.component.css']
})

export class ChatboxComponent {
  title = 'Chat Room';
  messages = [];
  users = [];
  currentUser: any;

  _username: string = '';
  get username(): string {
    return this._username;
  }
  set username(value: string) {
    this._username = value;
  }

  _message: string = '';
  get message(): string {
    return this._message;
  }
  set message(value: string) {
    this._message = value;
  }

  sendMessage() {
    const { message, currentUser } = this;
    currentUser.sendMessage({
      text: message,
      roomId: 'e84e233f-8ea2-4f33-bb15-3146abdbc61c',
    });
    this.message = '';
  }

  addUser() {
    const { username } = this;
    axios.post('http://localhost:5200/users', { username })
      .then(() => {
        const tokenProvider = new Chatkit.TokenProvider({
          url: 'http://localhost:5200/authenticate'
        });

        const chatManager = new Chatkit.ChatManager({
          instanceLocator: 'v1:us1:8677b7b6-c4c3-4edd-bb06-bdd447371204',
          userId: username,
          tokenProvider
        });

        return chatManager
          .connect()
          .then(currentUser => {
            currentUser.subscribeToRoom({
              roomId: 'e84e233f-8ea2-4f33-bb15-3146abdbc61c',
              messageLimit: 100,
              hooks: {
                onMessage: message => {
                  this.messages.push(message);
                },
                onPresenceChanged: (state, user) => {
                  this.users = currentUser.users.sort((a, b) => {
                    if (a.presence.state === 'online') return -1;

                    return 1;
                  });
                },
              },
            });

            this.currentUser = currentUser;
            this.users = currentUser.users;
          });
      })
        .catch(error => console.error(error))
  }
}