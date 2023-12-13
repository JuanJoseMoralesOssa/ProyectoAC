import { SharedDirectionsService } from '../../services/shared-directions.service';
import { SharedValuesService } from '../../services/shared-values.service';
import { ALU } from './alu';
import { Helper } from './helper';
import { UC } from './uc/uc';

export class Exec {
  uc = new UC();
  alu = new ALU(this.sharedValuesService);
  elementoUC = document.getElementById('uc');
  elementoPC = document.getElementById('pc');
  elementoMAR = document.getElementById('mar');
  elementoMBR = document.getElementById('mbr');
  elementoIR = document.getElementById('ir');
  elementoALU = document.getElementById('alu');
  elementoBR = document.getElementById('br');
  elementoMemoInstr = document.getElementById('memoria-instrucciones');
  elementoMemoDatos = document.getElementById('memoria-datos');
  valorMAR = '';
  valorMBR = '';
  valorIR = '';
  valorPC = '';
  res = '';

  codops = [
    'ADD',
    'SUB',
    'MUL',
    'DIV',
    'MOD',
    'CMP',
    'AND',
    'OR',
    'NOT',
    'MOV',
  ];

  constructor(
    private sharedDirectionsService: SharedDirectionsService,
    private sharedValuesService: SharedValuesService
  ) {
    this.execute();
    this.sharedValuesService
      .getValorMAR()
      .subscribe((value) => (this.valorMAR = value));
    this.sharedValuesService
      .getValorMBR()
      .subscribe((value) => (this.valorMBR = value));
    this.sharedValuesService
      .getValorIR()
      .subscribe((value) => (this.valorIR = value));
    this.sharedValuesService
      .getValorPC()
      .subscribe((value) => (this.valorPC = value));
    this.sharedValuesService
      .getValorRes()
      .subscribe((value) => (this.res = value));
  }

  private async execute() {
    console.log('Ejecutando');
    await this.fetchI();
    await this.decoInst();
  }

  ///////////////////////////////////////////////////////77

  private async fetchI() {
    let color = '#ffd100';
    this.sharedValuesService.setValorPC('0');
    await this.uc.empezarSenal(this.elementoUC!, color);
    await this.leerEscribirPCMAR();
    await this.leerUCMemoriaInstr();
    await this.leerMARMemoriaInstrucciones();
    await this.escribirMemoInstrMBR();
    await this.modificarIR();
  }

  async leerEscribirPCMAR() {
    let color = 'red';
    await this.uc.empezarSenal(this.elementoPC!, color).then(async () => {
      this.sharedValuesService.setValorMAR('0');
      this.uc.empezarSenal(this.elementoPC!, color);
      this.uc.empezarSenal(this.elementoMAR!, color);
      await this.uc.sleep(2000);
    });
  }

  async leerUCMemoriaInstr() {
    let color = 'blue';
    await this.uc.empezarSenal(this.elementoUC!, color).then(async () => {
      this.uc.empezarSenal(this.elementoUC!, color);
      this.uc.empezarSenal(this.elementoMemoInstr!, color);
      await this.uc.sleep(2000);
    });
  }

  async leerMARMemoriaInstrucciones() {
    let color = '#00FF26';
    await this.uc.empezarSenal(this.elementoMAR!, color).then(async () => {
      this.uc.empezarSenal(this.elementoMAR!, color);
      this.uc.empezarSenal(this.elementoMemoInstr!, color);
      await this.uc.sleep(2000);
    });
  }

  async escribirMemoInstrMBR() {
    let color = '#a2a5a7';
    await this.uc
      .empezarSenal(this.elementoMemoInstr!, color)
      .then(async () => {
        this.uc.empezarSenal(this.elementoMemoInstr!, color);
        this.uc.empezarSenal(this.elementoMBR!, color);
        this.getValMARMemoInstr();
        this.modificarMBR(this.valorMBR);
        await this.uc.sleep(2000);
      });
  }

  getValMARMemoInstr() {
    let i = parseInt(this.valorMAR);
    this.valorMBR = this.sharedDirectionsService.getInstruccion(i);
  }

