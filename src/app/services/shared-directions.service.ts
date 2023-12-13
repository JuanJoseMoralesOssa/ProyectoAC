import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SharedDirectionsService {
  private dataInstrucciones = new BehaviorSubject<string[]>([]);
  private dataDatos = new BehaviorSubject<string[]>([]);
  private dataRegistros = new BehaviorSubject<string[]>([]);
  currentDatos = this.dataDatos.asObservable();
  currentInstrucciones = this.dataInstrucciones.asObservable();
  currentRegistros = this.dataRegistros.asObservable();
  sobreEscribir = 0;

  constructor() {}

  pushDataDatos(value: string) {
    this.dataDatos.value.push(value);
    this.dataDatos.next(this.dataDatos.value);
  }

  pushDataInstrucciones(value: string) {
    this.dataInstrucciones.value.push(value);
    this.dataInstrucciones.next(this.dataInstrucciones.value);
  }

  pushDataRegistros(value: string) {
    if (this.dataRegistros.value.length == 4) {
      this.dataRegistros.value[this.sobreEscribir] = value;
      this.sobreEscribir += 1;
    } else {
      this.dataRegistros.value.push(value);
    }
    this.dataRegistros.next(this.dataRegistros.value);
  }

  getInstruccion(valor: number) {
    return this.dataInstrucciones.value[valor];
  }

  getDato(valor: number) {
    return this.dataDatos.value[valor];
  }

  getRegistro(valor: number) {
    return this.dataRegistros.value[valor];
  }

  insertarMemoDatos(posicion: number, elemento: any) {
    if (posicion < this.dataDatos.value.length) {
      this.dataDatos.value[posicion] = elemento;
    } else {
      this.dataDatos.value.splice(posicion, 0, elemento);
    }
  }
}
