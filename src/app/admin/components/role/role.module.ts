import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoleComponent } from './role.component';
import { RouterModule } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { CreateComponent } from './create/create.component';
import { ListComponent } from './list/list.component';
import { DeleteDirective } from 'src/app/directives/admin/delete.directive';



@NgModule({
  declarations: [
    RoleComponent,
    CreateComponent,
    ListComponent,
    DeleteDirective
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: "", component: RoleComponent }
    ]),
    MatSidenavModule, 
    MatFormFieldModule, 
    MatInputModule, 
    MatButtonModule, 
    MatTableModule, 
    MatPaginatorModule,
  ]
})
export class RoleModule { }