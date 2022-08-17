import { Directive, ElementRef, EventEmitter, HostListener, Input, Output, Renderer2 } from '@angular/core';
import { ProductService } from 'src/app/services/common/models/product.service';



declare var $:any;
@Directive({
  selector: '[appDelete]',
})
export class DeleteDirective {
  @Input() id:string;
  @Output() callback:EventEmitter<any>=new EventEmitter();
  constructor(
    private element: ElementRef,
    private _renderer: Renderer2,
    private productService: ProductService
  ) {
    const icon=_renderer.createElement("i");
    icon.className="bi bi-trash3-fill";
    icon.innerHTML=" Delete "
    icon.setAttribute("style","cursor:pointer;");
    _renderer.appendChild(element.nativeElement,icon)
  }

  @HostListener("click")
  onClick(event: any){
    console.log(this.id);
    const td=this.element.nativeElement;
    console.log(td.parentElement);
    this.productService.deleteProduct(this.id);
    $(td.parentElement).fadeOut(500,()=>{
      this.callback.emit();
    });
  }
}
