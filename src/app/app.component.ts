import { Component, OnInit } from '@angular/core';
import { ThemeService } from './services/_codemono/theme.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent  {
  title = 'Orion';

  constructor(){}
}
