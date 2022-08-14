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

  confirm(message:string){
    alertify.confirm(message,
  function(){
    alertify.success('Ok');
  },
  function(){
    alertify.error('Cancel');
  });
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

  dismissAll(){
    alertify.dismissAll();
  }

  dismissOthers(){
    alertify.dismissOthers();
  }
  
  private position(){
    alertify.set('notifier','position', 'top-right');
  }
  private delay(){
    alertify.set('notifier','delay', 3);
  }

}
