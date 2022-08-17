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
          const message:string="Dosyalar başarıyla yüklendi.";
          if (this.options.isAdminPage) {
            this.alertifyService.success(message)
          }else{
            this.toastrService.success(message)
          }
        },
        (responseError) => {
          const message:string="Dosya yükleme başarısız";
          if (this.options.isAdminPage) {
            this.alertifyService.error(message)
          }else{
            this.toastrService.error(message)
          }
        }
      );

    // for (const droppedFile of files) {

    //   // Is it a file?
    //   if (droppedFile.fileEntry.isFile) {
    //     const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
    //     fileEntry.file((file: File) => {

    //       // Here you can access the real file
    //       console.log(droppedFile.relativePath, file);
    //       console.log(droppedFile)
    //       /**
    //       // You could upload it like this:
    //       const formData = new FormData()
    //       formData.append('logo', file, relativePath)

    //       // Headers
    //       const headers = new HttpHeaders({
    //         'security-token': 'mytoken'
    //       })

    //       this.http.post('https://mybackend.com/api/upload/sanitize-and-save-logo', formData, { headers: headers, responseType: 'blob' })
    //       .subscribe(data => {
    //         // Sanitized logo returned from backend
    //       })
    //       **/

    //     });
    //   } else {
    //     // It was a directory (empty directories are added, otherwise only files)
    //     const fileEntry = droppedFile.fileEntry as FileSystemDirectoryEntry;
    //     console.log(droppedFile.relativePath, fileEntry);
    //   }
    // }
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
