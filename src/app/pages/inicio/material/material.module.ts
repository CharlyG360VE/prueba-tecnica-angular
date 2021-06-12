import { NgModule } from '@angular/core';
/* Imports modulos de angular material */
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [],
  imports: [
    MatCardModule,
    MatCheckboxModule,
    MatButtonModule
  ],
  exports: [
    MatCardModule,
    MatCheckboxModule,
    MatButtonModule
  ]
})
export class MaterialModule { }
