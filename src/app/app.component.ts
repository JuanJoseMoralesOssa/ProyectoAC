import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AluComponent } from './public/components/alu/alu.component';
import { UcComponent } from './public/components/uc/uc.component';
import { PcComponent } from './public/components/pc/pc.component';
import { IrComponent } from './public/components/ir/ir.component';
import { MarComponent } from './public/components/mar/mar.component';
import { MbrComponent } from './public/components/mbr/mbr.component';
import { BancoRegistrosComponent } from './public/components/banco-registros/banco-registros.component';
import { MemoriaComponent } from './public/components/memoria/memoria.component';
import { BusComponent } from './public/components/bus/bus.component';
import { FlechasComponent } from './public/subcomponents/flechas/flechas.component';
import { OpcionesComponent } from './public/subcomponents/opciones/opciones.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    AluComponent,
    UcComponent,
    PcComponent,
    IrComponent,
    MarComponent,
    MbrComponent,
    BancoRegistrosComponent,
    MemoriaComponent,
    BusComponent,
    FlechasComponent,
    OpcionesComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'arquiProyect';
}
