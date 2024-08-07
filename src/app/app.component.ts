import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ReactflowDemoComponent } from "./reactflow-demo/reactflow-demo.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ReactflowDemoComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'react-flow-demo';
}
