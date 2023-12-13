import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedValuesService } from '../../../services/shared-values.service';

@Component({
  selector: 'app-mbr',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './mbr.component.html',
  styleUrl: './mbr.component.css',
})
export class MbrComponent {
  valorMBR = '-';

  constructor(private sharedValuesService: SharedValuesService) {
    this.sharedValuesService.setValorMBR('-');
  }

  ngOnInit() {
    this.sharedValuesService
      .getValorMBR()
      .subscribe((value) => (this.valorMBR = value));
  }
}
