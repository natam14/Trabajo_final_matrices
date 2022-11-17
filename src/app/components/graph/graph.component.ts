import { Component, Input, OnInit } from '@angular/core';
import * as go from 'gojs';
const $ = go.GraphObject.make;

interface DeclareGraphs {
  key: string,
  color: string
}

interface ConectGraphs {
  from: string,
  to: string
}

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.css']
})
export class GraphComponent implements OnInit {

  @Input() matriz: boolean[][] = [];
  @Input() clean: boolean = false;
  public diagram: go.Diagram | undefined;

  relationsGeneral: string[] = [];
  arrayDeclareGraphs: DeclareGraphs[] = [];
  arrayConectGraphs: ConectGraphs[] = [];

  constructor() { }

  ngOnInit(): void { }

  generateGraph() {
    this.arrayDeclareGraphs = [];
    this.arrayConectGraphs = [];
    let declareGraphs;
    let conectGraphs;
    for (let i = 0; i < this.matriz.length; i++) {
      declareGraphs = {
        key: `${i + 1}`,
        color: 'lightblue'
      }
      this.arrayDeclareGraphs.push(declareGraphs);
      for (let j = 0; j < this.matriz.length; j++) {
        if (this.matriz[i][j]) {
          conectGraphs = {
            from: `${i + 1}`,
            to: `${j + 1}`
          }
          this.arrayConectGraphs.push(conectGraphs);
        }
      }
    }

    this.diagram = $(go.Diagram, 'myDiagramDiv');
    this.diagram.nodeTemplate =
      $(go.Node, "Auto",
        $(go.Shape, "RoundedRectangle",
          new go.Binding("fill", "color")),
        $(go.TextBlock,
          { margin: 2, font: " 20px cursive", width: 25, height: 25, textAlign: "center" },
          new go.Binding("text", "key"))
      );

    this.diagram.model = new go.GraphLinksModel(
      this.arrayDeclareGraphs,
      this.arrayConectGraphs
    );
  }
}
