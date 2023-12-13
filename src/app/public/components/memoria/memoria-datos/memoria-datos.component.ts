import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedDirectionsService } from '../../../../services/shared-directions.service';

@Component({
  selector: 'app-memoria-datos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './memoria-datos.component.html',
  styleUrl: './memoria-datos.component.css',
})
export class MemoriaDatosComponent implements OnInit {
  datos: string[] = [];
  valor = 0;

  constructor(private sharedDirectionsService: SharedDirectionsService) {}

  ngOnInit() {
    this.sharedDirectionsService.currentDatos.subscribe(
      (data) => (this.datos = data)
    );
  }
}
