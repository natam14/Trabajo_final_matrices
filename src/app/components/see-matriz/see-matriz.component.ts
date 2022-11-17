import { Component, OnInit } from '@angular/core';
import swal from 'sweetalert2';

@Component({
  selector: 'app-see-matriz',
  templateUrl: './see-matriz.component.html',
  styleUrls: ['./see-matriz.component.css']
})
export class SeeMatrizComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  selected = false;
  matriz: boolean[][] = new Array();
  array: boolean[] = [];
  relationsGeneral: string[] = [];
  
  nRows: number = 3;
  nColumns: number = 3;
  openMatriz: boolean = false;
  matrizManually:boolean = false;
  
  
  matrizI:number = 0;
  matrizJ:number = 0;

  //Matriz Reflexiva e Irreflexiva
  reflexiva:boolean[] = [];
  countReflexiva:number = 0;
  
  
  correctMatriz() {
    if (this.nRows != this.nColumns) {
      swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: "¡Recuerda! la matriz debe ser cuadrada, vuelve a ingresar los valores.",
      })
    } else if (this.nRows === 0 || this.nColumns === 0) {
      swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: "¡La matriz esta vacia!",
      })
    } else {
      this.generateMatriz();
    }
  }

  cleanMatriz() {
    this.relationsGeneral = [];
    this.matriz = [];
    this.matrizManually = false;
  }

  generateMatriz() {
    swal.fire({
      title: '¿Como quieres generar la matriz?',
      showDenyButton: true,
      confirmButtonText: 'Manualmente',
      denyButtonText: 'Automaticamente',
      confirmButtonColor: "rgb(245, 27, 111)",
      denyButtonColor: " rgb(164, 27, 255)",
    }).then((result) => {
      if (result.isConfirmed) {
        this.generateMatrizManually();
        this.openMatriz = true;
      } else if (result.isDenied) {
        this.generateMatrizAutomatically();
        this.openMatriz = true;
      }
    })
  }

  generateMatrizManually() {
    this.matrizManually = true;
    for (let j = 1; j <= this.nRows; j++) {
      for (let i = 1; i <= this.nColumns; i++) {
        this.array.push(false);
      }
      this.matriz.push(this.array);
      this.array = [];
    }
  }

  generateMatrizAutomatically() {
    this.matrizManually = false;
    let random;
    for (let j = 0; j < this.nRows; j++) {
      for (let i = 0; i < this.nColumns; i++) {
        random = Math.random() >= 0.5;
        this.array.push(random);
      }
      this.matriz.push(this.array);
      this.array = [];
    }
    this.generateRelations();
  }

  confirmMatrizManually(){
    this.relationsGeneral = [];
    this.generateRelations();
    swal.fire({
      position: 'top-end',
      icon: 'success',
      title: '¡Matriz confirmada correctamente!',
      showConfirmButton: false,
      timer: 1100
    })
  }

  generateRelations() {
    this.relationGeneralR();
    //this.relationIrreflexivaReflexiva();
  }

  relationGeneralR() {
    // let k = 0;
    // for (let i = 0; i < this.nRows; i++) {
    //   for (let j = k; j < this.nColumns; j++) {
    //     console.log(`(${this.matriz[i][j]},${this.matriz[i][k]}) , (${i},${j}) - (${i},${k})`);
    //   }
    //   k++;
    // }
    for (let i = 0; i < this.nRows; i++) {
      for (let j = 0; j < this.nColumns; j++) {
        this.matriz[i][j] === true ? this.relationsGeneral.push(`( ${j + 1} , ${i + 1} )`) : "";
        // console.log(this.matriz[j][i] + ` = (${j + 1},${i + 1})`);
      }
    }
    // this.relationIrreflexivaReflexiva();
  }
  
  // relationIrreflexivaReflexiva(){
  //   this.reflexiva = [];
  //   this.countReflexiva = 0;
  //   for (let i = 0; i < this.nRows; i++) {
  //     for (let j = 0; j < this.nColumns; j++) {
  //       //Reflexiva
  //       if (i == j && this.matriz[i][j] === true) {
  //         this.reflexiva.push(true);
  //       }
  //       if (i == j) {
  //         this.countReflexiva++;
  //       }
  //     }
  //   }
  // }

  changeInput(i:number,j:number){
    this.matrizJ = j;
    this.matrizI = i;
  }

}
