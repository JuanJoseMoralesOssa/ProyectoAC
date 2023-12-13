import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedValuesService } from '../../../services/shared-values.service';

@Component({
  selector: 'app-pc',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pc.component.html',
  styleUrl: './pc.component.css',
})
export class PcComponent {
  valorPC = '-';

  constructor(
    private sharedValuesService: SharedValuesService) {
    this.sharedValuesService.setValorPC('-');
  }

  ngOnInit() {
    this.sharedValuesService
      .getValorPC()
      .subscribe((value) => (this.valorPC = value));
  }
}
