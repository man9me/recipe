import { HttpErrorResponse } from '@angular/common/http';
import {
  Component,
  ComponentFactoryResolver,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { AlertComponent } from 'src/app/alert/alert/alert.component';
import { PlaceholderDirective } from 'src/app/shared/placeholder.directive';
import { AuthService, AuthResponseData } from '../auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent implements OnInit, OnDestroy {
  constructor(
    private authService: AuthService,
    private router: Router,
    private CFR: ComponentFactoryResolver
  ) {}

  ngOnInit(): void {}
  isLoginMode = true;
  isLoading = false;
  error: string | null = null;
  @ViewChild(PlaceholderDirective, { static: false })
  alertHost: PlaceholderDirective;
  sub: Subscription;
  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }
  ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe();
    }
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
          this.showErrorAlert(er);
        }
      );
    }
  }
  onCloseEr() {
    this.error = null;
  }
  private showErrorAlert(er: string) {
    const alertCmpFactory = this.CFR.resolveComponentFactory(AlertComponent); //референс на фактори

    const hostViewContainerRef = this.alertHost.viewContainerRef;
    hostViewContainerRef.clear(); // очистка фактори
    const compRef = hostViewContainerRef.createComponent(alertCmpFactory); // создание фактори
    compRef.instance.massage = er; //инстансы алёрт компонента @Input() massage: string;
    this.sub = compRef.instance.close.subscribe(() => {
      //инстансы алёрт компонента @Output() close = new EventEmitter<void>();
      this.sub.unsubscribe();
      hostViewContainerRef.clear();
    });
  }
}
