import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SharedValuesService {
  private valorPC = new BehaviorSubject<string>('0');
  private valorMAR = new BehaviorSubject<string>('0');
  private valorMBR = new BehaviorSubject<string>('0');
  private valorIR = new BehaviorSubject<string>('0');
  private valorOP1 = new BehaviorSubject<string>('0');
  private valorOP2 = new BehaviorSubject<string>('0');
  private valorRes = new BehaviorSubject<string>('0');

  constructor() {}

  setValorPC(value: string) {
    this.valorPC.next(value);
    setTimeout(() => {});
  }

  getValorPC() {
    return this.valorPC.asObservable();
  }

  setValorMAR(value: string) {
    this.valorMAR.next(value);
    setTimeout(() => {});
  }

  getValorMAR() {
    return this.valorMAR.asObservable();
  }

  setValorMBR(value: string) {
    this.valorMBR.next(value);
    setTimeout(() => {});
  }

  getValorMBR() {
    return this.valorMBR.asObservable();
  }

  setValorIR(value: string) {
    this.valorIR.next(value);
    setTimeout(() => {});
  }

  getValorIR() {
    return this.valorIR.asObservable();
  }

  setValorOP1(value: string) {
    this.valorOP1.next(value);
    setTimeout(() => {});
  }

  getValorOP1() {
    return this.valorOP1.asObservable();
  }

  setValorOP2(value: string) {
    this.valorOP2.next(value);
    setTimeout(() => {});
  }

  getValorOP2() {
    return this.valorOP2.asObservable();
  }

  setValorRes(value: string) {
    this.valorRes.next(value);
    setTimeout(() => {});
  }

  getValorRes() {
    return this.valorRes.asObservable();
  }
}
