import {Component, NgZone, OnInit} from '@angular/core';
import {CdkScrollable, ScrollDispatcher} from '@angular/cdk/overlay';
import {map} from 'rxjs/operators';
import {ToolbarService} from './ui/toolbar/toolbar.service';

@Component({
  selector: 'cw-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {

  private readonly SHRINK_TOP_SCROLL_POSITION = 56;

  constructor(private scrollDispatcher: ScrollDispatcher, private ngZone: NgZone, private toolbarService: ToolbarService) {
  }

  ngOnInit() {
    this.scrollDispatcher.scrolled()
      .pipe(
        map((event: CdkScrollable) => event.getElementRef().nativeElement.scrollTop)
      )
      .subscribe(scrollTop => this.ngZone.run(() => {
        console.log(scrollTop);
        if (scrollTop > this.SHRINK_TOP_SCROLL_POSITION) {
          this.toolbarService.hideToolbar();
        } else {
          this.toolbarService.showToolbar();
        }
      }));
  }

}
