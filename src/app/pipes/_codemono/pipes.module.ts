import { NgModule } from '@angular/core';

import { ImagePipe } from './image.pipe';
import { CustomDatePipe } from './custom.date.pipe';


@NgModule({
  declarations: [
    ImagePipe,
    CustomDatePipe
  ],
  exports: [
    ImagePipe,
    CustomDatePipe
  ]
})
export class PipesModule { }
