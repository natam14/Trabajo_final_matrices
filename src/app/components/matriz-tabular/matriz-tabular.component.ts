import { Component, Input, OnInit } from '@angular/core';
import { ModalDialogsService } from '../modal-dialog.service';

@Component({
  selector: 'app-matriz-tabular',
  templateUrl: './matriz-tabular.component.html',
  styleUrls: ['./matriz-tabular.component.css']
})
export class MatrizTabularComponent implements OnInit {

  @Input() matriz: boolean[][] = [];
  // @Input() conditionOne: number = 0;
  // @Input() conditionTwo: number = 0;
  public diagram: go.Diagram | undefined;

  relationsGeneral: string[] = [];
  // declareGraphs: DeclareGraphs | undefined;
  // conectGraphs: ConectGraphs | undefined;
  // arrayDeclareGraphs: DeclareGraphs[] = [];
  // arrayConectGraphs: ConectGraphs[] = [];

  viewRelations: string = "viewHome";
  // relationReflectiva: boolean = false;

  //Matriz Reflexiva e Irreflexiva
  reflexiva: boolean[] = [];
  countReflexiva: number = 0;

  //Matriz Reflexiva e Irreflexiva
  irreflexiva: boolean[] = [];
  countIrreflexiva: number = 0;

  constructor(public modalDialog: ModalDialogsService) { }

  ngOnInit(): void {
  }

  changeRelation(name: string) {
    this.viewRelations = name;
  }

  // dialogRef: any;

  // relations(){
  //   this.reflexiva = [];
  //   for (let i = 0; i < this.n; i++) {
  //     for (let j = 0; j < this.n; j++) {
  //       //Reflexiva
  //       if(i == j && this.matriz[i][j] === true){
  //         this.reflexiva.push(true);
  //         console.log(this.reflexiva.length + " -");
  //       }
  //       if(i == j){
  //         this.countReflexiva++;
  //         console.log(this.countReflexiva);
  //       }
  //     }
  //   }
  // }

  relationReflexiva() {
    this.reflexiva = [];
    this.countReflexiva = 0;
    for (let i = 0; i < this.matriz.length; i++) {
      for (let j = 0; j < this.matriz.length; j++) {
        if (i == j && this.matriz[i][j] === true) {
          this.reflexiva.push(true);
        }
        if (i == j) {
          this.countReflexiva++;
        }
      }
    }
  }

  relationIrreflexiva() {
    this.irreflexiva = [];
    this.countIrreflexiva = 0;
    for (let i = 0; i < this.matriz.length; i++) {
      for (let j = 0; j < this.matriz.length; j++) {
        //Reflexiva true - Irreflexiva false
        if (i == j && this.matriz[i][j] === false) {
          this.irreflexiva.push(false);
        }
        if (i == j) {
          this.countIrreflexiva++;
        }
      }
    }
  }

  relationSimetrica() {
    let countTrue = 0;
    let countFalse = 0;

    for (let i = 0; i < this.matriz.length; i++) {
      for (let j = 0; j < this.matriz.length; j++) {
        if (this.matriz[i][j] === this.matriz[j][i]) {
          countTrue++;
        }
        countFalse++;
      }
    }
    console.log(countTrue + ' = ' + countFalse);
    return countFalse === countTrue;
  }

  relationAsimetrica() {
    let countTrue = 0;
    let countFalse = 0;

    for (let i = 0; i < this.matriz.length; i++) {
      for (let j = 0; j < this.matriz.length; j++) {
        if (this.matriz[i][j] === this.matriz[j][i]) {
          countTrue++;
        }
        countFalse++;
      }
    }
    console.log(countTrue + ' = ' + countFalse + '-----');

    return countFalse !== countTrue && countTrue > 0 && countFalse > 0 || (countTrue + 2) == countFalse;
  }

  relationAntisimetrica() {
    let countTrue = 0;

    for (let i = 0; i < this.matriz.length; i++) {
      for (let j = 0; j < this.matriz.length; j++) {
        if (this.matriz[i][j] != this.matriz[j][i]) {
          countTrue++;
        }
      }
    }
    console.log((countTrue / 2) + ' ==== ' + this.matriz.length);

    return (countTrue / 2) == this.matriz.length;
  }

  relationTransitiva() {
    // let count = 0;
    // for (let i = 0; i < this.matriz.length; i++) {
    //   for (let j = 0; j < this.matriz.length; j++) {
    //     for (let k = 0; k < this.matriz.length; k++) {
    //       for (let l = 0; l < this.matriz.length; l++) {
    //         if (this.matriz[i][j] == this.matriz[k][l] && this.matriz[i][j] && this.matriz[i][l]) {
    //           count++;
    //         }
    //       }
    //     }
    //   }
    // }
    
    return true
  }

  relationEquivalencia() {

    if (this.reflexiva.length == this.countReflexiva && this.relationSimetrica() && this.relationTransitiva()) {
      return true
    } else {
      return false;
    }
  }

  relationOrdenParcial() {
    if (this.reflexiva.length == this.countReflexiva && this.relationAntisimetrica() && this.relationTransitiva()) {
      return true;
    } else {
      return false;
    }
  }

  relationOrdenTotal() {
    if (this.reflexiva.length == this.countReflexiva && this.relationSimetrica() && this.relationTransitiva()) {
      return true;
    } else {
      return false;
    }
  }

  relationOrdenEstricto() {
    if (this.relationAntisimetrica() && this.relationTransitiva()) {
      return true;
    } else {
      return false;
    }
  }
  // generateGraph() {
  //   let declareGraphs;
  //   let conectGraphs;
  //   for (let i = 0; i < this.matriz.length; i++) {
  //     declareGraphs = {
  //       key: `${i + 1}`,
  //       color: 'lightblue'
  //     }
  //     this.arrayDeclareGraphs.push(declareGraphs);
  //     for (let j = 0; j < this.matriz.length; j++) {
  //       if (this.matriz[i][j]) {
  //         conectGraphs = {
  //           from: `${i + 1}`,
  //           to: `${j + 1}`
  //         }
  //         this.arrayConectGraphs.push(conectGraphs);
  //       }
  //     }
  //   }

  //   this.diagram = $(go.Diagram, 'myDiagramDiv');
  //   this.diagram.nodeTemplate =
  //     $(go.Node, "Auto",
  //       $(go.Shape, "RoundedRectangle",
  //         new go.Binding("fill", "color")),
  //       $(go.TextBlock,
  //         { margin: 2, font: " 20px cursive", width: 25, height: 25, textAlign: "center" },
  //         new go.Binding("text", "key"))
  //     );

  //   this.diagram.model = new go.GraphLinksModel(
  //     this.arrayDeclareGraphs,
  //     this.arrayConectGraphs
  //   );
  // }
}
