import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Validation } from '../validators/validation';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.scss']
})
export class UserRegisterComponent {

  form: FormGroup;
  submitted = false;
  namePattern = "^[A-Za-z']+$";
  emailPattern1 = "^[a-zA-Z0-9._%+-]{3,80}\@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$";
  // emailPattern2 = "[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$";
  passwordPattern = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@!#$%^&*/().,':;+=~? ]).{8,25}$";

  constructor(
    private formBuilder: FormBuilder, 
    // private apiService : ApiService, 
    private route: Router,
    // private activatedRoute: ActivatedRoute
    ) {
    this.form = this.formBuilder.group(
      {
        firstName: [
          '',
          [
            Validators.required,
            Validators.minLength(2),
            Validators.maxLength(100),
            Validators.pattern(this.namePattern),
          ],
        ],

        lastName: [
          '',
          [
            Validators.required,
            Validators.minLength(2),
            Validators.maxLength(100),
            Validators.pattern(this.namePattern),
          ],
        ],
        
        email: [
          '',
          [
            Validators.required,
            Validators.email,
            Validators.pattern(this.emailPattern1),
          ],
        ],

        password: [
          '',
          [
            Validators.required,
            Validators.minLength(8),
            Validators.maxLength(25),
            Validators.pattern(this.passwordPattern),
          ],
        ],

        confirmPassword: [
          '',
          [
            Validators.required,
          ],
        ],
      },
      {
        validators: [Validation.match('password', 'confirmPassword')]
      }
    )
  }

  get f(): { [key : string]: AbstractControl}
  {
    return this.form.controls;
  }

  onSubmit(): void {
    
    this.submitted = true;

    if(this.form.invalid)
    {
      return;
    }

    console.log(this.form);
    
  }

}
