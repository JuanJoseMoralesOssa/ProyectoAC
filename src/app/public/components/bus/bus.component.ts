import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BusControlComponent } from './bus-control/bus-control.component';
import { BusDatosComponent } from './bus-datos/bus-datos.component';
import { BusDireccionesComponent } from './bus-direcciones/bus-direcciones.component';

@Component({
  selector: 'app-bus',
  standalone: true,
  imports: [
    CommonModule,
    BusControlComponent,
    BusDatosComponent,
    BusDireccionesComponent,
  ],
  templateUrl: './bus.component.html',
  styleUrl: './bus.component.css',
})
export class BusComponent {}
