import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ContactService} from '../services/contact.service';
import {Contact} from '../contact';
import {ToolbarService} from '../../ui/toolbar/toolbar.service';
import {ToolbarOptions} from '../../ui/toolbar/toolbar-options';
import {ToolbarAction} from '../../ui/toolbar/toolbar-action';
import {MatSnackBar} from '@angular/material';
import {NotificationComponent} from '../../ui/notification/notification.component';
import {DialogService} from '../../ui/services/dialog.service';

@Component({
  selector: 'cw-contact-detail',
  templateUrl: './contact-detail.component.html',
  styleUrls: ['./contact-detail.component.css']
})
export class ContactDetailComponent implements OnInit {

  contact: Contact;
  editingEnabled: boolean;
  contactId: any;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private contactService: ContactService,
              private toolbar: ToolbarService,
              private snackBarService: MatSnackBar,
              private dialogService: DialogService) {
    this.contact = new Contact();
    this.editingEnabled = false;
  }

  ngOnInit() {

    this.contactId = this.route.snapshot.paramMap.get('id');
    let toolbarActions: ToolbarAction[];

    if (this.contactId == null) {
      // Create contact
      this.editingEnabled = true;
      toolbarActions = [];
    } else {
      // View/Edit contact
      toolbarActions = [new ToolbarAction(this.onEdit.bind(this), 'edit')];

      this.contactService.getContactById(this.contactId).subscribe(response => {
        this.contact = response;
        console.log(this.contact);
      }, error => {
        console.error('Getting contact failed!');
        console.error(error);
        this.dialogService.errorDialog('Service unavailable');
        this.router.navigate(['/login']);
      });
    }

    this.toolbar.setToolbarOptions(new ToolbarOptions(true, 'Contact', toolbarActions));

  }

  onSave(): void {
    if (this.contactId == null) {
      // Create contact
      this.editingEnabled = false;
      this.contactService.createContact(this.contact).subscribe(response => {
        this.snackBarService.openFromComponent(NotificationComponent, { data: 'Contact added', duration: 2000 });
        console.log(response);
        this.router.navigate(['/contacts']);
      }, error => {
        this.dialogService.errorDialog('Adding contact failed');
        this.editingEnabled = true;
      });
    } else {
      // Edit contact
      this.editingEnabled = false;
      this.contactService.updateContact(this.contact).subscribe(response => {
        this.snackBarService.openFromComponent(NotificationComponent, { data: 'Contact saved', duration: 2000 });
        this.contact = response;
      }, error => {
        this.dialogService.errorDialog('Saving contact failed');
        this.editingEnabled = true;
      });
    }

  }

  onEdit() {
    let toolbarActions: ToolbarAction[];
    this.editingEnabled = !this.editingEnabled;
    if (this.editingEnabled === true) {
      // Edit mode on
      console.log('Edit mode enabled');
      toolbarActions = [
        new ToolbarAction(this.onDelete.bind(this), 'delete'),
        new ToolbarAction(this.onEdit.bind(this), 'edit')
      ];
    } else {
      // Edit mode off
      console.log('Edit mode disabled');
      toolbarActions = [new ToolbarAction(this.onEdit.bind(this), 'edit')];
    }
    this.toolbar.setToolbarOptions(new ToolbarOptions(true, 'Contact', toolbarActions));
  }

  onDelete() {
    this.editingEnabled = false;
    this.contactService.deleteContact(this.contact).subscribe(() => {
      this.router.navigate(['/contacts']);
    }, error => {
      this.dialogService.errorDialog('Deleting contact failed');
      this.editingEnabled = true;
    });
  }

}
