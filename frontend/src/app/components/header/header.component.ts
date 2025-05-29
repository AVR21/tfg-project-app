import {Component, OnInit, signal} from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import {AuthService} from '../../services/auth/auth.service';
import { ModalComponent } from './modal/modal.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  standalone: true,
  imports: [ModalComponent]
})
export class HeaderComponent implements OnInit
{
  loggedIn = signal(false);
  dropdownOpen = signal(false);

  constructor(
    private authService: AuthService, 
    private router: Router
  ) {}
  
  ngOnInit() {
    this.authService.isLoggedIn().subscribe((res)=> this.loggedIn.set(res));
  }

  logOut() {
    this.authService.logout();
    this.loggedIn.set(false); 
    this.movePage('home');      
  }

  toggleDropdown(event: Event) {
    this.dropdownOpen.set(!this.dropdownOpen());
  }

  loginStatusUpdate(update: boolean) {
    this.loggedIn.set(update);
  }

  movePage(route: string) {
    this.router.navigate([route]);
  }

}
