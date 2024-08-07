import { ApplicationRef, Component, Inject, Injector, NgZone, ViewChild } from '@angular/core';
import React from 'react';
import { Edge, applyNodeChanges, Handle, MarkerType, Position, Node } from 'reactflow';
// import dagre from '@dagrejs/dagre';
import ELK from 'elkjs/lib/elk.bundled';

import { TargetNodeComponent } from './target-node/target-node.component';
import { SourceNodeComponent } from './source-node/source-node.component';
import { BasicNodeComponent } from './basic-node/basic-node.component';
import { pipeline } from './pipeline';
import { ReactFlowComponent } from './reactflow-wrapper';
import { ReactMagicWrapperComponent } from '../react-magic-wrapper/react-magic-wrapper.component';



@Component({
    selector: 'app-reactflow',
    templateUrl: './reactflow-demo.component.html',
    styleUrls: ['./reactflow-demo.component.scss'],
    imports: [
        ReactFlowComponent
    ],
    standalone: true
})
export class ReactflowDemoComponent {
    @ViewChild(ReactFlowComponent) reactFlow: ReactFlowComponent;

    pipeline = pipeline;

    dataset = {
        entities: [{
            entityName: "source",
            entityId: "id-s"
        },
        {
            entityName: "create clamshell",
            entityId: "id-a"
        },

        {
            entityName: "create motor",
            entityId: "id-b"
        },

        {
            entityName: "create battery",
            entityId: "id-c"
        },

        {
            entityName: "assemble",
            entityId: "id-d"
        },
        {
            entityName: "target",
            entityId: "id-t"
        }]
        ,
        entitiesLineage: [
            {
                entitiesLineageId: "id-s-id-a",
                sourceEntityId: "id-s",
                targetEntityId: "id-a"
            },
            {
                entitiesLineageId: "id-s-id-b",
                sourceEntityId: "id-s",
                targetEntityId: "id-b"
            },
            {
                entitiesLineageId: "id-s-id-c",
                sourceEntityId: "id-s",
                targetEntityId: "id-c"
            },

            {
                entitiesLineageId: "id-a-id-d",
                sourceEntityId: "id-a",
                targetEntityId: "id-d"
            },
            {
                entitiesLineageId: "id-b-id-d",
                sourceEntityId: "id-b",
                targetEntityId: "id-d"
            },
            {
                entitiesLineageId: "id-c-id-d",
                sourceEntityId: "id-c",
                targetEntityId: "id-d"
            },

            {
                entitiesLineageId: "id-d-id-t",
                sourceEntityId: "id-d",
                targetEntityId: "id-t"
            },
        ]
    }

    items = [];

    nodes = [];
    edges = [];

    nodeTypes = {
        basic: ReactMagicWrapperComponent.WrapAngularComponent({
            component: BasicNodeComponent,
            appRef: this.appRef,
            injector: this.injector,
            ngZone: this.ngZone,
            staticInputs: {},
            staticOutputs: {
                removeNode: ({ data }) => {
                    const index = this.pipeline.stages.findIndex(s => s.id == data.id);
                    this.pipeline.stages.splice(index, 1);
                    this.renderGraph();
                },

            },
            additionalChildren: [
                React.createElement(Handle, { type: "target", position: Position.Left }),
                React.createElement(Handle, { type: "source", position: Position.Right })
            ]
        }),
        source: ReactMagicWrapperComponent.WrapAngularComponent({
            component: SourceNodeComponent,
            appRef: this.appRef,
            injector: this.injector,
            ngZone: this.ngZone,
            staticInputs: {
                // inputs
            },
            staticOutputs: {
                // outputs
            },
            additionalChildren: [
                React.createElement(Handle, { type: "source", position: Position.Right })
            ]
        }),
        target: ReactMagicWrapperComponent.WrapAngularComponent({
            component: TargetNodeComponent,
            appRef: this.appRef,
            injector: this.injector,
            ngZone: this.ngZone,
            staticInputs: {
                // inputs
            },
            staticOutputs: {
                // outputs
            },
            additionalChildren: [
                React.createElement(Handle, { type: "target", position: Position.Left })
            ]
        })
    }

