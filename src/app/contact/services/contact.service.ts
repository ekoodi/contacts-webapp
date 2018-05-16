import { Injectable } from '@angular/core';
import {Contact} from '../contact';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  contacts: Contact[];

  constructor() {
    this.contacts = [];
    this.contacts.push(new Contact(1, 'Sami', 'Anttonen'));
    this.contacts.push(new Contact(2, 'Joku', 'Toinen'));
    this.contacts.push(new Contact(3, 'Vielä', 'Kolmas'));
  }

  getContacts(): Contact[] {
    return this.contacts;
  }

}
