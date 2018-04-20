import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { 
  DaysTypeComponent, 
  DefaultTypeComponent, 
  TypesComponent, 
  TypesDirective, 
  WebhookTypeComponent,
  ArrayTypeComponent,
  TimeTypeComponent
} from './index'

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [
    DaysTypeComponent,
    DefaultTypeComponent,
    WebhookTypeComponent,
    TypesComponent,
    TypesDirective,
    ArrayTypeComponent,
    TimeTypeComponent
  ],
  bootstrap: [
    DaysTypeComponent,
    DefaultTypeComponent,
    WebhookTypeComponent,
    ArrayTypeComponent,
    TimeTypeComponent
  ],
  exports: [
    DaysTypeComponent, 
    DefaultTypeComponent, 
    TypesComponent, 
    TypesDirective, 
    WebhookTypeComponent,
    ArrayTypeComponent,
    TimeTypeComponent
  ]
})
export class TypesModule { }
