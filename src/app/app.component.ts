import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { EPFTableComponent } from './EPF/epftable/epftable.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,EPFTableComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'EPFTable';
}
