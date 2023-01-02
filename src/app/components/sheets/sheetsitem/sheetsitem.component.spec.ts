import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SheetsitemComponent } from './sheetsitem.component';

describe('SheetsitemComponent', () => {
  let component: SheetsitemComponent;
  let fixture: ComponentFixture<SheetsitemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SheetsitemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SheetsitemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
