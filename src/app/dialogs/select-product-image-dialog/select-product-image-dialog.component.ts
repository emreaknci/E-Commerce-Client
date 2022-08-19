import { Component, Inject, OnInit, Output } from '@angular/core';
import { MatCard } from '@angular/material/card';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { async } from 'rxjs';
import { SpinnerType } from '../../base/base.component';
import { ProductImage } from 'src/app/contracts/productImage';
import { DialogService } from '../../services/common/dialog.service';
import { FileUploadOptions } from '../../services/common/file-upload/file-upload.component';
import { ProductService } from '../../services/common/models/product.service';
import { BaseDialog } from '../base/base-dialog';
import { DeleteDialogComponent, DeleteState } from '../delete-dialog/delete-dialog.component';
import { AlertifyService } from 'src/app/services/admin/alertify.service';

declare var $: any

@Component({
  selector: 'app-select-product-image-dialog',
  templateUrl: './select-product-image-dialog.component.html',
  styleUrls: ['./select-product-image-dialog.component.scss']
})
export class SelectProductImageDialogComponent extends BaseDialog<SelectProductImageDialogComponent> implements OnInit {

  constructor(dialogRef: MatDialogRef<SelectProductImageDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: SelectProductImageState | string,
    private productService: ProductService,
    private spinnerService: NgxSpinnerService,
    private dialogService: DialogService,
    private alertifyService:AlertifyService) {
    super(dialogRef)
  }

  @Output() options: Partial<FileUploadOptions> = {
    accept: ".png, .jpg, .jpeg, .gif",
    action: "upload",
    controller: "products",
    explanation: "Ürün resmini seçin veya buraya sürükleyin...",
    isAdminPage: true,
    queryString: `id=${this.data}`
  };

  images: ProductImage[];
  
  async ngOnInit() {
    this.spinnerService.show(SpinnerType.BallAtom);
  
   
    this.images = await this.productService.readImages(this.data as string,()=>{
      this.spinnerService.hide(SpinnerType.BallAtom,500)
    });
  }

  async deleteImage(imageId: string, event: any) {

    this.dialogService.openDialog({
      componentType: DeleteDialogComponent,
      data: DeleteState.Yes,
      afterClosed: async () => {
        this.spinnerService.show(SpinnerType.BallAtom);
        // console.log($(event.srcElement).parent().parent().parent());
        await this.productService.deleteImage(this.data as string, imageId, () => {
          this.spinnerService.hide(SpinnerType.BallAtom);

          var card = $(event.srcElement).parent().parent().parent();
          card.fadeOut(500);
          this.alertifyService.success("Resim silme başarılı!");
        },()=>{
          this.alertifyService.error("Resim silme başarısız!");
        });
      }
    })
  }
}


export enum SelectProductImageState {
  Close
}
