import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedDirectionsService } from '../../../../services/shared-directions.service';

@Component({
  selector: 'app-memoria-instrucciones',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './memoria-instrucciones.component.html',
  styleUrl: './memoria-instrucciones.component.css',
})
export class MemoriaInstruccionesComponent {
  arrayInstrucciones: string[] = [];
  valor = 0;

  constructor(private sharedDirectionsService: SharedDirectionsService) {}

  ngOnInit() {
    this.sharedDirectionsService.currentInstrucciones.subscribe(
      (data) => (this.arrayInstrucciones = data)
    );
  }
}
