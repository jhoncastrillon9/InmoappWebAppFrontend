import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-buttons',
  templateUrl: './buttons.component.html',
  styleUrls: ['./buttons.component.scss']
})
export class ButtonsComponent implements OnInit {
  public checkboxGroupForm: FormGroup;
  public radioGroupForm: FormGroup;

  model = {
    left: true,
    middle: false,
    right: false
  };

  modelTwo = 1;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.checkboxGroupForm = this.formBuilder.group({
      left: true,
      middle: false,
      right: false
    });

    this.radioGroupForm = this.formBuilder.group({
      model: 1
    });
  }

}
