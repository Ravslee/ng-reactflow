import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
    selector: 'app-basic-node',
    templateUrl: './basic-node.component.html',
    styleUrls: ['./basic-node.component.scss'],
    imports: [
    ],
    standalone: true
})
export class BasicNodeComponent {

    @Input() data

    @Output() removeNode = new EventEmitter();

    @Output() nodeChange = new EventEmitter();
}
