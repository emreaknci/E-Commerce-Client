import {
  Directive,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  Output,
  Renderer2,
} from '@angular/core';
import { AlertifyService } from 'src/app/services/admin/alertify.service';
import { HttpClientService } from 'src/app/services/common/http-client.service';

declare var $: any;
@Directive({
  selector: '[appDelete]',
})
export class DeleteDirective {
  @Input() id: string;
  @Input() controller: string;
  @Output() callback: EventEmitter<any> = new EventEmitter();
  constructor(
    private element: ElementRef,
    private _renderer: Renderer2,
    private httpClientService: HttpClientService,
    private alertifyService: AlertifyService
  ) {
    const icon = _renderer.createElement('i');
    icon.className = 'bi bi-trash3-fill';
    icon.innerHTML = ' Delete ';
    icon.setAttribute('style', 'cursor:pointer;');
    _renderer.appendChild(element.nativeElement, icon);
  }

  @HostListener('click')
  onClick(event: any) {
    const td = this.element.nativeElement;
    this.alertifyService.confirm(
      'Bekle!',
      'Gerçekten silmek istiyor musun?',
      () => {
        this.okCallBack();
      },
      () => {
        this.cancelCallBack();
      }
    );
  }

  private okCallBack() {
    const td = this.element.nativeElement;
    this.httpClientService
      .delete({ controller: this.controller }, this.id)
      .subscribe(
        (response) => {
          $(td.parentElement).fadeOut(500, () => {
            this.callback.emit();
          });
          this.alertifyService.success('Silme işlemi gerçekleştirildi.');
        },
        (responseError) => {
          this.cancelCallBack();
          console.log(responseError)
        }
      );
  }
  private cancelCallBack() {
    this.alertifyService.notify('Silme işlemi gerçekleştirilemedi.');
  }
}