  modificarMBR(valorMBR: string) {
    this.sharedValuesService.setValorMBR(valorMBR);
  }

  async modificarIR() {
    let color = 'red';
    await this.uc.empezarSenal(this.elementoMBR!, color).then(async () => {
      this.uc.empezarSenal(this.elementoMBR!, color);
      this.uc.empezarSenal(this.elementoIR!, color);
      this.sharedValuesService.setValorIR(this.valorMBR);
      await this.uc.sleep(2000);
    });
  }

  //////////////////////////////////////////////////////////////7

  private async decoInst() {
    await this.moveInstIRUC();
    return await new Promise((resolve) => {
      resolve(true);
    });
  }

  async moveInstIRUC() {
    let color = 'red';
    await this.uc.empezarSenal(this.elementoIR!, color).then(async () => {
      this.uc.empezarSenal(this.elementoIR!, color);
      this.uc.empezarSenal(this.elementoUC!, color);
      this.sharedValuesService.setValorIR(this.valorMBR);
      this.identificarInstUC();
      await this.uc.sleep(2000);
    });
  }

  async identificarInstUC() {
    let array = Helper.splitString(this.valorIR);
    for (let index = 0; index < array.length; index++) {
      const element = array[index];
    }
    if (array.length < 0) {
      return;
    }
    let codop = array[0];
    let dirOp1 = array[1];
    let dirOp2 = array[2];
    let dirRes = array[3];

    if ('MOV' != codop) {
      await this.moveInstr();
    }

    await this.calcularDirOp(dirOp1, dirOp2, dirRes);
    await this.moverBRALU(dirOp1, dirOp2);
    await this.execUCALU(codop);
    await this.moverUCMAR(dirRes);

    this.modificarMBR(this.res);
    await this.escribirUCMemoDatos();
    await this.escribirMARMemoDatos();
    await this.escribirMBRMemoDatos(dirRes, this.res);
    await this.calculNextInstr();
  }

  async moveInstr() {}

  async calcularDirOp(dirOp1: string, dirOp2: string, dirRes: string) {
    await this.moverOpBC(dirOp1);
    await this.moverOpBC(dirOp2);
  }

  async moverOpBC(dirOp: string) {
    await this.moverUCMAR(dirOp);
    await this.leerUCMemoriaDatos();
    await this.leerMARMemoriaDatos();
    await this.escribirMemoDatosMBR();
    await this.modificarMBR_BR();
  }

  async moverUCMAR(dirOp: string) {
    let color = 'red';
    await this.uc.empezarSenal(this.elementoUC!, color).then(async () => {
      this.uc.empezarSenal(this.elementoUC!, color);
      this.uc.empezarSenal(this.elementoMAR!, color);
      this.sharedValuesService.setValorMAR(dirOp);
      await this.uc.sleep(2000);
    });
  }

  async leerUCMemoriaDatos() {
    let color = 'blue';
    await this.uc.empezarSenal(this.elementoUC!, color).then(async () => {
      this.uc.empezarSenal(this.elementoUC!, color);
      this.uc.empezarSenal(this.elementoMemoDatos!, color);
      await this.uc.sleep(2000);
    });
  }

  async leerMARMemoriaDatos() {
    let color = '#00FF26';
    await this.uc.empezarSenal(this.elementoMAR!, color).then(async () => {
      this.uc.empezarSenal(this.elementoMAR!, color);
      this.uc.empezarSenal(this.elementoMemoDatos!, color);
      await this.uc.sleep(2000);
    });
  }

  async escribirMemoDatosMBR() {
    let color = '#a2a5a7';
    await this.uc
      .empezarSenal(this.elementoMemoDatos!, color)
      .then(async () => {
        this.uc.empezarSenal(this.elementoMemoDatos!, color);
        this.uc.empezarSenal(this.elementoMBR!, color);
        this.getValMARMemoDatos();
        this.modificarMBR(this.valorMBR);
        await this.uc.sleep(2000);
      });
  }

  getValMARMemoDatos() {
    let i = parseInt(this.valorMAR);
    this.valorMBR = this.sharedDirectionsService.getDato(i);
  }