    constructor(
        private readonly appRef: ApplicationRef,
        private readonly injector: Injector,
        private readonly ngZone: NgZone
    ) {

    }

    ngOnInit() {
        this.generateDump(5);
        this.renderGraph();

        setTimeout(() => {
            this.renderGraph();
        }, 4000)
    }

    generateDump(noOfNodes) {
        // const nodes = [];
        // const edges = [];
        // for(let i = 0; i < noOfNodes; i++){
        //     nodes.push({
        //         entityUId: `node-abx-${i}`,
        //         entityName: `node-${i}`,
        //         properties: []
        //     });
        // }
        // this.dataset.entities
    }

    renderGraph() {
        const edgess: Edge[] = [];
        const nodess: Node[] = [];

        this.dataset.entities.forEach((entity) => {
            const node: Node = {
                id: entity.entityId,
                width: 200,
                height: 150,
                type: "basic",
                data: {
                    ...entity

                } as any,
                targetPosition: null,
                sourcePosition: null,
                position: {
                    x: 0,
                    y: 0
                }
            }
            nodess.push(node);
        });

        this.dataset.entitiesLineage.forEach((lineage) => {
            const edge = {
                source: lineage.sourceEntityId,
                target: lineage.targetEntityId,
                id: lineage.sourceEntityId + "." + lineage.targetEntityId,
                sourceHandle: "source",
                type: "default",
                markerEnd: {
                    type: MarkerType.Arrow,
                    width: 20,
                    height: 20,
                    color: '#FF0072',
                },
                style: {
                    strokeWidth: 1,
                    stroke: '#00c7ff',
                },
                data: {
                }
            }

            edgess.push(edge);
        });

        const elk = new ELK();
        const elkOptions = {
            'elk.algorithm': 'layered',
            'elk.layered.spacing.nodeNodeBetweenLayers': '200',
            'elk.spacing.nodeNode': '80',
        };


        this.getLayoutedElements(elk, nodess, edgess, elkOptions)
            .then(
                ({ nodes: layoutedNodes, edges: layoutedEdges }) => {
                    this.nodes = layoutedNodes
                    this.edges = layoutedEdges

                    //   window.requestAnimationFrame(() => fitView());
                },
            );


        return;
        // //
        // if (!this.pipeline) return;

        // const edges = [];
        // const nodes = this.pipeline.stages?.map(stage => {
        //     for (const precedingStageId of (stage.stageTrigger ?? [])) {
        //         const source = stage.stageTrigger?.length < 1
        //             ? '_source'
        //             : precedingStageId.split(':')[1];
        //         const target = stage.id.split(':')[1];

        //         edges.push({
        //             source: source,
        //             target: target,
        //             id: source + "." + target,
        //             sourceHandle: "source",
        //             type: "smoothstep",
        //             style: {
        //                 strokeWidth: 2,
        //                 stroke: '#00c7ff',
        //             },
        //             data: {
        //                 source: this.pipeline.stages.find(s => s.id == precedingStageId),
        //                 target: stage
        //             }
        //         });

        //         const descendants = this.pipeline.stages.filter(s => s.stageTrigger?.includes(stage.id));
        //         if (descendants.length == 0) {
        //             edges.push({
        //                 source: target,
        //                 target: "_target",
        //                 id: source + "_target",
        //                 sourceHandle: "source",
        //                 type: "smoothstep",
        //                 style: {
        //                     strokeWidth: 2,
        //                     stroke: '#009688',
        //                 }
        //             });
        //         }
        //     }

        //     if (stage.stageTrigger?.length == 0) {
        //         edges.push({
        //             source: "_source",
        //             target: stage.id.split(":")[1],
        //             id: "source_" + stage.id,
        //             sourceHandle: "source",
        //             type: "smoothstep",
        //             style: {
        //                 strokeWidth: 2,
        //                 stroke: '#009688',
        //             }
        //         });
        //     }

        //     return {
        //         id: stage.id.split(':')[1],
        //         width: 200,
        //         height: 80,
        //         type: "basic",
        //         data: stage,
        //         style: {
        //             // "--background": stage.id == this.selectedStage?.id
        //             //     ? "#6d6d6d"
        //             //     : "#4b4b4b",
        //             // "--background-hover": stage.id == this.selectedStage?.id
        //             //     ? "#7f7f7f"
        //             //     : "#595959",
        //             // "--border-color": stage.id == this.selectedStage?.id
        //             //     ? "#00c7ff"
        //             //     : "#0000"
        //         } as any, // react doesn't have typing for CSS variables.
        //         position: {
        //             x: 0,
        //             y: 0
        //         }
        //     };
        // }) ?? [];

        // nodes.push({
        //     id: "_source",
        //     width: 64,
        //     height: 64,
        //     type: "source",
        //     data: {

        //     } as any,
        //     targetPosition: null,
        //     sourcePosition: null,
        //     position: {
        //         x: 0,
        //         y: 0
        //     }
        // } as any);
        // nodes.push({
        //     id: "_target",
        //     width: 64,
        //     height: 64,
        //     type: "target",
        //     data: {

        //     } as any,
        //     targetPosition: null,
        //     sourcePosition: null,
        //     position: {
        //         x: 0,
        //         y: 0
        //     }
        // } as any);

        // const dagreGraph = new dagre.graphlib.Graph();

        // dagreGraph.setDefaultEdgeLabel(() => ({}));
        // dagreGraph.setGraph({ rankdir: 'LR' });

        // nodes.forEach(node => dagreGraph.setNode(node.id, { height: node.height, width: node.width + 50 }));
        // edges.forEach(edge => dagreGraph.setEdge(edge.source, edge.target));

        // dagre.layout(dagreGraph);

        // nodes.forEach((node) => {
        //     const nodeWithPosition = dagreGraph.node(node.id);

        //     const newX = nodeWithPosition.x - node.width / 2;
        //     const newY = nodeWithPosition.y - node.height / 2;

        //     // Offset the entire grid so we don't need to pan the view initially.
        //     node.position = {
        //         x: newX + 20,
        //         y: newY + 20,
        //     };
        // });
        // console.log({
        //     nodes,
        //     edges
        // })
        // this.edges = edges;
        // this.nodes = nodes;
    }



    nodeChange(changes) {
        this.ngZone.run(() => {
            this.nodes = applyNodeChanges(changes[0], this.nodes);

        })

        // console.log(result);
        // this.renderGraph();

        // applyNodeChanges(changes, node)
    }


    getLayoutedElements(elk, nodes, edges, options = {}) {
        const isHorizontal = options?.['elk.direction'] === 'RIGHT';
        const graph = {
            id: 'root',
            layoutOptions: options,
            children: nodes.map((node) => ({
                ...node,
                // Adjust the target and source handle positions based on the layout
                // direction.
                targetPosition: isHorizontal ? 'left' : 'top',
                sourcePosition: isHorizontal ? 'right' : 'bottom',

                // Hardcode a width and height for elk to use when layouting.
                width: 150,
                height: 50,
            })),
            edges: edges,
        };

        return elk
            .layout(graph)
            .then((layoutedGraph) => ({
                nodes: layoutedGraph.children.map((node) => ({
                    ...node,
                    // React Flow expects a position property on the node instead of `x`
                    // and `y` fields.
                    position: { x: node.x, y: node.y },
                })),

                edges: layoutedGraph.edges,
            }))
            .catch(console.error);
    };
}
