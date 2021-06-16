import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService, AuthResponseData } from '../auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {}
  isLoginMode = true;
  isLoading = false;
  error: string | null = null;
  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    } else {
      const email = form.value.email;
      const password = form.value.password;
      console.log(email);
      let authObs: Observable<AuthResponseData>;
      if (this.isLoginMode) {
        authObs = this.authService.loging(email, password);
      } else {
        this.isLoading = true;
        authObs = this.authService.signup(email, password);

        form.reset();
      }
      authObs.subscribe(
        (r) => {
          console.log(r);
          this.isLoading = false;
          this.router.navigate(['/recipes']);
        },
        (er) => {
          console.log(er);
          this.isLoading = false;
          this.error = er;
        }
      );
    }
  }
}
