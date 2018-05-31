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
  TimeTypeComponent,
  ObjectTypeComponent,
  CheckTypeComponent,
  ScanProfileTypeComponent,
  HashObjectTypeComponent,
  TextTypeComponent
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
    TimeTypeComponent,
    ObjectTypeComponent,
    CheckTypeComponent,
    ScanProfileTypeComponent,
    HashObjectTypeComponent,
    TextTypeComponent
  ],
  bootstrap: [
    DaysTypeComponent,
    DefaultTypeComponent,
    WebhookTypeComponent,
    ArrayTypeComponent,
    TimeTypeComponent,
    ObjectTypeComponent,
    CheckTypeComponent,
    ScanProfileTypeComponent,
    HashObjectTypeComponent,
    TextTypeComponent
  ],
  exports: [
    DaysTypeComponent,
    DefaultTypeComponent,
    TypesComponent,
    TypesDirective,
    WebhookTypeComponent,
    ArrayTypeComponent,
    TimeTypeComponent,
    ObjectTypeComponent,
    CheckTypeComponent,
    ScanProfileTypeComponent,
    HashObjectTypeComponent,
    TextTypeComponent
  ]
})
export class TypesModule { }
