import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedDirectionsService } from '../../../services/shared-directions.service';

@Component({
  selector: 'app-banco-registros',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './banco-registros.component.html',
  styleUrl: './banco-registros.component.css',
})
export class BancoRegistrosComponent {
  registros: string[] = [
    '','','',''
  ];
  registrosNombres: string[] = [
    'AL',
    'BL',
    'CL',
    'DL',
  ];
  valor = 0;

  constructor(private sharedDirectionsService: SharedDirectionsService) {}

  ngOnInit() {
    this.sharedDirectionsService.currentRegistros.subscribe(
      (data) => (this.registros = data)
    );
  }
}
