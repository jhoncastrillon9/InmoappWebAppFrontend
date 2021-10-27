import { Component, OnInit } from '@angular/core';
import { BaseComponent } from 'src/app/base/base.component';
import { AuthenticationService } from 'src/app/services/_codemono/authentication.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent extends BaseComponent  {
  title = 'Inmoapp';

  constructor(public auth: AuthenticationService) { 
super(auth);

  }

  ngOnInit(): void {
    super.ngOnInit();
  }

  esverda(): boolean {    
    return true;
  }
}
