  import {Component, effect, EventEmitter, Output, signal} from '@angular/core';
  import {AuthService} from '../../../../services/auth/auth.service';
import { Router } from '@angular/router';
  @Component
  ({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.css']
  })
  export class SignupComponent
  {
    email = signal("");
    username = signal("");
    password = signal("");
    submitted = signal(false);

    formIsValid = signal(false);

    @Output() success = new EventEmitter<boolean>();

    constructor(
      private authService : AuthService,
      private router: Router) {
        effect(() => {
          this.formIsValid.set(this.formValid())
        })
    }

    emailValid(): boolean { 
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.email()); 
    }
    
    usernameValid(): boolean { 
      return this.username().trim().length >= 3; 
    }
    
    passwordValid(): boolean {
      const value = this.password();
      return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(value);
    }
    formValid()     { 
      return this.emailValid() && this.usernameValid() && this.passwordValid(); 
    }


    registerUser (event: Event) : void
    {

      event.preventDefault();
      event.stopPropagation();
      this.submitted.set(true);

      if (!this.formValid()) {
        console.log('Formulario inválido – el modal permanece abierto');
        return; 
      }

        const newUser = { 
          username: this.username(), 
          email: this.email(),
          password: this.password()
        }

      this.authService.signup(newUser).subscribe({
        next: ({res}) => {
          console.log(res);
          this.success.emit(true);
          
          const el = document.getElementById('authModal');
        },
        error: e => {
          console.error(e);
        }
      })
      }
  }
