import { HttpHeaders } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { NgxFileDropEntry } from 'ngx-file-drop';
import { ToastrService } from 'ngx-toastr';
import { AlertifyService } from '../../admin/alertify.service';
import { HttpClientService } from '../http-client.service';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss'],
})
export class FileUploadComponent {
  constructor(
    private httpClientService: HttpClientService,
    private alertifyService: AlertifyService,
    private toastrService: ToastrService
  ) {}

  public files: NgxFileDropEntry[] = [];
  @Input() options: Partial<FileUploadOptions> = null;
  public dropped(files: NgxFileDropEntry[]) {
    this.files = files;
    const fileData: FormData = new FormData();
    for (const file of files) {
      (file.fileEntry as FileSystemFileEntry).file((_file: File) => {
        fileData.append(_file.name, _file, file.relativePath);
      });
    }
    let errorMessage="Dosya yükleme işlemi gerçekleştirilemedi.";
    this.alertifyService.confirm(
      '','Dosyaları yüklemek istediğinize emin misiniz?',
      () => {
        this.httpClientService
          .post(
            {
              controller: this.options.controller,
              action: this.options.action,
              queryString: this.options.queryString,
              headers: new HttpHeaders({ responseType: 'blob' }),
            },
            fileData
          )
          .subscribe(
            (response) => {
              const message: string = 'Dosyalar başarıyla yüklendi.';
              if (this.options.isAdminPage) {
                this.alertifyService.success(message);
              } else {
                this.toastrService.success(message);
              }
            },
            (responseError) => {
              if (this.options.isAdminPage) {
                this.alertifyService.error(errorMessage);
              } else {
                this.toastrService.error(errorMessage);
              }
            }
          );
      },
      () => {
        this.alertifyService.notify(errorMessage);
      }
    );
  }

  public fileOver(event: any) {
    console.log(event);
  }

  public fileLeave(event: any) {
    console.log(event);
  }
}

export class FileUploadOptions {
  controller?: string;
  action?: string;
  queryString?: string;
  explanation?: string;
  accept?: string;
  isAdminPage?: boolean = false;
}
