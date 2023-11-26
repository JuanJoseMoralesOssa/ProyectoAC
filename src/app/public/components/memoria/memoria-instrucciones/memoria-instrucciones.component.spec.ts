import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MemoriaInstruccionesComponent } from './memoria-instrucciones.component';

describe('MemoriaInstruccionesComponent', () => {
  let component: MemoriaInstruccionesComponent;
  let fixture: ComponentFixture<MemoriaInstruccionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MemoriaInstruccionesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MemoriaInstruccionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
