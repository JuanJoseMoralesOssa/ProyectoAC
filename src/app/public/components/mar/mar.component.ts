import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedValuesService } from '../../../services/shared-values.service';

@Component({
  selector: 'app-mar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './mar.component.html',
  styleUrl: './mar.component.css',
})
export class MarComponent {
  valorMAR = '-';

  constructor(private sharedValuesService: SharedValuesService) {
    this.sharedValuesService.setValorMAR('-');
  }

  ngOnInit() {
    this.sharedValuesService
      .getValorMAR()
      .subscribe((value) => (this.valorMAR = value));
  }
}
