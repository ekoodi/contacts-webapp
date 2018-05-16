import { Injectable } from '@angular/core';
import {Contact} from './contact';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  contacts: Contact[];

  constructor() {
    this.contacts = [];
    this.contacts.push(new Contact('Sami', 'Anttonen'));
    this.contacts.push(new Contact('Joku', 'Toinen'));
    this.contacts.push(new Contact('Vielä', 'Kolmas'));
  }

  getContacts(): Contact[] {
    return this.contacts;
  }

}
