import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-auth',
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
})
export class LoginComponent {
  authForm: FormGroup;
  isLoginMode = true;

  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.authForm = this.fb.group({
      username: [''], 
      email: [''],    
      identifier: [''],
      password: [''],
    });
  }

  toggleMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  printToken(){
    console.log(this.authService.getToken());
  }

  onSubmit() {
    const formValue = this.authForm.value;
    if (this.isLoginMode) {
      this.authService.login({
        identifier: formValue.identifier,
        password: formValue.password,
      }).subscribe(console.log);
    } else {
      this.authService.signup({
        username: formValue.username,
        email: formValue.email,
        password: formValue.password,
      }).subscribe(console.log);
    }
  }
}
