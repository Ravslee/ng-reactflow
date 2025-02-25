import { Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';
import * as React from 'react';
import { OnInit as ROnInit, Node, Connection, NodeChange, EdgeChange, OnConnectStartParams, ReactFlowInstance, OnSelectionChangeParams } from 'reactflow';
import { Edge, DefaultEdgeOptions, HandleType, NodeTypes, EdgeTypes, ConnectionLineType, ConnectionLineComponent, ConnectionMode, KeyCode, NodeOrigin, Viewport, CoordinateExtent, PanOnScrollMode, FitViewOptions, PanelPosition, ProOptions, OnError } from 'reactflow';
import { ReactFlowWrappableComponent } from './reactflow';
import { ReactMagicWrapperComponent } from '../react-magic-wrapper/react-magic-wrapper.component';


@Component({
    selector: 'ngx-reactflow',
    template: ``,
    styleUrls: [
        '../../../node_modules/reactflow/dist/style.css',
        './reactflow.scss'

    ],
    standalone: true,
    encapsulation: ViewEncapsulation.None
})
export class ReactFlowComponent extends ReactMagicWrapperComponent {

    override ngReactComponent = ReactFlowWrappableComponent;

    @Input() nodes?: Node<any, string | undefined>[] | undefined;
    @Input() edges?: Edge<any>[] | undefined;
    // @Input() initialNodes?: Node<any, string | undefined>[] | undefined;
    // @Input() initialEdges?: Edge<any>[] | undefined;
    @Input() defaultEdgeOptions?: DefaultEdgeOptions | undefined;

    @Output() onNodeClick = new EventEmitter<[MouseEvent, Node]>();
    @Output() onNodeDoubleClick = new EventEmitter<[MouseEvent, Node]>();
    @Output() onNodeMouseEnter = new EventEmitter<[MouseEvent, Node]>();
    @Output() onNodeMouseMove = new EventEmitter<[MouseEvent, Node]>();
    @Output() onNodeMouseLeave = new EventEmitter<[MouseEvent, Node]>();
    @Output() onNodeContextMenu = new EventEmitter<[MouseEvent, Node]>();
    @Output() onNodeDragStart = new EventEmitter<[MouseEvent, Node, Node[]]>();
    @Output() onNodeDrag = new EventEmitter<[MouseEvent, Node, Node[]]>();
    @Output() onNodeDragStop = new EventEmitter<[MouseEvent, Node, Node[]]>();
    @Output() onEdgeClick = new EventEmitter<[MouseEvent, Node]>();
    @Output() onEdgeUpdate = new EventEmitter<[any, Connection]>();
    @Output() onEdgeContextMenu = new EventEmitter<[MouseEvent, Edge]>();
    @Output() onEdgeMouseEnter = new EventEmitter<[MouseEvent, Edge]>();
    @Output() onEdgeMouseMove = new EventEmitter<[MouseEvent, Edge]>();
    @Output() onEdgeMouseLeave = new EventEmitter<[MouseEvent, Edge]>();
    @Output() onEdgeDoubleClick = new EventEmitter<[MouseEvent, Edge]>();
    @Output() onEdgeUpdateStart = new EventEmitter<[MouseEvent, Edge<any>, HandleType]>();
    @Output() onEdgeUpdateEnd = new EventEmitter<[MouseEvent, Edge<any>, HandleType]>();
    @Output() onNodesChange = new EventEmitter<[NodeChange[]]>();
    @Output() onEdgesChange = new EventEmitter<[EdgeChange[]]>();
    @Output() onNodesDelete = new EventEmitter<[Node[]]>();
    @Output() onEdgesDelete = new EventEmitter<[Edge[]]>();
    @Output() onSelectionDragStart = new EventEmitter<[MouseEvent, Node[]]>();
    @Output() onSelectionDrag = new EventEmitter<[MouseEvent, Node[]]>();
    @Output() onSelectionDragStop = new EventEmitter<[MouseEvent, Node[]]>();
    @Output() onSelectionStart = new EventEmitter<[MouseEvent]>();
    @Output() onSelectionEnd = new EventEmitter<[MouseEvent]>();
    @Output() onSelectionContextMenu = new EventEmitter<[MouseEvent, Node<any, string | undefined>[]]>();
    @Output() onConnect = new EventEmitter<[Connection]>();
    @Output() onConnectStart = new EventEmitter<[MouseEvent, OnConnectStartParams]>();
    @Output() onConnectEnd = new EventEmitter<[MouseEvent]>();
    @Output() onClickConnectStart = new EventEmitter<[MouseEvent, OnConnectStartParams]>();
    @Output() onClickConnectEnd = new EventEmitter<[MouseEvent]>();
    @Output() onInit = new EventEmitter<[ReactFlowInstance<any, any>]>();
    @Output() onMove = new EventEmitter<[MouseEvent, Viewport]>();
    @Output() onMoveStart = new EventEmitter<[MouseEvent, Viewport]>();
    @Output() onMoveEnd = new EventEmitter<[MouseEvent, Viewport]>();
    @Output() onSelectionChange = new EventEmitter<[OnSelectionChangeParams]>();
    @Output() onPaneScroll = new EventEmitter<[WheelEvent]>();
    @Output() onPaneClick = new EventEmitter<[MouseEvent]>();
    @Output() onPaneContextMenu = new EventEmitter<[MouseEvent]>();
    @Output() onPaneMouseEnter = new EventEmitter<[MouseEvent]>();
    @Output() onPaneMouseMove = new EventEmitter<[MouseEvent]>();
    @Output() onPaneMouseLeave = new EventEmitter<[MouseEvent]>();
    @Output() onError = new EventEmitter<OnError>();

    @Input() id?: string | undefined;
    @Input() nodeTypes?: NodeTypes | undefined;
    @Input() edgeTypes?: EdgeTypes | undefined;
    @Input() connectionLineType?: ConnectionLineType | undefined;
    @Input() connectionLineStyle?: React.CSSProperties | undefined;
    @Input() connectionLineComponent?: ConnectionLineComponent | undefined;
    @Input() connectionLineContainerStyle?: React.CSSProperties | undefined;
    @Input() connectionMode?: ConnectionMode | undefined;
    @Input() deleteKeyCode?: KeyCode | null | undefined;
    @Input() selectionKeyCode?: KeyCode | null | undefined;
    @Input() selectionOnDrag?: boolean | undefined;
    @Input() selectionMode?: SelectionMode | undefined;
    @Input() panActivationKeyCode?: KeyCode | null | undefined;
    @Input() multiSelectionKeyCode?: KeyCode | null | undefined;
    @Input() zoomActivationKeyCode?: KeyCode | null | undefined;
    @Input() snapToGrid?: boolean | undefined;
    @Input() snapGrid?: [number, number] | undefined;
    @Input() onlyRenderVisibleElements?: boolean | undefined;
    @Input() nodesDraggable?: boolean | undefined;
    @Input() nodesConnectable?: boolean | undefined;
    @Input() nodesFocusable?: boolean | undefined;
    @Input() nodeOrigin?: NodeOrigin | undefined;
    @Input() edgesFocusable?: boolean | undefined;
    // @Input() initNodeOrigin?: NodeOrigin | undefined;
    @Input() elementsSelectable?: boolean | undefined;
    @Input() selectNodesOnDrag?: boolean | undefined;
    @Input() panOnDrag?: boolean | number[] | undefined;
    @Input() minZoom?: number | undefined;
    @Input() maxZoom?: number | undefined;
    @Input() defaultViewport?: Viewport | undefined;
    @Input() translateExtent?: CoordinateExtent | undefined;
    @Input() preventScrolling?: boolean | undefined;
    @Input() nodeExtent?: CoordinateExtent | undefined;
    @Input() defaultMarkerColor?: string | undefined;
    @Input() zoomOnScroll?: boolean | undefined;
    @Input() zoomOnPinch?: boolean | undefined;
    @Input() panOnScroll?: boolean | undefined;
    @Input() panOnScrollSpeed?: number | undefined;
    @Input() panOnScrollMode?: PanOnScrollMode | undefined;
    @Input() zoomOnDoubleClick?: boolean | undefined;
    @Input() edgeUpdaterRadius?: number | undefined;
    @Input() noDragClassName?: string | undefined;
    @Input() noWheelClassName?: string | undefined;
    @Input() noPanClassName?: string | undefined;
    @Input() fitView?: boolean | undefined;
    @Input() fitViewOptions?: FitViewOptions | undefined;
    @Input() connectOnClick?: boolean | undefined;
    @Input() attributionPosition?: PanelPosition | undefined;
    @Input() proOptions?: ProOptions | undefined;
    @Input() elevateNodesOnSelect?: boolean | undefined;
    @Input() elevateEdgesOnSelect?: boolean | undefined;
    @Input() disableKeyboardA11y?: boolean | undefined;
    @Input() autoPanOnNodeDrag?: boolean | undefined;
    @Input() autoPanOnConnect?: boolean | undefined;
    @Input() connectionRadius?: number | undefined;
}
