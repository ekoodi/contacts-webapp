import {ToolbarAction} from './toolbar-action';

export class ToolbarOptions {
  backEnabled: boolean;
  title: string;
  actions: ToolbarAction[];
  hidden: boolean;

  constructor(backEnabled: boolean, title: string, actions: ToolbarAction[]) {
    this.backEnabled = backEnabled;
    this.title = title;
    this.actions = actions;
    this.hidden = false;
  }
}
