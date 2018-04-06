import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WebhookNewComponent } from './webhook-new.component';

describe('WebhookNewComponent', () => {
  let component: WebhookNewComponent;
  let fixture: ComponentFixture<WebhookNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WebhookNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WebhookNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
