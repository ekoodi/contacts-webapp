import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {ToolbarService} from './toolbar.service';
import {ToolbarOptions} from './toolbar-options';

@Component({
  selector: 'cw-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {

  @Output() MenuClick: EventEmitter<any>;
  options: ToolbarOptions;

  constructor(private toolbar: ToolbarService) {
    this.MenuClick = new EventEmitter<any>();
  }

  ngOnInit() {
    this.toolbar.toolbarOptions.subscribe((options: ToolbarOptions) => {
      this.options = options;
    });
  }

  onMenuClick() {
    // console.log('Toolbar: onMenuClick');
    this.MenuClick.emit();
  }

}
