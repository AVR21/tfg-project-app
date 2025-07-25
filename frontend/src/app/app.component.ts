import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./components/header/header.component";
import { ContentComponent } from "./components/content/content.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, ContentComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'frontend';
}
