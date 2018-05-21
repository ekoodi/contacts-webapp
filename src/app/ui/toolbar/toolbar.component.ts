import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {ToolbarService} from './toolbar.service';
import {ToolbarOptions} from './toolbar-options';

@Component({
  selector: 'cw-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {

  @Output() onMenuClick: EventEmitter<any>;
  options: ToolbarOptions;

  constructor(private toolbar: ToolbarService) {
    this.onMenuClick = new EventEmitter<any>();
  }

  ngOnInit() {
    this.toolbar.toolbarOptions.subscribe((options: ToolbarOptions) => {
      this.options = options;
    });
  }

  menuClick() {
    this.onMenuClick.emit();
  }

}
