import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WebhookForNodeComponent } from './webhook-for-node.component';

describe('WebhookForNodeComponent', () => {
  let component: WebhookForNodeComponent;
  let fixture: ComponentFixture<WebhookForNodeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WebhookForNodeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WebhookForNodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
