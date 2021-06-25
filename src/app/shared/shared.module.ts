import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingSpinerComponent } from './loading-spiner/loading-spiner.component';
import { AlertComponent } from '../alert/alert/alert.component';
import { PlaceholderDirective } from './placeholder.directive';
import { DropdownDirective } from './dropdown/dropdown.directive';

@NgModule({
  declarations: [
    LoadingSpinerComponent,
    AlertComponent,
    PlaceholderDirective,
    DropdownDirective,
  ],
  imports: [CommonModule],
  exports: [
    LoadingSpinerComponent,
    AlertComponent,
    PlaceholderDirective,
    DropdownDirective,
    CommonModule,
  ],
})
export class SharedModule {}
