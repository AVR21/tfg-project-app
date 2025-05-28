import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { ContentComponent } from './components/content/content.component';

export const routes: Routes = [
    {path: 'login', component: LoginComponent},
    {path: 'content', component: ContentComponent}
];
