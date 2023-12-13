import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedDirectionsService } from '../../../services/shared-directions.service';
import { Exec } from '../../controller/exec';
import { SharedValuesService } from '../../../services/shared-values.service';
import { Helper } from '../../controller/helper';

@Component({
  selector: 'app-opciones',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './opciones.component.html',
  styleUrl: './opciones.component.css',
})
export class OpcionesComponent {
  num1 = 0;
  num2 = 0;

  constructor(
    private sharedDirectionsService: SharedDirectionsService,
    private sharedValuesService: SharedValuesService
  ) {
    this.sharedDirectionsService.currentDatos.subscribe((data) =>
      console.log(data)
    );
  }

  agregarDato(valor: any) {
    this.sharedDirectionsService.pushDataDatos(valor);
  }

  agregarInstruccion(valor: any) {
    this.sharedDirectionsService.pushDataInstrucciones(valor);
  }

  // cambiarDato(dato: any) {
  //   this.sharedDirectionsService.changeData(dato);
  // }

  captarNumeros() {
    let op1 = prompt('Ingresa el primer numero', '');
    let op2 = prompt('Ingresa el segundo numero', '');

    if (op1 == null || op2 == null) {
      return;
    }

    this.num1 = parseInt(op1);
    this.num2 = parseInt(op2);

    console.log('num1: ' + this.num1 + ' num2: ' + this.num2);
    this.agregarDato(this.num1);
    this.agregarDato(this.num2);
  }

  // sumar() {
  //   this.cambiarDato((this.num1 + this.num2).toString());
  // }

  // restar() {
  //   this.cambiarDato((this.num1 - this.num2).toString());
  // }

  // multiplicar() {
  //   this.cambiarDato((this.num1 * this.num2).toString());
  // }

  operacionesLogicas() {
    let op = prompt(
      `
      Comparar: 1
      Negar: 2
    `,
      ''
    );

    if (op == null) {
      return;
    }

    let array = Helper.splitString(op);
    let codop = array[0];

    let instruccion = '';
    switch (codop) {
      case '1':
        instruccion = 'CMP';
        break;
      case '2':
        instruccion = 'NOT';
        break;
      default:
        instruccion = 'NOP';
        break;
    }

    let dirOp1 = array[1];
    if (dirOp1 == null) {
      return;
    }
    instruccion += ',' + dirOp1;

    let dirOp2 = array[2];
    if (dirOp2 == null) {
      return;
    }
    instruccion += ',' + dirOp2;

    let dirRes = array[3];
    if (dirRes == null) {
      return;
    }
    instruccion += ',' + dirRes;


    this.agregarInstruccion(instruccion);
  }

  operacionesAritmeticas() {
    let op = prompt(
      `
      Sumar: 1
      Restar: 2
      Multiplicar: 3
      Dividir: 4
    `,
      ''
    );

    if (op == null) {
      return;
    }

    let array = Helper.splitString(op);
    console.log(array);
    let codop = array[0];

    let instruccion = '';
    switch (codop) {
      case '1':
        instruccion = 'ADD';
        break;
      case '2':
        instruccion = 'SUB';
        break;
      case '3':
        instruccion = 'MUL';
        break;
      case '4':
        instruccion = 'DIV';
        break;
      default:
        instruccion = 'NOP';
        break;
    }

    let dirOp1 = array[1];
    if (dirOp1 == null) {
      return;
    }
    instruccion += ',' + dirOp1;

    let dirOp2 = array[2];
    if (dirOp2 == null) {
      return;
    }
    instruccion += ',' + dirOp2;

    let dirRes = array[3];
    if (dirRes == null) {
      return;
    }
    instruccion += ',' + dirRes;

    this.agregarInstruccion(instruccion);
  }

  ejecutar() {
    const exec = new Exec(
      this.sharedDirectionsService,
      this.sharedValuesService
    );
  }
}
