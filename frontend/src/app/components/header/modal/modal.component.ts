import { Component, EventEmitter, Output, signal } from '@angular/core';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
@Component({
  selector: 'app-modal',
  imports: [LoginComponent, SignupComponent],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css'
})
export class ModalComponent {
  readonly registerSelection = signal(true);
  @Output() statusUpdate = new EventEmitter<boolean>();

  changeRegisterSelection(sign: 0 | 1): void {
    this.registerSelection.set(sign === 0);
  }

  updateStatus(status: boolean) {
    this.statusUpdate.emit(status);
  }

}
