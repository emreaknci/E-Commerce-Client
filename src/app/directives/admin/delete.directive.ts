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
import { ProductService } from 'src/app/services/common/models/product.service';

declare var $: any;
@Directive({
  selector: '[appDelete]',
})
export class DeleteDirective {
  @Input() id: string;
  @Output() callback: EventEmitter<any> = new EventEmitter();
  constructor(
    private element: ElementRef,
    private _renderer: Renderer2,
    private productService: ProductService,
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
    this.alertifyService.confirm("fasdsasa",
      'Silmek istediğinden emin misin?',
      ()=>{
        this.okCallBack()
      },()=>{
        this.cancelCallBack();
      }
    );
  }

  func1(){
    console.log(1);
  }
  func2(){
    console.log(2);
  }
  private okCallBack() {
    const td = this.element.nativeElement;
    this.productService.deleteProduct(this.id);
    $(td.parentElement).fadeOut(500, () => {
      this.callback.emit();
    });
    this.alertifyService.success('Silme işlemi gerçekleştirildi.');

  }
  private cancelCallBack() {
    this.alertifyService.notify('Silme işlemi gerçekleştirilmedi.');
  }
}
