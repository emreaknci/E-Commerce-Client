import { Injectable } from '@angular/core';
declare var alertify: any;

@Injectable({
  providedIn: 'root',
})
export class AlertifyService {
  constructor() {
    this.position();
    this.delay();
  }

  confirm(
    title: string,
    message: string,
    onOk?: () => any,
    onCancel?: () => any
  ) {
    alertify.confirm(
      title,message,
      function () {
        onOk();
      },
      function () {
        onCancel();
      }
    ).set('resizable',true).resizeTo('20%',200);;
  }

  success(message: string) {
    alertify.success(message);
  }

  error(message: string) {
    alertify.error(message);
  }

  notify(message: string) {
    alertify.notify(message);
  }

  warning(message: string) {
    alertify.warning(message);
  }

  dismissAll() {
    alertify.dismissAll();
  }

  dismissOthers() {
    alertify.dismissOthers();
  }

  private position() {
    alertify.set('notifier', 'position', 'top-right');
  }
  private delay() {
    alertify.set('notifier', 'delay', 3);
  }
}
