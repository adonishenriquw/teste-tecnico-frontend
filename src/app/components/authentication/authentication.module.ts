import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { AuthenticationComponent } from './authentication.component';
import {MatCardModule} from '@angular/material/card';

@NgModule({
  declarations: [AuthenticationComponent],
  imports: [CommonModule, MatFormFieldModule, MatButtonModule, MatInputModule, MatCardModule],
  exports: [AuthenticationComponent]
})
export class AuthenticationModule {}
