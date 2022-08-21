import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { BaseComponent } from 'src/app/base/base.component';
import { User } from 'src/app/entities/user';
import { UserService } from 'src/app/services/common/models/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent extends BaseComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private toastrService: ToastrService,
    private userService: UserService,
    spinnerService:NgxSpinnerService
  ) {
    super(spinnerService);
  }

  ngOnInit(): void {
    this.createRegisterFormGroup();
  }
  registerFormGroup: FormGroup;

  createRegisterFormGroup() {
    this.registerFormGroup = this.formBuilder.group(
      {
        fullName: [
          '',
          [
            Validators.required,
            Validators.maxLength(50),
            Validators.minLength(2),
          ],
        ],
        userName: [
          '',
          [
            Validators.required,
            Validators.maxLength(50),
            Validators.minLength(6),
          ],
        ],
        email: [
          '',
          [Validators.required, Validators.maxLength(250), Validators.email],
        ],
        password: ['', Validators.required],
        confirmPassword: ['', Validators.required],
      },
      {
        validators: (group: AbstractControl): ValidationErrors | null => {
          let _password = group.get('password').value;
          let _confirmPassword = group.get('confirmPassword').value;
          return _password === _confirmPassword ? null : { notSame: true };
        },
      }
    );
  }
  get component() {
    return this.registerFormGroup.controls;
  }
  submitted: boolean = false;
  async onSubmit(user: User) {
    this.submitted = true;

    if (this.registerFormGroup.valid) {
      const result = await this.userService.createUser(user);
      if (result.success) {
        this.toastrService.success(result.message,"Başarılı!");
        console.log(user);
      }
      else{
        this.toastrService.error(result.message,"Hata!")
      }
    } else {
      this.toastrService.error(
        'Hatalı veya eksik veri girişi yaptınız.',
        'Kayıt Başarısız!'
      );
    }
  }
}
