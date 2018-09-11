import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  show_msg = '';

    clearMessage() {
        this.show_msg = '';
    }
}


