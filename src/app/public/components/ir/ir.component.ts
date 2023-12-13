import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedValuesService } from '../../../services/shared-values.service';

@Component({
  selector: 'app-ir',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ir.component.html',
  styleUrl: './ir.component.css',
})
export class IrComponent {
  valorIR = '-';

  constructor(private sharedValuesService: SharedValuesService) {
    this.sharedValuesService.setValorIR('-');
  }

  ngOnInit() {
    this.sharedValuesService
      .getValorIR()
      .subscribe((value) => (this.valorIR = value));
  }
}
