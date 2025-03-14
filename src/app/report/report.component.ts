import { Component } from '@angular/core';
import { TopBarComponent } from '../top-bar/top-bar.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-report',
  imports: [FormsModule, CommonModule, ButtonModule],
  standalone: true,
  templateUrl: './report.component.html',
  styleUrl: './report.component.css',
})
export class ReportComponent {
  showFiller = false;
}
