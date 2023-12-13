import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Operando } from '../../controller/operando';
import { SharedValuesService } from '../../../services/shared-values.service';
@Component({
  selector: 'app-alu',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './alu.component.html',
  styleUrl: './alu.component.css',
})
export class AluComponent implements OnInit {
  op1: string  = '';
  op2: string = '';
  resultado: string = '';

  constructor(private sharedValuesService: SharedValuesService) {
    this.sharedValuesService.setValorOP1('-');
    this.sharedValuesService.setValorOP2('-');
    this.sharedValuesService.setValorRes('-');

  }

  ngOnInit() {
    this.sharedValuesService
      .getValorOP1()
      .subscribe((value) => (this.op1 = value));
    this.sharedValuesService
      .getValorOP2()
      .subscribe((value) => (this.op2 = value));
    this.sharedValuesService
      .getValorRes()
      .subscribe((value) => (this.resultado = value));
  }
}
