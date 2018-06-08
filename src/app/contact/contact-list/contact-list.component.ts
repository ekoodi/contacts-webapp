import {Component, OnInit} from '@angular/core';
import {Contact} from '../contact';
import {ContactService} from '../services/contact.service';
import {Router} from '@angular/router';
import {ToolbarService} from '../../ui/toolbar/toolbar.service';
import {ToolbarOptions} from '../../ui/toolbar/toolbar-options';
import {DialogService} from '../../ui/services/dialog.service';

@Component({
  selector: 'cw-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit {

  contacts: Contact[];

  constructor(private contactService: ContactService,
              private router: Router,
              private toolbar: ToolbarService,
              private dialogService: DialogService) {
    this.contacts = [];
  }

  ngOnInit() {
    this.toolbar.setToolbarOptions(new ToolbarOptions(false, 'Contacts', []));

    this.contactService.getContacts().subscribe(response => {
      this.contacts = response;
      console.log(this.contacts);
    }, error => {
      console.error('Getting contacts failed!');
      console.error(error);
      this.dialogService.errorDialog('Service unavailable');
      this.router.navigate(['/login']);
    });
  }

  onContactSelect(contact): void {
    // console.log(contact.id);
    this.router.navigate(['/contacts', contact.id]);
  }

  onCreateNew(): void {
    this.router.navigate(['/contacts/new']);
  }

}
