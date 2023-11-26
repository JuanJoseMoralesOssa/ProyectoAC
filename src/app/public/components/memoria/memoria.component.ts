import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MemoriaDatosComponent } from './memoria-datos/memoria-datos.component';
import { MemoriaInstruccionesComponent } from './memoria-instrucciones/memoria-instrucciones.component';

@Component({
  selector: 'app-memoria',
  standalone: true,
  imports: [CommonModule, MemoriaDatosComponent, MemoriaInstruccionesComponent],
  templateUrl: './memoria.component.html',
  styleUrl: './memoria.component.css'
})
export class MemoriaComponent {

}
