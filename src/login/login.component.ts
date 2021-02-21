import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.template.html',
})
export class LoginComponent {
    loginForm  =  this.formBuilder.group({
        email: ['', Validators.required],
        password: ['', Validators.required]
    });

    constructor(
      private formBuilder: FormBuilder,
      private authService: AuthService,
      private router: Router,
    ) {
    }

    onSubmit(): void {
        const val = this.loginForm.value;

        console.log(val);

        if (val.email && val.password) {
            this
                .authService
                .login(val.email, val.password)
                .subscribe(
                    () => {
                        console.log('User is logged in');
                        this.router.navigateByUrl('/');
                    }
                );
        }
    }
}
