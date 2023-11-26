import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-alu',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './alu.component.html',
  styleUrl: './alu.component.css'
})
export class AluComponent {

  op1 = 0;
  op2 = 0;
  resultado = "resultado";


}
