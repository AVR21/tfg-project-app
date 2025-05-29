import {Component, effect, EventEmitter, input, Output, signal} from '@angular/core';
import {AuthService} from '../../../../services/auth/auth.service';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
showPassword = signal(false);
type_text = signal('password');
email=signal('');
password=signal('');

formIsValid = signal(false);

@Output() success = new EventEmitter<boolean>();

constructor(private authService : AuthService) {
  effect(() => {
    this.formIsValid.set(this.formValid())
  });
}

eye = signal('bi bi-eye-slash');
togglePassword()
{
  this.showPassword.set(!this.showPassword());
  this.showPassword() ? this.type_text.set('text') : this.type_text.set('password');
  this.showPassword() ? this.eye.set('bi bi-eye') : this.eye.set('bi bi-eye-slash');
}

formValid(): boolean {
  return (this.email().trim() !== '' && this.password().trim() !== '');
}

  userLogin(ev: Event): void {
    ev.preventDefault();

    if (!this.email() || !this.password()) { return; }

    this.authService.login({ identifier: this.email(), password: this.password()})
      .subscribe({
        next: ({ user }) => {
          console.log('User logged:', user?.email);
          this.success.emit(true);
          /* cierra el modal con la API de Bootstrap 5 */
          const el = document.getElementById('authModal');
        },
        error: e => {
          console.error(e),
          this.success.emit(false);  
        }
      });
  }
}
