import { SharedValuesService } from '../../services/shared-values.service';

export class ALU {
  op1 = '';
  op2 = '';
  res = '';

  constructor(private sharedValuesService: SharedValuesService) {
    this.sharedValuesService
      .getValorOP1()
      .subscribe((value) => (this.op1 = value));
    this.sharedValuesService
      .getValorOP2()
      .subscribe((value) => (this.op2 = value));
    this.sharedValuesService
      .getValorRes()
      .subscribe((value) => (this.res = value));
  }

  async realizarOperacion(codop: string) {
    let res = 0;

    switch (codop) {
      case 'ADD':
        res = Number(this.op1) + Number(this.op2);
        break;
      case 'SUB':
        res = Number(this.op1) - Number(this.op2);
        break;
      case 'MUL':
        res = Number(this.op1) * Number(this.op2);
        break;
      case 'DIV':
        res = Number(this.op1) / Number(this.op2);
        break;
      case 'MOD':
        res = Number(this.op1) % Number(this.op2);
        break;
      case 'CMP':
        res = Number(this.op1 == this.op2);
        break;
      case 'AND':
        res = Number(this.op1 && this.op2);
        break;
      case 'OR':
        res = Number(this.op1 || this.op2);
        break;
      case 'NCMP':
        res = Number(this.op1 != this.op2);
        break;
      default:
        return;
    }
    this.res = res.toString();
    this.sharedValuesService.setValorRes(this.res)
  }
}