  async modificarMBR_BR() {
    let color = 'red';
    await this.uc.empezarSenal(this.elementoMBR!, color).then(async () => {
      this.uc.empezarSenal(this.elementoMBR!, color);
      this.uc.empezarSenal(this.elementoBR!, color);
      this.sharedDirectionsService.pushDataRegistros(this.valorMBR);
      await this.uc.sleep(2000);
    });
  }

  async moverBRALU(dirOp1: string, dirOp2: string) {
    let color = 'red';
    await this.uc.empezarSenal(this.elementoBR!, color).then(async () => {
      this.uc.empezarSenal(this.elementoALU!, color);
      this.uc.empezarSenal(this.elementoALU!, color);
      let i1 = parseInt(dirOp1);
      let i2 = parseInt(dirOp2);
      let op1 = this.sharedDirectionsService.getDato(i1);
      let op2 = this.sharedDirectionsService.getDato(i2);
      this.sharedValuesService.setValorOP1(op1);
      this.sharedValuesService.setValorOP2(op2);
      await this.uc.sleep(2000);
    });
  }

  async execUCALU(codop: string) {
    let color = 'red';
    await this.uc.empezarSenal(this.elementoUC!, color).then(async () => {
      this.uc.empezarSenal(this.elementoALU!, color);
      this.uc.empezarSenal(this.elementoALU!, color);
      this.alu.realizarOperacion(codop);
      await this.uc.sleep(2000);
    });
  }

  async escribirUCMemoDatos() {
    let color = 'blue';
    await this.uc.empezarSenal(this.elementoUC!, color).then(async () => {
      this.uc.empezarSenal(this.elementoUC!, color);
      this.uc.empezarSenal(this.elementoMemoDatos!, color);
      await this.uc.sleep(2000);
    });
  }

  async escribirMARMemoDatos() {
    let color = '#00FF26';
    await this.uc.empezarSenal(this.elementoMAR!, color).then(async () => {
      this.uc.empezarSenal(this.elementoMAR!, color);
      this.uc.empezarSenal(this.elementoMemoDatos!, color);
      await this.uc.sleep(2000);
    });
  }

  async escribirMBRMemoDatos(dir1: string, valor: string) {
    let dir = parseInt(dir1);
    let color = '#a2a5a7';
    await this.uc.empezarSenal(this.elementoMBR!, color).then(async () => {
      this.uc.empezarSenal(this.elementoMBR!, color);
      this.uc.empezarSenal(this.elementoMemoDatos!, color);
      this.sharedDirectionsService.insertarMemoDatos(dir, valor);
      await this.uc.sleep(2000);
    });
  }
  //////////////////////////////////////////////////////

  async calculNextInstr() {
    await this.moverPCALU();
    await this.moverALUBR();
    await this.moverBRPC();
  }

  async moverPCALU() {
    let color = 'red';
    await this.uc.empezarSenal(this.elementoPC!, color).then(async () => {
      this.uc.empezarSenal(this.elementoPC!, color);
      this.uc.empezarSenal(this.elementoALU!, color);
      this.sharedValuesService.setValorOP1(this.valorPC);
      this.sharedValuesService.setValorOP2('1');
      this.alu.realizarOperacion('ADD');
      await this.uc.sleep(2000);
    });
  }

  async moverALUBR() {
    let color = 'red';
    await this.uc.empezarSenal(this.elementoALU!, color).then(async () => {
      this.uc.empezarSenal(this.elementoALU!, color);
      this.uc.empezarSenal(this.elementoBR!, color);
      this.sharedDirectionsService.pushDataRegistros(this.res);
      await this.uc.sleep(2000);
    });
  }

  async moverBRPC() {
    let color = 'red';
    await this.uc.empezarSenal(this.elementoBR!, color).then(async () => {
      this.uc.empezarSenal(this.elementoBR!, color);
      this.uc.empezarSenal(this.elementoPC!, color);
      this.sharedValuesService.setValorPC(this.res);
      await this.uc.sleep(2000);
    });
  }
}
