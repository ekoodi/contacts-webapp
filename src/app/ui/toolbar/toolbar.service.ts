import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {ToolbarOptions} from './toolbar-options';

@Injectable({
  providedIn: 'root'
})
export class ToolbarService {

  toolbarOptions: BehaviorSubject<ToolbarOptions>;

  constructor() {
    this.toolbarOptions = new BehaviorSubject<ToolbarOptions>(
      new ToolbarOptions(false, 'Contacts Application', []));
  }

  getToolbarOptions(): Observable<ToolbarOptions> {
    return this.toolbarOptions.asObservable();
  }

  setToolbarOptions(options: ToolbarOptions): void {
    this.toolbarOptions.next(options);
  }

  hideToolbar(): void {
    const options = this.toolbarOptions.getValue();
    if (options) {
      options.hidden = true;
      // console.log(options);
      this.toolbarOptions.next(options);
    }
  }

  showToolbar(): void {
    const options = this.toolbarOptions.getValue();
    if (options) {
      options.hidden = false;
      // console.log(options);
      this.toolbarOptions.next(options);
    }
  }
}
