import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MemoriaDatosComponent } from './memoria-datos.component';

describe('MemoriaDatosComponent', () => {
  let component: MemoriaDatosComponent;
  let fixture: ComponentFixture<MemoriaDatosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MemoriaDatosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MemoriaDatosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
