import { Component, Input, OnInit } from '@angular/core';
import { ModalDialogsService } from '../modal-dialog.service';

@Component({
  selector: 'app-matriz-tabular',
  templateUrl: './matriz-tabular.component.html',
  styleUrls: ['./matriz-tabular.component.css']
})
export class MatrizTabularComponent implements OnInit {

  @Input() matriz: boolean[][] = [];

  public diagram: go.Diagram | undefined;

  relationsGeneral: string[] = [];

  viewRelations: string = "viewHome";

  reflexiva: boolean[] = [];
  countReflexiva: number = 0;


  irreflexiva: boolean[] = [];
  countIrreflexiva: number = 0;

  constructor(public modalDialog: ModalDialogsService) { }

  ngOnInit(): void {
  }

  changeRelation(name: string) {
    this.viewRelations = name;
  }



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

}
